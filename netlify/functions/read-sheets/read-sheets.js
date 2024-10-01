
require('dotenv').config();
const google = require('googleapis').google;

const {
    GOOGLE_SPREADSHEET_ID_FROM_URL,
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY
} = process.env;

exports.handler = async function(event, context) {
    try {
        console.log(`Fetching Google Sheets content`);

        const auth = new google.auth.JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets.readonly',
                'https://www.googleapis.com/auth/drive.file',
            ],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.get({
            spreadsheetId: GOOGLE_SPREADSHEET_ID_FROM_URL,
            includeGridData: true,
        });

        const doc = response.data;
        let sheetsData = [];
        let metadata = null;

        doc.sheets.forEach(sheet => {
            if (sheet.properties.title[0] === '_') return;

            const rows = sheet.data[0].rowData.map(row => serializeRow(sheet, row));
            if (sheet.properties.title === 'Metadata') {
                metadata = rows;
            } else {
                sheetsData.push({
                    Title: sheet.properties.title,
                    Content: rows
                });
            }
        });

        sheetsData = sheetsData.map(s => {
            const md = metadata.filter(m => m.Title === s.Title);
            if (!md.length) return s;
            return { ...md[0], ...s };
        });

        return {
            body: JSON.stringify(sheetsData),
            statusCode: 200
        }
    } catch (e) {
        console.error(e);
        return {
            body: JSON.stringify({ error: e }),
            statusCode: 500
        }
    }
}

/*
 * utils
 */
function serializeRow(sheet, row) {
    let temp = {};
    for (let index = 0; index < sheet.properties.gridProperties.columnCount; index++) {
        try {
            const header = sheet.data[0].rowData[0].values[index]?.formattedValue;
            temp[header] = row.values[index] ? row.values[index].formattedValue : null;
        } catch(e) {
            console.error(`Unexpectedly missing value at index ${index}`);
            console.error(e)
            console.error(sheet.data[0].rowData[0].values[index]);
        }
    }
    return temp;
}