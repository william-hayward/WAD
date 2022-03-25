const express = require('express');
const app = express();
const mysql = require('mysql2');
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const con = require('./mysqlconn');
const sessionStore = new MySQLStore({ }, con.promise());

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserDao = require('./dao/userDao');

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

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: false}));

/*app.post('*', (req,res,next)=>{
	if(process.env.APP_USER === undefined){
		res.status(401).json({error: "You're not logged in. Go away!"});
	}else{
		next();
	}
	
});*/

/*app.post('/login', (req,res) => {
	con.query(`SELECT * FROM ht_users WHERE username=? AND password=?`, [req.body.username, req.body.password],
			  (error,results,fields) => {
		if(results.length == 1){
			req.session.username = req.body.username;
			res.json({"username": req.body.username});
		}else {
			res.status(401).json({ error: error });
		}
	}
)});*/

app.post('/login', passport.authenticate('local', {failureRedirect: '/badlogin'}), (req, res) => {
	res.json(req.user);
});

app.post('/logout', (req,res) => {
	req.session = null;
	res.json({'success': 1});
});

app.use((req, res, next) => {
	if(["POST", "DELETE"].indexOf(req.method) == -1){
		next();
	}else{
		if(req.user && req.user.username){
			next();
		}else{
			res.status(401).json({error: "You're not logged in. Go away!"});
		}
	}
});


const userRouter = require('./routes/users.js');
app.use('/users', userRouter);

const songRouter = require('./routes/songs.js');
app.use('/songs', songRouter);



app.get('/login', (req, res) => {
	res.json({username: req.user.username || null});
	
});


passport.use(new LocalStrategy(async(username, password, done) => {
	const userDao = new UserDao(con, "ht_users");
	try{
		const userDetails = await userDao.login(username, password);
		if(userDetails === null){
			return done(null, false);
		}else{
			return done(null, userDetails);
		}
	}catch(e){
		return done(e);
	}
}));

passport.serializeUser((userDetails, done) => {
	done(null, userDetails.ID);
});

passport.deserializeUser(async(userid, done) => {
	try{
		const userDao = new UserDao(con, "ht_users");
		const details = await userDao.findById(userid);
		done(null, details);
	}catch(e){
		done(e);
	}
});

app.get('/badlogin', (req, res) => {
	res.status(401).json({error: "The login was invalid"});
});



    
app.listen(3000);




