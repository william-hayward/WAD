const express = require('express');
const app = express();
const mysql = require('mysql2');
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const con = require('./mysqlconn');
const sessionStore = new MySQLStore({ }, con.promise());

app.use(express.json());

app.use(express.static('public'));

app.use(expressSession({
	store: sessionStore,
	secret: 'wadweek7',
	resave: false, 
	saveUninitialized: false,
	rolling: true,
	unset: 'destroy',
	proxy: true,
	cookie: {
		maxAge: 600000,
		httpOnly: false
	}
}));


app.use(express.urlencoded({extended: false}));

/*app.post('*', (req,res,next)=>{
	if(process.env.APP_USER === undefined){
		res.status(401).json({error: "You're not logged in. Go away!"});
	}else{
		next();
	}
	
});*/

app.post('/login', (req,res) => {
	con.query(`SELECT * FROM ht_users WHERE username=? AND password=?`, [req.body.username, req.body.password],
			  (error,results,fields) => {
		if(results.length == 1){
			req.session.username = req.body.username;
			res.json({"username": req.body.username});
		}else {
			res.status(401).json({ error: error });
		}
	}
)});

app.post('/logout', (req,res) => {
	req.session = null;
	res.json({'success': 1});
});

/*app.use((req, res, next) => {
	if(["POST", "DELETE"].indexOf(req.method) == -1){
		next();
	}else{
		if(req.session.username){
			next();
		}else{
			res.status(401).json({error: "You're not logged in. Go away!"});
		}
	}
});*/


const userRouter = require('./routes/users.js');
app.use('/users', userRouter);

const songRouter = require('./routes/songs.js');
app.use('/songs', songRouter);



app.get('/login', (req, res) => {
	res.json({username: req.session.username || null});
});




    
app.listen(3000);
