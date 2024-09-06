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
exports.getCities = exports.getStates = exports.getCountries = exports.editMyProfile = exports.getMyProfile = void 0;
const profileService_1 = require("../services/profileService");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//showing the profile
const getMyProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: "Unauthorized access",
                data: {},
            };
            return next();
        }
        const user = yield (0, profileService_1.getUserProfile)(userId);
        res.locals.response = {
            statusCode: 200,
            message: "User profile fetched successfully",
            data: user,
        };
        return next();
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        res.locals.response = {
            statusCode: 500,
            message: error.message || "An error occurred while fetching the profile",
            data: {},
        };
        return next();
    }
});
exports.getMyProfile = getMyProfile;
//editing the profile
const editMyProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { userFirstName, userLastName, userEmail, userGender, userPhone } = req.body;
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: "Unauthorized access",
                data: {},
            };
            return next();
        }
        const updatedUser = yield (0, profileService_1.updateUserProfile)(userId, {
            userFirstName,
            userLastName,
            userEmail,
            userGender,
            userPhone,
        });
        res.locals.response = {
            statusCode: 200,
            message: "User profile updated successfully",
            data: updatedUser,
        };
        return next();
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.locals.response = {
            statusCode: 500,
            message: error.message || "An error occurred while updating the profile",
            data: {},
        };
        return next();
    }
});
exports.editMyProfile = editMyProfile;
const getCountries = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        console.log(userId, "==============================================");
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: Invalid token.',
                data: {},
            };
            return next();
        }
        const countries = yield prisma.emCountry.findMany({
            select: {
                countryName: true,
                countryId: true,
            },
        });
        res.locals.response = {
            statusCode: 200,
            message: 'Countries Fetched Successfully.',
            data: { countries },
        };
        return next();
    }
    catch (err) {
        res.locals.response = {
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            data: {},
        };
        return next();
    }
});
exports.getCountries = getCountries;
const getStates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  const userId = await getUserIdFromToken(token);
        const userId = req.userId;
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: Invalid token.',
                data: {},
            };
            return next();
        }
        const { userCountry } = req.body;
        if (!userCountry) {
            res.locals.response = {
                statusCode: 404,
                message: 'Country is required.',
                data: {},
            };
            return next();
        }
        const country = yield prisma.emCountry.findFirst({
            where: { countryName: userCountry },
            select: { countryId: true },
        });
        if (!country) {
            res.locals.response = {
                statusCode: 404,
                message: 'Country not Found.',
                data: {},
            };
            return next();
        }
        const states = yield prisma.emState.findMany({
            where: { countryId: country.countryId },
            select: { stateId: true, stateName: true },
        });
        res.locals.response = {
            statusCode: 200,
            message: 'States fetched successfully.',
            data: { states },
        };
        return next();
    }
    catch (err) {
        res.locals.response = {
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            data: {},
        };
        return next();
    }
});
exports.getStates = getStates;
const getCities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: Invalid token.',
                data: {},
            };
            return next();
        }
        const { userState } = req.body;
        if (!userState) {
            res.locals.response = {
                statusCode: 404,
                message: 'State is required.',
                data: {},
            };
            return next();
        }
        const state = yield prisma.emState.findFirst({
            where: { stateName: userState },
            select: { stateId: true },
        });
        if (!state) {
            res.locals.response = {
                statusCode: 404,
                message: 'State not Found.',
                data: {},
            };
            return next();
        }
        const cities = yield prisma.emCities.findMany({
            where: { stateId: state.stateId },
            select: { cityId: true, cityName: true },
        });
        res.locals.response = {
            statusCode: 200,
            message: 'Cities fetched successfully.',
            data: { cities },
        };
        return next();
    }
    catch (err) {
        res.locals.response = {
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            data: {},
        };
        return next();
    }
});
exports.getCities = getCities;
