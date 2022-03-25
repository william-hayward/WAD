const ArtistDao = require('../dao/artistsDao');

class ArtistController {
	constructor(db){
		this.dao = new ArtistDao(db, "artists")
	}
	
		async findHometown(req, res){
		try{
			const hometown = await this.dao.findHometown(req.params.Artist);
			res.json(hometown);
		}catch(e){
			res.status(404).json({error: e});
		}
	}
};

module.exports = ArtistController;