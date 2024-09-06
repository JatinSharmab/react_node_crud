"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.resolve(__dirname, '../data/users.json');
// const filePath = path.resolve(__dirname, '');
// const getUsers = (): User[] => {
//   const data = readFileSync(filePath, 'utf-8');
//   return JSON.parse(data);
// };
const getUsers = () => {
    try {
        const data = (0, fs_1.readFileSync)(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading or parsing users data:', error);
        throw new Error('Unable to fetch users');
    }
};
const saveUsers = (users) => {
    (0, fs_1.writeFileSync)(filePath, JSON.stringify(users, null, 2), 'utf-8');
};
const loginUser = (username, password) => {
    try {
        const users = getUsers();
        const user = users.find(user => user.username === username && user.password === password);
        return user || null;
    }
    catch (error) {
        console.error('Error reading users or parsing data:', error);
        throw new Error('Failed to fetch user data');
    }
};
exports.loginUser = loginUser;
const registerUser = (username, password) => {
    try {
        const users = getUsers();
        const newUser = {
            id: users.length + 1,
            username,
            password,
        };
        users.push(newUser);
        saveUsers(users);
        return newUser;
    }
    catch (error) {
        console.error('Error registering user:', error);
        throw new Error('User registration failed');
    }
};
exports.registerUser = registerUser;
