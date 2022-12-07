const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const mysql = require("mysql");
const port = 3001;

var key = fs.readFileSync(__dirname + "/certs/kiszka.key");
var cert = fs.readFileSync(__dirname + "/certs/kiszka.crt");
var options = {
	key: key,
	cert: cert
};

app = express();
app.use(cors());

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "password",
	database: "starthebar",
});

app.get("/", (req, res) => {
	db.query(`SELECT * FROM MichiganLicenses LIMIT 20`, (err, result) => {
		if (err) {
			console.log(err);
		} else {	
			res.json(result);
		}
	});
});

var server = https.createServer(options, app);

server.listen(port, () => {
	console.log("Server started on: " + port)
});