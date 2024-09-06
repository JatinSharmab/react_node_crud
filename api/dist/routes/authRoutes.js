"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/login", authController_1.login);
router.post("/signup", authController_1.signup);
exports.default = router;
// export default router;
// const router = Router();
// const prisma = new PrismaClient();
// router.get('/users', async (req, res) => {
//   console.log("here1");
//   try {
//     const result = await prisma.em_users.findMany();
//     // const result = await pool.query('SELECT * FROM em_users');
//     res.json(result);
//     console.log(result);
//   } catch (err) {
//     console.error('Error fetching users', err);
//     res.status(500).json({ error: 'Error fetching users' });
//   }
// });
// exports.register = async (req, res) => {
//   try {
//     const { username,email,password,role} = req.body;
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     // Create a new user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword,role,email });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// router.get('/check',(req,res) => {
//   res.send("healthy")
// })
