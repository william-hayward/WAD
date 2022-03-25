class ArtistDao {
	constructor(con, table) {
		this.con = con;
		this.table = table;
	}
	
		findHometown(artist){
		return new Promise((resolve, reject)=>{
			this.con.query(`SELECT * FROM ${this.table} WHERE name=?`, [artist],
						  (err, results, fields)=>{
				if(err){
					reject(err);
				}else{
					resolve(results[0]);
				}
			});
		});
	}
	
};

module.exports = ArtistDao;