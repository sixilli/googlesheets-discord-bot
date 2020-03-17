const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('./google_secret.json')

async function submission(name, link, sheetNum) {
    // Credential stuff
    // Contains link to google doc.
    const doc = new GoogleSpreadsheet('1bPuobUF9uUTC7QNvIhtbDW8xNdO3D7tZoLrIjYnbNls')

    try {
        await doc.useServiceAccountAuth(creds)

        // Loading document
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[sheetNum]

        // Check for user/update their submission
        await addOrUpdateRow(name, link, sheet)

        return true

    } catch(e) {
        console.error(e)
        return false
    }
}

async function addOrUpdateRow(name, link, sheet) {
    try {
        const rows =  await sheet.getRows()

        let nameCol = rows.name

        // Update if we find the name and return early
        for (i = 0; i < nameCol.length; i++) {
            if(nameCol[i].includes(name)) {
                const rowName = getCell(i, 0)
                const rowLink = getCell(i, 3)

                rowName.value = name
                rowLink.value = link

                await sheet.saveUpdatedCells()
                console.log('Updated user submission')

                return true
            } 
        }

        await sheet.addRow({
            Name: name,
            Status: 'None',
            Reviewer: 'None',
            Link: link,
        })

    } catch(e) {
        console.error(e)
        return false
    }
}

module.exports = { submission }