const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(cors());
const routes = require('./routes/api');
app.use(helmet());
app.use(morgan('tiny'));

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
});

//Data parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/ressources', express.static('ressources'))


app.use('/', routes);

app.use(express.static('./irrigate-client/public/'));	

app.listen(PORT, console.log(`Server listening at ${PORT}`)); 