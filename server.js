const express = require('express');
const shortid = require('shortid');
const { getParkings, deleteParking, addParking, getParking } = require('./database');
const PORT = 3000;

const app = express();
const CORS = require('cors');
app.use(express.json());
app.use(CORS());

//Endpoints

app.get('/api/parking/:id', async (req, res) => {
	const parkingId = req.params.id;
	requestedParking = await getParking(parkingId);

	if (!requestedParking) {
		res.status(404).send(`parking ${parkingId} not found`);
	} else {
		res.send(requestedParking);
	}
});
app.get('/api/parkings', async (req, res) => {
	const parkings = await getParkings();

	if (!parkings || !parkings.length) {
		res.status(404).send(`Parkings do not exist`);
	} else {
		res.send(parkings);
	}
});

//  Create
app.post('/api/parking', async (req, res) => {
	const newParking = {
		id: shortid.generate(),
		x_coord: req.body.x_coord,
		y_coord: req.body.y_coord,
		address: req.body.address,
		time: Date.now(),
	};
	await addParking(newParking);
	res.send(newParking);
});

// app.put('/api/parking', (req, res) => {
// 	const id = req.body.id;
// 	const parkings = getParkings();
// 	let updatedParkings = parkings.map((parking) => (parking.id === id ? req.body : parking));
// 	updateParkings(updatedParkings);
// 	res.send(req.body);
// });

//Delete
app.delete('/api/parking/:id', async (req, res) => {
	const parkingId = req.params.id;

	//findIndex+splice
	if (!(await deleteParking(parkingId))) {
		res.status(404).send('Parking not found. Deletion failed.');
	} else {
		res.send(`Parking ${parkingId} has been deleted`);
	}
});

app.listen(PORT, function (err) {
	if (err) {
		console.log('Error in server setup');
	}
	console.log('Server listening on Port', PORT);
});
