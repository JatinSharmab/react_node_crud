"use strict";
// src/middleware/loggerMiddleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Logger middleware to log each request
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next middleware
};
exports.default = loggerMiddleware;
