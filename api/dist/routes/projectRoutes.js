"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
// const productController = require('../controllers/productController');
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// adding the project
router.post('/add', authMiddleware_1.default, projectController_1.addProjectController);
// FOR DELETING THE PROJECT
router.post('/delete', projectController_1.projectDeletedAtController);
//for listing the projects
router.get('/listing', authMiddleware_1.default, projectController_1.listingProjectsController);
//listing in the update projects
router.post('/update-listing', projectController_1.updateListing);
//for updating the projects
router.put('/edit/:projectId', projectController_1.editProjectController);
//FOR DEBUGGING
router.get('/check', (req, res) => {
    res.send("shai  ");
});
exports.default = router;
