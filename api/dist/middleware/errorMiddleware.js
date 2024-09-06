"use strict";
// src/middleware/errorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Error handler middleware to handle errors globally
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'An internal server error occurred' });
};
exports.default = errorHandler;
