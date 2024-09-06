"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../controllers/profileController");
// const productController = require('../controllers/productController');
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// Getting the profile information
router.get('/profile/', authMiddleware_1.default, profileController_1.getMyProfile);
//For Updating the profile
router.put('/profile/update', authMiddleware_1.default, profileController_1.editMyProfile);
router.get('/profile/country', authMiddleware_1.default, profileController_1.getCountries);
router.post('/profile/state', authMiddleware_1.default, profileController_1.getStates);
router.post('/profile/city', authMiddleware_1.default, profileController_1.getCities);
exports.default = router;
