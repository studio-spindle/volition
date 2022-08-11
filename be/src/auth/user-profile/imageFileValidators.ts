import * as path from 'path';

const maxFileSizeInKb = 1024 * 1024 * 2; // max size 2mb
export const allowedFileExtensions = ['.jpg', '.png'];

export enum FileValidationErrors {
    UNSUPPORTED_FILE_TYPE
}

export const imageFileInterceptorMulterOptions = {
    limits: {
        files: 1,
        fileSize: maxFileSizeInKb,
    },
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        if (allowedFileExtensions.includes(extension)) {
            callback(null, true);
        } else {
            req.fileValidationError = FileValidationErrors.UNSUPPORTED_FILE_TYPE;
            callback(null, false);
        }
    }
};
