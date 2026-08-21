
// functions/api/drive.js - FINAL SECURE CORE
// Private Drive, Public Site - No folderId leak
// Jim Koto - Kesadaran Adalah Anugerah

import { google } from 'googleapis';

export async function onRequestGet(context) {
  try {
    const { env } = context;
    const FOLDER_ID = env.DRIVE_FOLDER_ID;
    const SA_JSON = env.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (!FOLDER_ID || !SA_JSON) {
      return new Response(JSON.stringify({ error: "Config missing" }), { status: 500 });
    }

    // Parse service account - never log this
    const credentials = typeof SA_JSON === 'string' ? JSON.parse(SA_JSON) : SA_JSON;

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const res = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id,name,mimeType,thumbnailLink,webViewLink,createdTime)',
      orderBy: 'createdTime desc',
      pageSize: 50,
    });

    // Return only safe public fields, NEVER return folderId
    const files = (res.data.files || []).map(f => ({
      id: f.id,
      name: f.name,
      mimeType: f.mimeType,
      thumbnail: f.thumbnailLink,
      viewLink: f.webViewLink,
      created: f.createdTime,
    }));

    return new Response(JSON.stringify({ files, count: files.length, secured: true }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: "Vault locked", details: e.message }), { status: 500 });
  }
}
