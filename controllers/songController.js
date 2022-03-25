const SongDao = require('../dao/songDao');

class SongController {
	constructor(db){
		this.dao = new SongDao(db, "wadsongs")
	}
	
	async findSongsByArtist(req, res){
		try{
			const songs = await this.dao.findSongsByArtist(req.params.Artist);
			res.json(songs);
		}catch(e){
			res.status(500).json({error: e});
		}
	}
	
	async findSongByTitle(req, res){
		try{
			const song = await this.dao.findSongByTitle(req.params.title);
			res.json(song);
		}catch(e){
			res.status(500).json({error: e});
		}
	}
	
	async findByArtistAndTitle(req, res){
		try{
			const song = await this.dao.findByArtistAndTitle(req.params.Artist, req.params.Title);
			res.json(song);
		}catch(e){
			res.status(500).json({error: e});
		}
	}
	
	async findById(req, res){
		try{
			const song = await this.dao.findById(req.params.Id);
			res.json(song);
		}catch(e){
			res.status(500).json({error: e});
		}
	}	
	
	async deleteSong(req, res){
		try{
			const song = await this.dao.deleteSong(req.params.Id);
			/*res.json(song.status);*/
			if(song.affectedRows==1) {
            	res.json({'message': 'Successfully deleted.'});
			}else if(song.affectedRows==0) {
            	res.status(404).json({error: 'Could not delete: could not find a record matching that ID'});
        	}else{
				res.status(500).json({error: 'Error!'});
			}
		}catch(e){
			res.status(500).json({error: e});
		}
		
	}
	
	async buySong(req, res){
		try{
			const song = await this.dao.buySong(req.params.Id);
			if(song.affectedRows==1) {
            	res.json({'message': 'Successfully bought.'});
			}else if(song.affectedRows==0) {
            	res.status(404).json({error: 'Could not buy: could not find a record matching that ID'});
        	}else{
				res.status(500).json({error: 'Error!'});
			}
		}catch(e){
			res.status(500).json({error: e});
		}
		
	}
	
	async createSong(req, res){
		try{
			const song = await this.dao.createSong(req.body.title, req.body.artist, req.body.day, req.body.month, 
												   req.body.year, req.body.chart, req.body.likes, req.body.downloads, 
												   req.body.review, req.body.quantity);
			if(song.affectedRows==1) {
            	res.json({'message': 'Successfully created.'});
			}else if(song.affectedRows==0) {
            	res.status(404).json({error: 'Could not create.'});
        	}else{
				res.status(500).json({error: 'Error!'});
			}
		}catch(e){
			res.status(500).json({error: e});
		}
	}
	
};


module.exports = SongController;