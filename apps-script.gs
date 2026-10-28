// Google Apps Script – prijave u Google Sheet + stvarni brojač
// 1) Napravi novi Google Sheet, list nazovi "Prijave", u redak 1 upiši zaglavlja:
//    vrijeme | tip | ime | grad | struja | email | kontakt | podrucja | dostupnost | poruka
// 2) Extensions → Apps Script → zalijepi ovaj kod → Deploy → New deployment → Web app
//    Execute as: Me | Who has access: Anyone → kopiraj URL u pokret.js (FORM_ENDPOINT i COUNT_ENDPOINT, isti URL)
function sheet_() { return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Prijave"); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function doPost(e) {
  var p = e.parameter, lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    if (!p.email || !p.ime || !p.grad) return json_({ ok: false });
    sheet_().appendRow([p.vrijeme || new Date(), p.tip, p.ime, p.grad, p.struja || "", p.email,
      p.kontakt || "", p.podrucja || "", p.dostupnost || "", p.poruka || ""]);
    return json_({ ok: true });
  } finally { lock.releaseLock(); }
}
function doGet() { return json_({ count: Math.max(0, sheet_().getLastRow() - 1) }); }
