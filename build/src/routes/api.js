"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cause_1 = __importDefault(require("../models/cause"));
const user_1 = __importDefault(require("../models/user"));
let router = express_1.default.Router();
// const MONGO_ASSOCIATIONS_DB = process.env.MONGO_ASSOCIATIONS_DB ||'';
const MONGO_ASSOCIATIONS_DB = process.env.MONGO_TEMPORARY_ASSOCIATIONS_DB || '';
const MONGO_USER_DB = process.env.MONGO_USER_DB || '';
router.get('/api/causes', (req, res) => {
    let collection = mongoose_1.default.connection.collection(MONGO_ASSOCIATIONS_DB);
    collection.find({}).toArray((err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
});
router.post('/api/addcause', (req, res) => {
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
router.post('/message', (req, res) => {
    console.log(req.body);
    res.status(200).json({ msg: 'Message sent successfully' });
});
router.post('/signup', (req, res) => {
    console.log(req.body);
    user_1.default.find({ email: req.body.email }).exec()
        .then((user) => {
        if (user.length >= 1) {
            return res.status(409).json({
                msg: 'Email address already used'
            });
        }
        else {
            bcrypt_1.default.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                else {
                    const user = new user_1.default({
                        email: req.body.email,
                        password: hash
                    });
                    let collection = mongoose_1.default.connection.collection(MONGO_USER_DB);
                    collection.insertOne(user, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                error: err
                            });
                        }
                        res.status(201).json({
                            msg: 'User created'
                        });
                    });
                }
            });
        }
    });
});
module.exports = router;
