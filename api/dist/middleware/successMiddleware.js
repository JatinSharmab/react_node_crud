"use strict";
// src/middleware/responseFormatter.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Response formatter middleware to standardize the response structure
const responseFormatter = (req, res, next) => {
    const oldJson = res.json.bind(res); // Bind the original `json` method to preserve the context
    res.json = function (data) {
        res.statusCode = res.statusCode || 200;
        return oldJson({
            success: res.statusCode < 400,
            data,
        });
    }; // Cast as any to avoid TypeScript errors
    next();
};
exports.default = responseFormatter;
