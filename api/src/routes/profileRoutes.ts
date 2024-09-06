import express from 'express';
import {getMyProfile,editMyProfile, getCountries, getStates, getCities} from '../controllers/profileController';
// const productController = require('../controllers/productController');
import authenticateToken from '../middleware/authMiddleware';

const router = express.Router();

// Getting the profile information
router.get('/profile/', authenticateToken, getMyProfile);

//For Updating the profile
router.put('/profile/update', authenticateToken, editMyProfile);

router.get('/profile/country',authenticateToken,getCountries);
router.post('/profile/state',authenticateToken, getStates);
router.post('/profile/city', authenticateToken, getCities);


export default router;
