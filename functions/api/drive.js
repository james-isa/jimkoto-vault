export async function onRequest(context) {
  const DRIVE_FOLDER_ID = context.env.DRIVE_FOLDER_ID;
  const SA_JSON = context.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!DRIVE_FOLDER_ID || !SA_JSON) return new Response("Missing env", {status: 500});
  
  const sa = JSON.parse(SA_JSON);
  const token = await getAccessToken(sa);
  
  const url = `https://www.googleapis.com/drive/v3/files?q='${DRIVE_FOLDER_ID}'+in+parents&fields=files(id,name,mimeType,webViewLink)&orderBy=name`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await r.json();
  return new Response(JSON.stringify(data.files), { headers: {"Content-Type":"application/json", "Access-Control-Allow-Origin":"*"} });
}

async function getAccessToken(sa) {
  const header = btoa(JSON.stringify({alg:"RS256",typ:"JWT"})).replace(/=/g,"");
  const now = Math.floor(Date.now()/1000);
  const claim = btoa(JSON.stringify({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/drive.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  })).replace(/=/g,"");
  
  const key = await crypto.subtle.importKey("pkcs8", str2ab(atob(sa.private_key.replace(/-----[^-]+-----/g,"").replace(/\n/g,""))), {name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"}, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${header}.${claim}`));
  const jwt = `${header}.${claim}.${btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}`;
  
  const res = await fetch("https://oauth2.googleapis.com/token", {method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`});
  const j = await res.json();
  return j.access_token;
}
function str2ab(s){const b=new Uint8Array(s.length);for(let i=0;i<s.length;i++)b[i]=s.charCodeAt(i);return b.buffer;}