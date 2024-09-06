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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
// Login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield prisma.emUser.findFirst({
            where: {
                userEmail: username,
            },
        });
        if (!user) {
            res.locals.response = {
                statusCode: 401,
                message: "Invalid username or password",
                data: {},
            };
            return next();
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.userPassword);
        if (!isValidPassword) {
            res.locals.response = {
                statusCode: 401,
                message: "Invalid username or password",
                data: {},
            };
            return next();
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.userId }, String(process.env.JWT_SECRET), { expiresIn: '10h' });
        // Set response in res.locals
        res.locals.response = {
            statusCode: 200,
            message: "Login successful",
            data: {
                Id: user.userId,
                email: username,
                Token: token,
            },
        };
        return next();
        return next();
    }
    catch (error) {
        console.error("Login error:", error);
        res.locals.response = {
            statusCode: 400,
            message: error.message || "An error occurred during login",
            data: {},
        };
        return next();
    }
});
exports.login = login;
// Signup
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password) {
        res.locals.response = {
            statusCode: 400,
            message: "Username and password are required",
            data: {}
        };
        return next();
        // return res
        //   .status(400)
        //   .json({ message: "Username and password are required" });
    }
    try {
        const existingUser = yield prisma.emUser.findFirst({
            where: {
                userEmail: email,
            },
        });
        if (existingUser) {
            res.locals.response = {
                statusCode: 400,
                message: "User already exists",
                data: {},
            };
            return next();
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma.emUser.create({
            data: {
                userFirstName: firstname,
                userLastName: lastname,
                userEmail: email,
                userPassword: hashedPassword,
                userRoleId: 1,
            },
        });
        console.log(newUser);
        // Set response in res.locals
        res.locals.response = {
            statusCode: 201,
            message: "User registered successfully",
            data: newUser,
        };
        next(); // Move to the next middleware
    }
    catch (error) {
        console.error("Signup error:", error);
        res.locals.response = {
            statusCode: 500,
            message: "An error occurred during signup",
            data: {},
        };
        return next();
    }
});
exports.signup = signup;
