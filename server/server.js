const express = require("express");
const cors = require("cors");
const https = require("https");
const http = require("http");
const fs = require("fs");
const mysql = require("mysql");
const port = 3001;

let key = fs.readFileSync(__dirname + "/certs/kiszka.key");
let cert = fs.readFileSync(__dirname + "/certs/kiszka.crt");
let options = {
	key: key,
	cert: cert
};

app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "password",
	database: "starthebar",
});

app.post("/", (req, res) => {
	const { area, onPremiseOnly } = req.body;
	// area.map(a => `City LIKE '%${ a }%'`).join(" OR ")

	db.query(`SELECT * FROM vwMichiganVenues WHERE ${ onPremiseOnly ? `IsOnPremise = 1 AND ` : `` } City LIKE '%${ area }%'`, (err, result) => {
		if (err) {
			console.log(err);
		} else {	
			res.json(result);
		}
	});
});

// let server = https.createServer(options, app);
let server = http.createServer(options, app);

server.listen(port, () => {
	console.log("Server started on: " + port)
});