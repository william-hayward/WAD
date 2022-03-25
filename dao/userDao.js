class UserDao {
	constructor(con, table) {
		this.con = con;
		this.table = table;
	}
	
	findAllUsers() {
		return new Promise ( (resolve, reject) => {
			this.con.query(`SELECT * FROM ${this.table}`,
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
	
	findUserByUsername(username){
		return new Promise((resolve, reject)=>{
			this.con.query(`SELECT * FROM ${this.table} WHERE username=?`, [username],
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

module.exports = UserDao;