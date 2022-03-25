class SongDao {
	constructor(con, table) {
		this.con = con;
		this.table = table;
	}
	
	findSongsByArtist(artist) {
		return new Promise ( (resolve, reject) => {
			this.con.query(`SELECT * FROM ${this.table} WHERE artist=?`, [artist],
						  (err, results, fields) =>{
				if (err){
					reject(err);
				}
				else{
					resolve(results);
					
				}
			});
		});
	}
	
	findSongByTitle(title){
		return new Promise((resolve, reject) => {
			this.con.query(`SELECT * FROM ${this.table} WHERE title=?`, [title],
						  (err,results,fields)=>{
				if(err){
					reject(err);
				}else{
					resolve(results);
				}
			});
		});
	}
	
	findByArtistAndTitle(artist, title){
		return new Promise((resolve, reject) =>{
			this.con.query(`SELECT * FROM ${this.table} WHERE artist=? AND title=?`, [artist, title],
						  (err, results, fields) =>{
				if(err){
					reject(err);
				}else{
					resolve(results);
				}
			});
		});
	}
	
	findById(id){
		return new Promise((resolve, reject)=>{
			this.con.query(`SELECT * FROM ${this.table} WHERE ID=?`, [id],
						  (err, results, fields)=>{
				if(err){
					reject(err);
				}else{
					resolve(results);
				}
			});
		});
	}
	
	deleteSong(id){
		return new Promise((resolve, reject)=>{
			this.con.query(`DELETE FROM ${this.table} WHERE ID=?`,[id],
						  (err, results, fields)=>{
				if(err){
					reject(err);
				}else{
					resolve(results);
				}
			});
		});
	}
	
	buySong(id){
		return new Promise((resolve, reject)=>{
			this.con.query(`UPDATE ${this.table} SET quantity=quantity-1 WHERE id=?`, [id],
						  (err, results, fields)=>{
				if(err){
					reject(err);
				}else{
					resolve(results);
				}
			});
		});
	}
	
	// {"title": "suiSong", "artist": "suicnt", "day": 25, "month": 3, "year": 2022, "chart": null, "likes": 0, "downloads": 0, "review": "none", "quantity": 1000}
	createSong(title, artist, day, month, year, chart, likes, downloads, review, quantity){
		return new Promise((resolve, reject)=>{
			this.con.query(`INSERT INTO ${this.table}(title, artist, day, month, year, chart, likes, downloads, review, quantity) VALUES (?,?,?,?,?,?,?,?,?,?)`,
						   [title, artist, day, month, year, chart, likes, downloads, review, quantity],
						   (err, results, fields)=>{
				if(err){
					reject(err);
				}else{
					resolve(results);
				}
			});
		});
	}
	
};


module.exports = SongDao;
