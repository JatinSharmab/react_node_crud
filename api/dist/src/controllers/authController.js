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
exports.signup = exports.login = void 0;
const authService_1 = require("../services/authService");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const user = (0, authService_1.loginUser)(username, password);
        if (user) {
            res.locals.response = {
                message: 'Login successfully.',
                statusCode: 200
            };
        }
        else {
            res.locals.response = {
                message: 'Invalid Credentials.',
                statusCode: 401,
            };
        }
    }
    catch (err) {
        res.locals.response = {
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
        };
        // console.error('Login error:', error);
        // res.status(500).json({ error: 'An error occurred during login' });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const newUser = (0, authService_1.registerUser)(username, password);
        res.locals.response = {
            message: 'User Register Successfully.',
            statusCode: 200
        };
        // res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        res.locals.response = {
            message: 'An error occured during signup.',
            statusCode: 500
        };
        // console.error('Signup error:', error);
        // res.status(500).json({ error: 'An error occurred during signup' });
    }
});
exports.signup = signup;
