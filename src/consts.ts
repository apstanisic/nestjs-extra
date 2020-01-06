// Keys for services
export const USER_SERVICE = 'USER_SERVICE';
export const DB_LOGGER_SERVICE = 'DB_LOGGER_SERVICE';

// Access Control config
export const AC_ROLES_LIST = 'AC_ROLES_LIST';
export const AC_MODEL = 'AC_MODEL';
export const AC_POLICIES = 'AC_POLICIES';

// Used for passing config for storing images (sizes, dimentions...)
export const STORAGE_IMAGE_SIZES = 'STORAGE_IMAGE_SIZES';

// Emails separated by ; for simple admin
export const SIMPLE_ADMIN_MAILS = 'SIMPLE_ADMIN_MAILS';

// Node enviroment
export const NODE_ENV = 'NODE_ENV';

//
// From .env file
//

// Database
export const DB_HOST = 'DB_HOST';
export const DB_USER = 'DB_USER';
export const DB_PASSWORD = 'DB_PASSWORD';
export const DB_DATABASE = 'DB_DATABASE';
export const DB_PORT = 'DB_PORT'; // Defaults to 5432 (standard postgres port)

//  Email SMTP
export const EMAIL_HOST = 'EMAIL_HOST';
export const EMAIL_PORT = 'EMAIL_PORT';
export const EMAIL_PASSWORD = 'EMAIL_PASSWORD';
export const EMAIL_USER = 'EMAIL_USER';
export const EMAIL_SECURE = 'EMAIL_SECURE';

// Redis
export const REDIS_HOST = 'REDIS_HOST';
export const REDIS_PORT = 'REDIS_PORT';

// Common for all s3 storage
export const STORAGE_BUCKET_NAME = 'STORAGE_BUCKET_NAME';
export const STORAGE_ACCESS_KEY = 'STORAGE_ACCESS_KEY';
export const STORAGE_SECRET_KEY = 'STORAGE_SECRET_KEY';
// Used for aws s3
export const STORAGE_ENDPOINT = 'STORAGE_ENDPOINT';
export const STORAGE_REGION = 'STORAGE_REGION';
// For minio gateway
export const STORAGE_HOST = 'STORAGE_HOST';
export const STORAGE_GATEWAY = 'STORAGE_GATEWAY';

// JWT secret token
export const JWT_SECRET = 'JWT_SECRET';

// Used when this app needs to tell user where to request something (eg, password reset).
export const APP_URL = 'APP_URL';
export const API_URL = 'API_URL';
