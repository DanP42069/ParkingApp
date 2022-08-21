'use strict';
const { Client } = require('pg');

async function connection() {
	const connection = new Client({
		user: 'postgres',
		host: 'localhost',
		database: 'postgres',
		password: 'Aa123456',
		port: 5433,
	});
	try {
		await connection.connect();
		return connection;
	} catch (err) {
		console.log(err);
	}
}

const getParkings = async () => {
	const con = await connection();
	try {
		const query = { text: 'SELECT * FROM public.t_park' };
		const result = await con.query(query);
		return result.rows;
	} catch (err) {
		console.log(err);
	} finally {
		await con.end();
	}
};

const getParking = async (id) => {
	const con = await connection();
	try {
		const query = { text: 'SELECT * FROM public.t_park WHERE id=$1', values: [id] };
		const result = await con.query(query);
		return result.rows[0];
	} catch (err) {
		console.log(err);
	} finally {
		await con.end();
	}
};

const deleteParking = async (id) => {
	const con = await connection();
	try {
		const query = { text: 'DELETE FROM public.t_park WHERE id=$1', values: [id] };
		const result = await con.query(query);
        return true;
	} catch (err) {
		console.log(err);
        return false;
	} finally {
		await con.end();
	}
};

const addParking = async (newParking) => {
	const con = await connection();
	const query = {
		text: 'INSERT INTO t_park VALUES ($1,$2,$3,$4,$5)',
		values: [
			newParking.id,
			newParking.x_coord,
			newParking.y_coord,
			newParking.address,
			newParking.time,
		],
	};
	const result = await con.query(query);
	try {
	} catch (err) {
		console.log(err);
	} finally {
		await con.end();
	}
};

module.exports = {
    getParkings,
    deleteParking,
    addParking
}


