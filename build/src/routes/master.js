"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const contact_1 = __importDefault(require("./contact"));
let router = express_1.default.Router();
router.use('/', api_1.default);
router.use('/contact', contact_1.default);
module.exports = router;
