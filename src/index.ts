import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/routes';
import { errorHandler } from './utils';

const PORT = process.env.PORT;

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api/v1', routes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
