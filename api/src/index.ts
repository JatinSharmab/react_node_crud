import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import projectRoutes from './routes/projectRoutes'
import middleware from './middleware/commonMiddleware';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8080;
app.use(cors());
app.use(express.json());//used for reading the json files at the end iske bina json files or data read nahi hoga
app.use('/auth', authRoutes);
app.use('/my', profileRoutes);
app.use('/projects',projectRoutes);


app.use(middleware);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
 