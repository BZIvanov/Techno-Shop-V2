## Server setup

Run `npm install` in the root folder (package.json) to install dependencies.

Prerequisites:

- MongoDB local installation

## Mailtrap setup

1. Create an account in Mailtrap.
2. Click _Add Project_ if you don't have one already.
3. Under the project click _Add Inbox_.
4. Now after you have Project and Inbox click the settings icon for the Inbox.
5. From the _SMTP Settings_ tab from the _Integrations_ dropdown, select Node.js nodemailer and there you can find the values you need for the .env file.

## Cloudinary setup

1. Create your account [here](https://cloudinary.com/).
2. In the Dashboard under account details you can get your cloud name, api key and secret.

## Testing

The test command in package.json file are valid for setting environment variable for Windows.

## Seeding test data

Run `npm run seed-data` in the root folder (package.json) to seed dummy data. Note that the seeding data is also used in the tests.

## Versioning

Currently all endpoints are prefixed with `/v1`, if at some point you want to introduce breaking changes to the current endpoints and at the same time to keep the existing behaviour, you can create `/v2` endpoints by adding another version of routes in the versioning folder.
