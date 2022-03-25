const express = require('express');
const songRouter = express.Router();

const con = require('../mysqlconn');

const SongController = require('../controllers/songController');
const sController = new SongController(con);

const ArtistController = require('../controllers/artistController');
const aController = new ArtistController(con);

songRouter.get('/artist/:Artist', sController.findSongsByArtist.bind(sController));
songRouter.get('/:title', sController.findSongByTitle.bind(sController));
songRouter.get('/artist/:Artist/title/:Title', sController.findByArtistAndTitle.bind(sController));
songRouter.get('/id/:Id', sController.findById.bind(sController));
songRouter.delete('/delete/:Id', sController.deleteSong.bind(sController));
songRouter.post('/buy/:Id', sController.buySong.bind(sController));
songRouter.post('/create', sController.createSong.bind(sController));

songRouter.get('/hometown/:Artist', aController.findHometown.bind(aController));




/*songRouter.get('/artist/:Artist', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE artist=?`,
    [req.params.Artist], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});*/

/*songRouter.get('/song/:title', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE title=?`,
        [req.params.title], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});*/

/*songRouter.get('/artist/:Artist/song/:title', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE artist=? AND title=?`,
        [req.params.Artist, req.params.title], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});*/

/*songRouter.get('/id/:id', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE ID=?`,
        [req.params.id], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});*/

/*songRouter.get('/hometown/:name', (req, res) => {
    con.query(`SELECT * FROM artists WHERE name=?`,
        [req.params.name], (error,results,fields) => { 
			if(results.length == 0){
				res.status(404).json({error: "no results"})
			}
			else{
				res.json(results[0]);				
			}
    });
}); */

/*songRouter.post('/buy/:id', (req, res) => {
    con.query(`UPDATE wadsongs SET quantity=quantity-1 WHERE id=?`, [req.params.id], (error, results, fields) =>{
		if(error){
			res.status(500).json({error: error});
		}else if(results.affectedRows==1){
			res.json({'message': 'Successfully bought.'});
		}else{
			res.status(404).json({error: 'No rows updated, could not find a record matching that ID'});
		}
	});    
});*/

/*songRouter.delete('/delete/:id', (req, res) => {
    con.query('DELETE FROM wadsongs WHERE ID=?', [req.params.id], (error,results,fields)=> {
        if(error) {
            res.status(500).json({error: error});
        } else if(results.affectedRows==1) {
            res.json({'message': 'Successfully deleted.'});
        } else {
            res.status(404).json({error: 'Could not delete: could not find a record matching that ID'});
        }
    } );
});*/

/*songRouter.post('/create', (req, res) => {
    con.query(`INSERT INTO wadsongs(title, artist, day, month, year, chart, likes, downloads, review, quantity) VALUES (?,?,?,?,?,?,?,?,?,?)`, [req.body.title, req.body.artist, req.body.day, req.body.month, req.body.year, req.body.chart, req.body.likes, req.body.downloads, req.body.review, req.body.quantity], (error,results,fields)=> {
        if(error) {
            res.status(500).json({error: error});
        } else if(results.affectedRows==1) {
            res.json({'message': 'Successfully created.'});
        } else {
            res.status(404).json({error: 'No rows updated, could not find a record matching that ID'});
        }
    } );
});*/

songRouter.post('/hometown/create', (req, res) => {
	con.query(`INSERT INTO artists(name, lat, lon, hometown) VALUES (?,?,?,?)`, [req.body.name, req.body.lat, req.body.lon, req.body.hometown], (error, results, fields) =>{
		if(error){
			res.status(500).json({error: error});
		}else if(results.affectedRows==1){
			res.json({'message': 'Successfully created.'});
		}else{
			res.status(404).json({error: 'No rows updated, could not find a record matching that ID'});
		}
	});   
});

module.exports = songRouter;