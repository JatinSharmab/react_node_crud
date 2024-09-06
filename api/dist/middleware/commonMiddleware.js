"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = (req, res, next) => {
    try {
        next();
        if (res.statusCode == 200 || res.statusCode == 201) {
            if (!res.headersSent) {
                const { data, message, statusCode } = res.locals.response || {};
                res.status(statusCode || 200).json({
                    statusCode: statusCode || 200,
                    message: message || "Success",
                    data: data || {},
                });
            }
        }
    }
    catch (err) {
        console.error("Error in middleware:", err);
        res.status(err.statusCode || 500).json({
            statusCode: err.statusCode || 500,
            message: err.message || "Internal Server Error",
        });
    }
};
exports.default = middleware;
