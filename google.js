const { GoogleSpreadsheet } = require('google-spreadsheet')
const { promisify } = require('util')
const creds = require('./google_secret.json')

async function addSubmission(name, link, sheetNum) {
    // Credential stuff
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
    } catch(e) {
        console.error(e)
    }
}

module.exports = { addSubmission }