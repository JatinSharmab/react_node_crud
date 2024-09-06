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
exports.updateUserProfile = exports.getUserProfile = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.emUser.findUnique({
            where: {
                userId: parseInt(userId),
            },
            select: {
                userId: true,
                userFirstName: true,
                userLastName: true,
                userEmail: true,
                userRoleId: true,
                userPhone: true,
                userGender: true,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message || "Error fetching user profile");
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma.emUser.update({
            where: {
                userId: parseInt(userId),
            },
            data: {
                userFirstName: data.userFirstName,
                userLastName: data.userLastName,
                userEmail: data.userEmail,
                userPhone: data.userPhone,
                userGender: data.userGender,
            },
            select: {
                userId: true,
                userFirstName: true,
                userLastName: true,
                userEmail: true,
                userRoleId: true,
                userPhone: true,
                userGender: true,
                userCountry: true,
                userState: true,
                userCity: true,
            },
        });
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    }
    catch (error) {
        throw new Error(error.message || "Error updating user profile");
    }
});
exports.updateUserProfile = updateUserProfile;
