import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import router from './routes/router';

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI!, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router);

app.listen(PORT, () => (console.log(`Server listening at ${PORT}`))); 