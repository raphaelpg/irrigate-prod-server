import express from 'express';
import mongoose from 'mongoose';
let router: express.Router = express.Router();

//Send all the associations to the client
router.get('/api/causes', (req, res) => {
	let collection = mongoose.connection.collection('causes')
	collection.find({	}).toArray((err, data) => {
		if (err) throw err
		res.json(data)
	})
});

export = router;