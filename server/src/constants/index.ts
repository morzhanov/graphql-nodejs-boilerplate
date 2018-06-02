export const PORT: number = 3300;
export const API_URI: string = '/api';
export const LANGUAGES: Array<string> = ['en'];
export const SALT: string = '###salt###';
export const SC: any = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_ERROR: 500
};
export const EC: any = {
  SERVER_ERROR: 0,
  NOT_OUR_APP: 1,
  DATA_NOT_PROVIDED: 2,
  TRY_OTHER_AUTH: 3,
  USER_EXISTS: 4,
  WRONG_PASSWORD: 5,
  WRONG_EMAIL: 6,
  DATA_VALIDATION_FAILED: 7,
  DATA_NOT_FOUND: 8,
  DATA_NOT_SAVED: 9
};
export const MIME_TYPES: any = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  GIF: 'image/gif',
  BMP: 'image/bmp'
};
