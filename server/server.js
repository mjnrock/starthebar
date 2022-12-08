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
	console.log(req.body);
	const { searchType, data, onPremiseOnly } = req.body;
	// area.map(a => `City LIKE '%${ a }%'`).join(" OR ")

	if(searchType === "area") {
		let areas = data.split("||");

		if(data.includes("||")) {
			terms = data.split("||").map(cond => cond.split(":"));
		}

		db.query(`SELECT * FROM vwMichiganVenues WHERE ${ onPremiseOnly ? `IsOnPremise = 1 AND ` : `` } ${ areas.map(a => `CITY LIKE '%${ a }%'`).join(" OR ") }`, (err, result) => {
			res.json(result);
		});
	} else if(searchType === "name") {
		let names = data,
			joinType = "OR";

		if(data.includes("||")) {
			names = data.split("||");
		} else if(data.includes("&&")) {
			names = data.split("&&");
			joinType = "AND";
		}

		let where = names.reduce((a, name) => {
			if(name != null) {
				return [ `NAME LIKE '%${ name }%'`, ...a ];
			}

			return a;
		}, []);

		if(joinType === "OR") {
			where = where.join(" OR ");
		} else {
			where = where.join(" AND ");
		}

		db.query(`SELECT * FROM vwMichiganVenues WHERE ${ onPremiseOnly ? `IsOnPremise = 1 AND ` : `` } ${ where }`, (err, result) => {
			res.json(result);
		});
	} else if(searchType === "tag") {
		let terms = [ data.split(":") ],
			joinType = "OR";
		if(data.includes("&&")) {
			terms = data.split("&&").map(cond => cond.split(":"));
			joinType = "AND";
		} else if(data.includes("||")) {
			terms = data.split("||").map(cond => cond.split(":"));
		}

		let where = terms.reduce((a, [ term, value ]) => {
			if(value != null) {
				return [ `${ term.toUpperCase() } LIKE '%${ value }%'`, ...a ];
			}

			return a;
		}, []);

		if(joinType === "OR") {
			where = where.join(" OR ");
		} else {
			where = where.join(" AND ");
		}

		if(where) {
			db.query(`SELECT * FROM vwMichiganVenues WHERE ${ where }`, (err, result) => {
				res.json(result);
			});
		}
	}
});

// let server = https.createServer(options, app);
let server = http.createServer(options, app);

server.listen(port, () => {
	console.log("Server started on: " + port)
});