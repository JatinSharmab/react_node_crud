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
exports.profile = void 0;
const profileService_1 = require("../services/profileService"); // Ensure this path is correct
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, gender } = req.body;
    // Validate input
    if (!firstname || !lastname || !gender) {
        return res.status(400).json({ message: 'firstname, lastname, or gender is required' });
    }
    try {
        const newUser = (0, profileService_1.createUser)(firstname, lastname, gender);
        console.log(newUser);
        res.status(201).json({ message: 'User registered successfullyyyyyyyyyyyyyyyy', user: newUser });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});
exports.profile = profile;
