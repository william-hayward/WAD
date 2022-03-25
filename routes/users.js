const express = require('express');
const userRouter = express.Router();

const con = require('../mysqlconn');

const UserController = require('../controllers/userController');
const uController = new UserController(con);

userRouter.get('/all', uController.findAllUsers.bind(uController));
userRouter.get('/:username', uController.findUserByUsername.bind(uController));

/*userRouter.get('/all', (req, res)=>{
	con.query(`SELECT * FROM ht_users`, (error,results,fields)=>{
		if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
	});

});*/

/*userRouter.get('/user/:username', (req,res)=> {
    con.query(`SELECT * FROM ht_users WHERE username=?`,
        [req.params.username], (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});*/


//{"username": "suicnt", "password": "wad", "name": "sui", "dayofbirth": 29, "monthofbirth": 11, "yearofbirth": 2001, "balance": 100.00, "isadmin": 1, "ID": 123}
userRouter.post('/create', (req,res) => {
	con.query(`INSERT INTO ht_users(username, password, name, dayofbirth, monthofbirth, yearofbirth, balance, isadmin) VALUES (?,?,?,?,?,?,?,?)`, 
			  [req.body.username, req.body.password, req.body.name, req.body.dayofbirth, req.body.monthofbirth,
			  req.body.yearofbirth, req.body.balance, req.body.isadmin], 
			  (error,results,fields)=> {
		if(error){
			res.status(500).json({error:error});
		}else if(results.affectedRows==1){
			res.json({'message': 'Successfully created user.'});
		}else{
			res.status(404).json({error: 'No rows updated, user not created.'})
		}
		
	})
});


module.exports = userRouter;
