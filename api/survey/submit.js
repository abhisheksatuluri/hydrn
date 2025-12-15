export default async function handler(req, res) {
    // TODO: Connect this to Google Sheets Service Account or Google Apps Script Web App URL later.
    // Example: 
    // const payload = req.body
    // await googleSheets.appendRow(payload)

    /* 
      Configuration Note:
      When ready, replace this stub with logic to append data to a Google Sheet.
      Required env vars: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, SPREADSHEET_ID.
    */

    if (req.method === 'POST') {
        console.log('[API Stub] Received Survey Submission:', req.body || req.payload)

        // Simulate network delay
        await new Promise(r => setTimeout(r, 1000))

        // Return success stub
        return res.status(200).json({ success: true, id: 'stub-uuid-' + Date.now() })
    }

    return res.status(405).json({ message: 'Method not allowed' })
}
