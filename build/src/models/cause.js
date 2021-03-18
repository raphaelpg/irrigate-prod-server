"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CauseSchema = new Schema({
    date: {
        type: String,
        default: Date.now()
    },
    name: String,
    description: String,
    link: String,
    category: String,
    continent: String,
    country: String,
    address: String,
    logoName: String,
    logo: String,
    contactName: String,
    contactEmail: String
});
const Cause = mongoose_1.default.model('Cause', CauseSchema);
exports.default = Cause;
