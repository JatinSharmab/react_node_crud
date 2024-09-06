"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.CustomError = void 0;
// Custom error class for handling method errors
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'CustomError';
        this.status = status;
    }
}
exports.CustomError = CustomError;
// Middleware to check request method
const checkMethod = (allowedMethods) => (req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
        const error = new CustomError(`Invalid method: ${req.method}`, 405);
        return next(error); // Pass the error to the next middleware or error handler
    }
    next(); // Call next if the method is valid
};
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
exports.default = checkMethod;
