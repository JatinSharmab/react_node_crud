"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.resolve(__dirname, '../data/newUser.json'); // Ensure the file path is correct
const getUsers = () => {
    try {
        const data = (0, fs_1.readFileSync)(filePath, 'utf-8');
        return JSON.parse(data); // Parse JSON data
    }
    catch (error) {
        console.error('Error reading or parsing users data:', error);
        return []; // Return an empty array if there's an error reading the file
    }
};
const saveUsers = (users) => {
    try {
        (0, fs_1.writeFileSync)(filePath, JSON.stringify(users, null, 2), 'utf-8'); // Save users to file
    }
    catch (error) {
        console.error('Error saving users data:', error); // Log any errors
        throw new Error('Unable to save users');
    }
};
const createUser = (firstname, lastname, gender) => {
    try {
        const users = getUsers(); // Fetch existing users
        const newUser = {
            id: users.length + 1,
            firstname,
            lastname,
            gender,
        };
        users.push(newUser); // Add new user to the array
        saveUsers(users); // Save updated users array
        return newUser; // Return newly created user
    }
    catch (error) {
        console.error('Error registering user:', error); // Log any errors
        throw new Error('User registration failed'); // Throw error for controller to handle
    }
};
exports.createUser = createUser;
