import express from 'express';
import {addProjectController,editProjectController,listingProjectsController,projectDeletedAtController, updateListing} from '../controllers/projectController';
// const productController = require('../controllers/productController');
import authenticateToken from '../middleware/authMiddleware';

const router = express.Router();

// adding the project
router.post('/add',authenticateToken,addProjectController);


// FOR DELETING THE PROJECT
router.post('/delete',projectDeletedAtController);

//for listing the projects
router.get('/listing',authenticateToken, listingProjectsController);

//listing in the update projects
router.post('/update-listing',updateListing);


//for updating the projects
router.put('/edit/:projectId',editProjectController)

//FOR DEBUGGING
router.get('/check',(req,res) => {
    res.send("shai  ")
})





export default router;
