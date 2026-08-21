# JIMKOTO-VAULT.ZIP - FINAL VIBRANT & ENERGIK
# Jim Koto a.k.a James Isa - Pioneer Founder Akomoda Network
# Filosofi: Mesin Untuk Efisiensi, Manusia Untuk Makna | Kesadaran Adalah Anugerah
# Konteks: Microsoft (Tanah) -> Claude (EUREKA) -> Google (Benih) -> Meta Samudera (banyak ikan) -> Akomoda Kolam di dalam Meta

## ISI ZIP INI:
- index.html -> Landingpage vibrant final (indigo->violet->amber->coral) - Siap tayang jimkoto.my.id
- functions/api/drive.js -> SECURE CORE FINAL, tidak bocor folderId
- functions/api/articles.js -> reader sheet portal
- .env.example, wrangler.toml, package.json

## LANGKAH 2 JAM STEP-BY-STEP (Arah Meta, Tanpa Tele-tele)

### JAM 0:00-0:30 - Kunci Vault (Gmail B)
1. Chrome Profile JIMKOTO-CLOUD (Gmail B) -> Buka:
   https://console.cloud.google.com/apis/library/drive.googleapis.com -> ENABLE
   https://console.cloud.google.com/apis/library/sheets.googleapis.com -> ENABLE
2. IAM & Admin -> Service Accounts -> Create Service Account: jimkoto-vault
3. Keys -> Add Key -> Create New JSON -> Download -> Simpan aman
4. Copy email robot: jimkoto-vault@xxx.iam.gserviceaccount.com

### JAM 0:30-1:00 - Share Dari Gmail A
5. Chrome Profile JIMKOTO-DRIVE (Gmail A) -> Buka Drive folder 1npMxtII68ru-0NWzt5UzKB-jxVVFOI6U
6. Share -> Paste email robot -> Role Viewer -> General Access: Restricted
7. Cloudflare Pages -> jimkoto.my.id -> Settings -> Variables -> Add Encrypted:
   DRIVE_FOLDER_ID, GOOGLE_SERVICE_ACCOUNT_JSON (isi file JSON), GOOGLE_SHEET_ID, GOOGLE_API_KEY

### JAM 1:00-1:45 - Deploy Vibrant
8. Extract zip ini ke project lokal jimkoto.my.id kamu
9. Copy index.html ke root / atau src/pages/index.astro (sesuaikan framework)
10. npm install
11. git add ., git commit -m "feat: vibrant final - Private Drive Public Site - Kesadaran Adalah Anugerah", git push

### JAM 1:45-2:00 - Tayang & Cek
12. Buka https://jimkoto.my.id -> harus berwarna energik, bukan putih
13. Buka https://jimkoto.my.id/api/drive -> harus return {secured:true} tanpa menampilkan folderId
14. Cek di HP (samudera Meta) dan Laptop Windows (tanah Microsoft) - Kesadaran Akan Waktu

### Setelah Tayang:
- Buat halaman /principles dengan cerita 3 Lapisan Kesadaran
- Pilih 1 UMKM gratis untuk masuk kolam Akomoda pertama
- The show must go on!

# Catatan Keamanan:
- Drive API GRATIS, bukan Enterprise only (20k req/100 detik)
- Jangan pernah console.log SA_JSON
- Jangan pernah return FOLDER_ID ke frontend

Semangat! Badai inflasi akan lewat, kolam yang terawat akan tetap ada.
