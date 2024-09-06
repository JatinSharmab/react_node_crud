"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
        if (!res.headersSent) {
            const { data, message, statusCode } = res.locals.response;
            res.status(statusCode).json({
                statusCode,
                message,
                data,
            });
        }
    }
    catch (err) {
        res.locals.response = {
            // data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || "Unknown error",
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
        };
    }
});
exports.default = middlewares;
