"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const api_1 = __importDefault(require("./routes/api"));
const app = express_1.default();
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(morgan_1.default('tiny'));
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
mongoose_1.default.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose_1.default.connection.on('connected', () => {
    console.log('Mongoose is connected');
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', api_1.default);
app.listen(PORT, () => (console.log(`Server listening at ${PORT}`)));
