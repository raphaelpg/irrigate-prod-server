"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cause_1 = __importDefault(require("../models/cause"));
let router = express_1.default.Router();
router.get('/api/causes', (req, res) => {
    let collection = mongoose_1.default.connection.collection('causes');
    collection.find({}).toArray((err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
});
router.post('/api/addcause', (req, res) => {
    const { name, description, link, category, continent, country, address, logoName } = req.body;
    const newCause = new cause_1.default({
        name: name,
        description: description,
        link: link,
        category: category,
        continent: continent,
        country: country,
        address: address,
        logoName: logoName,
    });
    let collection = mongoose_1.default.connection.collection('pendingCauses');
    collection.insertOne(newCause, (error) => {
        if (error) {
            res.status(500).json({ msg: 'Internal server error' });
        }
        res.status(200).json({ msg: 'Cause added successfully' });
    });
});
module.exports = router;
