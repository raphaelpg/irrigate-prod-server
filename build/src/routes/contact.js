"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cause_1 = __importDefault(require("../models/cause"));
let router = express_1.default.Router();
// const MONGO_ASSOCIATIONS_DB = process.env.MONGO_ASSOCIATIONS_DB ||'';
const MONGO_ASSOCIATIONS_DB = process.env.MONGO_TEMPORARY_ASSOCIATIONS_DB || '';
router.get('/message/causes', (req, res) => {
    let collection = mongoose_1.default.connection.collection(MONGO_ASSOCIATIONS_DB);
    collection.find({}).toArray((err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
});
router.post('/contact/addcause', (req, res) => {
    const { name, description, link, category, continent, country, address, logo, contactName, contactEmail } = req.body;
    const newCause = new cause_1.default({
        name: name,
        description: description,
        link: link,
        category: category,
        continent: continent,
        country: country,
        address: address,
        logo: logo,
        contactName: contactName,
        contactEmail: contactEmail
    });
    let collection = mongoose_1.default.connection.collection(MONGO_ASSOCIATIONS_DB);
    collection.insertOne(newCause, (error) => {
        if (error) {
            res.status(500).json({ msg: 'Internal server error' });
        }
        res.status(200).json({ msg: 'Cause added successfully' });
    });
});
router.post('/contact/message', (req, res) => {
    // const {name, email, message} = req.body;
    console.log(req.body);
    res.status(200).json({ msg: 'Message sent successfully' });
});
module.exports = router;
