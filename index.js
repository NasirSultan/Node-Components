import express from 'express';
import dotenv from 'dotenv';
import { login, refreshToken, protectedRoute, getUserData } from './auth.js';

dotenv.config();

const app = express();
app.use(express.json());


app.post('/login', login);
app.post('/refresh', refreshToken);
app.get('/protected', protectedRoute);
app.get('/user', getUserData);  


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
