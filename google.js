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
        await sheet.loadCells()

        //let nameCol = rows.name

        // Update if we find the name and return early
        for (i = 0; i < rows.length; i++) {
            if(rows[i].Name.includes(name)) {
                // Rows excludes columns, so an offset is needed
                const rowName = sheet.getCell(i+1, 0)
                const rowLink = sheet.getCell(i+1, 3)

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