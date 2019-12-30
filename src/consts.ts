export const USER_SERVICE = 'USER_SERVICE';
export const DB_LOGGER_SERVICE = 'DB_LOGGER_SERVICE';
export const ROLE_SERVICE = 'ROLE_SERVICE';

export const AC_ROLES_LIST = 'AC_ROLES_LIST';
export const AC_MODEL = 'AC_MODEL';
export const AC_POLICIES = 'AC_POLICIES';

export const STORAGE_IMAGE_SIZES = 'STORAGE_IMAGE_SIZES';

export const SIMPLE_ADMIN_MAILS = 'SIMPLE_ADMIN_MAILS';

export const NODE_ENV = 'NODE_ENV';

// Database
export const DB_HOST = 'DB_HOST';
export const DB_USER = 'DB_USER';
export const DB_PASSWORD = 'DB_PASSWORD';
export const DB_DATABASE = 'DB_DATABASE';
export const DB_PORT = 'DB_PORT'; // Defaults to 5432 (standard postgres port)
// export const DB_TYPE = 'DB_TYPE'; // Only postgres

// Not used currently. Switched to all in psql
// Log database
// export const LOG_DB_HOST = 'LOG_DB_HOST';
// export const LOG_DB_DATABASE = 'LOG_DB_DATABASE';
// export const LOG_DB_PORT = 'LOG_DB_PORT';
// export const LOG_DB_USER = 'LOG_DB_USER';
// export const LOG_DB_PASSWORD = 'LOG_DB_PASSWORD';
//  Email SMTP
export const EMAIL_HOST = 'EMAIL_HOST';
export const EMAIL_PORT = 'EMAIL_PORT';
export const EMAIL_PASSWORD = 'EMAIL_PASSWORD';
export const EMAIL_USER = 'EMAIL_USER';
export const EMAIL_SECURE = 'EMAIL_SECURE';

export const REDIS_HOST = 'REDIS_HOST';
export const REDIS_PORT = 'REDIS_PORT';

export const STORAGE_HOST = 'STORAGE_HOST';
export const STORAGE_GATEWAY = 'STORAGE_GATEWAY';
export const STORAGE_ENDPOINT = 'STORAGE_ENDPOINT';
export const STORAGE_REGION = 'STORAGE_REGION';
export const STORAGE_BUCKET_NAME = 'STORAGE_BUCKET_NAME';
export const STORAGE_ACCESS_KEY = 'STORAGE_ACCESS_KEY';
export const STORAGE_SECRET_KEY = 'STORAGE_SECRET_KEY';

// JWT secret token
export const JWT_SECRET = 'JWT_SECRET';

// Used when this app needs to tell user where to request something.
// Eg. password reset, confirm account
export const APP_URL = 'APP_URL';
export const API_URL = 'API_URL';

// # Firm url is sometimes same as instance of this app.
// # If this is only api, then it's different.
// # It's url to front page.
// # APP_URL and FIRM_URL are often same
// FIRM_URL='https://example.com'
// FIRM_CONTACT_EMAIL='test@examle.com'
// FIRM_ADDRESS='Beograd, 11000'
// FIRM_PHONE_NUMBER='+00000000'
// FIRM_NAME='My Firm'
