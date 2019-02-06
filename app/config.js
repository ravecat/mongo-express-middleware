const fs = require('fs');
const path = `.env.${process.env.NODE_ENV}`;

if (!fs.existsSync(path)) {
	console.warn(`\nFile ${path} doesn't exists or NODE_ENV not setted, app uses default environment variables\n`);
}

require('dotenv').config({ path: `${path || 'dev'}` });

export default {
	port: process.env.PORT || 3001,
	databaseName: process.env.DB_NAME,
	databaseHost: process.env.DB_HOST || 'localhost',
	databasePort: process.env.DB_PORT || 27017,
	errorStatus: process.env.ERROR_STATUS || 500,
	bodyLimit: process.env.BODY_LIMIT || 100,
	corsHeaders: ['Link']
};
