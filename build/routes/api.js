"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
let router = express_1.default.Router();
//Send all the associations to the client
router.get('/api/causes', (req, res) => {
    let collection = mongoose_1.default.connection.collection('causes');
    collection.find({}).toArray((err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
});
module.exports = router;
