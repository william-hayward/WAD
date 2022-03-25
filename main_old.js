const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
app.use(express.static('public'));


async function startApp() {
	try{
		var con = await mysql.createConnection({
			host: 'localhost',
			user: 'wad',
			password: 'wad',
			database: 'waddb'
		});
		
		console.log('connected to mysql ok');
		
		app.get('/artist/:Artist', async(req, res) => {
			try{
				const [results,fields] = await con.query(`SELECT * FROM wadsongs WHERE artist=?`, [req.params.Artist]);
				res.json(results);
			} catch(e) {
				res.status(500).json(e);
			}
		});
		
		app.get('/song/:title', async(req, res) => {
			try {
				const [results,fields] = await con.query(`SELECT * FROM wadsongs WHERE title=?`,
					 [req.params.title]);
				res.json(results);
			} catch(e) {
				res.status(500).json(e);
			}});
		
		app.get('/artist/:Artist/song/:title', async(req, res) => {
			try{
				const [results,fields] = await con.query(`SELECT * FROM wadsongs WHERE artist=? AND title=?`,
					 [req.params.Artist, req.params.title]);
				res.json(results);
			} catch(e) {
				res.status(500).json(e);
			}});
			
		app.get('/id/:id', async(req, res) => {
			try{
				const [results,fields] = await con.query(`SELECT * FROM wadsongs WHERE ID=?`,
					 [req.params.id]);
				res.json(results);
			} catch(e) {
				res.status(500).json(e);
			}});
		
		app.post('/buy/:id', async(req, res) => {
			try{
				const [results,fields] = await con.query(`UPDATE wadsongs SET quantity=quantity-1 WHERE id=?`,
					 [req.params.id]);
				res.json({'message': 'Successfully bought.'});
			} catch(e) {
				res.status(404).json({error: 'No rows updated, could not find a record matching that ID'});
			}});
			
		
		app.delete('/delete/:id', async(req, res) => {
			try{
				const [results,fields] = await con.query(`DELETE FROM wadsongs WHERE ID=?`, 
					 [req.params.id]);
				res.json({'message': 'Successfully deleted.' });
			} catch(e) {
				res.status(404).json({error: 'Could not delete.'});
			}});
		
		app.use(express.json());
		//{"title": "Pretend My Pain Away", "artist": "Citizen Soldier", "day": 2, "month": 2, "year": 2022, "chart": null, "likes": 0, "downloads": 0, "review": "none", "quantity": 1000}
		app.post('/create', async(req, res) => {
			try {
				const [results,fields] = await con.query(`INSERT INTO wadsongs(title, artist, day, month, year, chart, likes, downloads, review, quantity) VALUES (?,?,?,?,?,?,?,?,?,?)`,
					 [req.body.title, req.body.artist, req.body.day, req.body.month, req.body.year, req.body.chart, req.body.likes, req.body.downloads, req.body.review, req.body.quantity]);
			} catch(e) {
				res.status(500).json(e);
			}
			});
		
		app.get('/hometown/:artist', async(req, res) => {
			try{
				const [results, fields] = await con.query(`SELECT * FROM artists WHERE name=?`,
													[req.params.artist]);
				res.json(results);
			} catch(e){
				res.status(500).json(e);
			}
		});
		
		app.use(express.json());
		//{"name": "sui", "lat": 50.76144964788647, "lon": -1.86443567276001, "hometown": "Bournemouth"}
		app.post('/create/hometown', async(req, res) => {
			try{
				const [results, fields] = await con.query(`INSERT INTO artists(name, lat, lon, hometown) VALUES (?,?,?,?)`,
														  [req.body.name, req.body.lat, req.body.lon, req.body.hometown]);
				res.json({'message': 'added'});
			}catch(e) {
				res.status(500).json(e)
			}
		});
		
		
		app.listen(3000);
	} catch(e) {
			console.error(`ERROR connecting to database: ${e}`);
		}
}

startApp();

