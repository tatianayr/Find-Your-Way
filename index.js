require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieSession = require('cookie-session');
var morgan = require('morgan');

var app = express();
app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  // Cookie Options
  maxAge: 6 * 60 * 60 * 1000 // 6 hours
}))

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const citiesRouter= require("./routes/cidadeRoutes");
const seasonsRouter= require("./routes/seasonsRoutes");
const activitiesRouter=require("./routes/activityRoutes");
const historyRouter=require("./routes/historyRoutes");
const costRouter=require("./routes/costRoutes");
const numberRouter=require("./routes/numbCitiesRoutes");
app.use("/api/number", numberRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/seasons",seasonsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/history",historyRouter);
app.use("/api/cost",costRouter);
const usersRouter = require("./routes/usersRoutes");



app.use("/api/users",usersRouter);



// when we don't find anything
app.use((req, res, next) => {
  res.status(404).send({msg:"No resource or page found."});
})

// When we find an error (means it was not treated previously)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send(err);
})

const port = parseInt(process.env.port || '8080');
app.listen(port,function() {
  console.log("Server running at http://localhost:"+port);
});