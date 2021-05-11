

# ReproducibiliTea Reading List

## About

The [ReproducibiliTea](https://reproducibiliTea.org/) Reading List is an interface for a Google Sheets document which presents clean and pretty presentation of the information.

## Local development

This project's dependencies are managed by npm. 
To get started, fork this repository and then navigate to the project directory and follow the instructions below:

### Project setup
To install the project dependencies run:
```
npm install
```

#### `.env` file
The project is powered by its connectivity to the Google Sheets API.
It therefore needs a `.env` file with the following keys:
* `GOOGLE_SPREADSHEET_ID_FROM_URL` - the URL of the Google Sheet to represent
* `GOOGLE_SERVICE_ACCOUNT_EMAIL` - the email of the [Google Service Account](https://cloud.google.com/iam/docs/service-accounts) responsible for the API calls
* `GOOGLE_PRIVATE_KEY` - the private key of the above for authorisation

#### Serve for local testing
Uses webpack compiling and supports hot-reloading of files.
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Component Guides
The project is built on several core components.
If you run into difficulty with them, more information can be found at:
* [VueJS](https://vuejs.org/)
* [VueX](https://vuex.vuejs.org/)
* [Bulma](https://bulma.io/) / [Buefy](https://buefy.org/)
* [Google Sheets API](https://developers.google.com/sheets/api)
* [Netlify](https://docs.netlify.com/)

## License
This project is licensed under the [MIT license](https://github.com/UKRN-Open-Research/ukrn-open-research-resources/blob/master/LICENSE.txt).
