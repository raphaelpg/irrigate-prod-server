const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Send all the associations to the client
router.get('/api/causes', async (req, res) => {
	let collection = await mongoose.connection.collection('causes')
	collection.find({	}).toArray((err, data) => {
		if (err) throw err
		res.json(data)
	})
});

module.exports = router;