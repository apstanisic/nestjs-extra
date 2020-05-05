// Keys for services
export const USER_SERVICE = 'USER_SERVICE';
export const DB_LOGGER_SERVICE = 'DB_LOGGER_SERVICE';

// Queue names
export const QUEUE_AUTH_EMAIL = 'QUEUE_AUTH_EMAIL';
export const QUEUE_RESET_PASSWORD = 'AUTH_RESET_PASSWORD_QUEUE';
export const QUEUE_CONFIRM_ACCOUNT = 'AUTH_CONFIRM_ACCOUNT_QUEUE';
export const QUEUE_NOTIFICATIONS = 'QUEUE_NOTIFICATIONS';

// Access Control config
export const AC_ROLES_LIST = 'AC_ROLES_LIST';
export const AC_MODEL = 'AC_MODEL';
export const AC_POLICIES = 'AC_POLICIES';

// Used for passing config for storing images (sizes, dimensions...)
export const STORAGE_IMAGE_SIZES = 'STORAGE_IMAGE_SIZES';

// Emails separated by ; for simple admin
export const SIMPLE_ADMIN_EMAILS = 'SIMPLE_ADMIN_EMAILS';

// Node enviroment
export const NODE_ENV = 'NODE_ENV';

//
// From .env file
//

// Database
export const DB_HOST = 'DB_HOST'; // localhost, 192.168.0.10...
export const DB_USER = 'DB_USER'; // root, myuser
export const DB_PASSWORD = 'DB_PASSWORD'; // random_password
export const DB_DATABASE = 'DB_DATABASE'; // my_database_name
export const DB_PORT = 'DB_PORT'; // 5432...
export const DB_TYPE = 'DB_TYPE'; // postgres, mysql...
export const DB_SYNC = 'DB_SYNC'; // Should schema be synced

//  Email SMTP
export const EMAIL_HOST = 'EMAIL_HOST';
export const EMAIL_PORT = 'EMAIL_PORT';
export const EMAIL_PASSWORD = 'EMAIL_PASSWORD';
export const EMAIL_USER = 'EMAIL_USER';
export const EMAIL_SECURE = 'EMAIL_SECURE';

// Redis
export const REDIS_HOST = 'REDIS_HOST'; // localhost
export const REDIS_PORT = 'REDIS_PORT'; // 6379, default value 6379

// Common for all s3 storage
export const STORAGE_BUCKET_NAME = 'STORAGE_BUCKET_NAME'; // my-bucket-name
export const STORAGE_ACCESS_KEY = 'STORAGE_ACCESS_KEY'; // randomaccesskey
export const STORAGE_SECRET_KEY = 'STORAGE_SECRET_KEY'; // supersecretkey
// Used for aws s3
export const STORAGE_ENDPOINT = 'STORAGE_ENDPOINT';
export const STORAGE_REGION = 'STORAGE_REGION';
// For minio gateway
export const STORAGE_HOST = 'STORAGE_HOST';
export const STORAGE_GATEWAY = 'STORAGE_GATEWAY';

// JWT secret token
export const JWT_SECRET = 'JWT_SECRET'; // random-secret-token-for-jwt

// Used when this app needs to tell user where to request something (eg, password reset).
export const APP_URL = 'APP_URL';
export const API_URL = 'API_URL';
export const STORAGE_URL = 'STORAGE_URL';
