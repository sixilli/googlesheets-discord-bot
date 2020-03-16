const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('./google_secret.json')

async function addSubmission(name, link, sheetNum) {
    // Credential stuff
    // Contains link to google doc.
    const doc = new GoogleSpreadsheet('1bPuobUF9uUTC7QNvIhtbDW8xNdO3D7tZoLrIjYnbNls')

    try {
        await doc.useServiceAccountAuth(creds)

        // Loading document
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[sheetNum]

        await sheet.addRow({
            Name: name,
            Status: 'None',
            Reviewer: 'None',
            Link: link,
        })

        return true

    } catch(e) {
        console.error(e)
        return false
    }
}

module.exports = { addSubmission }