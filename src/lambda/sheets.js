exports.handler = main;
require('dotenv').config();
const {
    GOOGLE_SPREADSHEET_ID_FROM_URL,
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY
} = process.env;

/* API use script adapted from https://www.swyx.io/netlify-google-sheets/ */
const { GoogleSpreadsheet } = require('google-spreadsheet');

/**
 * Process requests from a client
 * @param event {object} request details
 * @param context {object} environment details
 * @param callback {function(error: string|null, response: HTTPResponse) => void} function to send the response to the client
 */
async function main(event, context, callback) {
    try {
        console.log(`Fetching Google Sheets content`)

        const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID_FROM_URL);
        // https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        await doc.useServiceAccountAuth({
            client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
        });

        await doc.loadInfo(); // loads document properties and worksheets. required.

        let sheets = [];
        let metadata = null;
        for(let i = 0; i < doc.sheetCount; i++) {
            const sheet = doc.sheetsByIndex[i];

            if(sheet.title[0] === '_')
                continue;

            const rows = await sheet.getRows(); // can pass in { limit, offset }
            const sheetData = rows.map(r => serializeRow(sheet, r));
            if(sheet.title === 'Metadata') {
                metadata = sheetData;
            } else {
                sheets.push({
                    Title: sheet.title,
                    Content: sheetData
                });
            }
        }

        sheets = sheets.map(s => {
            const md = metadata.filter(m => m.Title === s.Title);
            if(!md.length)
                return s;
            return {...md[0], ...s};
        });

        callback(null, {statusCode: 200, body: JSON.stringify(sheets)});
    } catch(e) {
        console.error(e);
        callback(e);
    }
}

/*
 * utils
 */
function serializeRow(sheet, row) {
    let temp = {};
    sheet.headerValues.map((header) => {
        temp[header] = row[header];
    });
    return temp;
}