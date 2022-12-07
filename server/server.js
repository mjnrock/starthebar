const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const port = 3001;

var key = fs.readFileSync(__dirname + "/certs/kiszka.key");
var cert = fs.readFileSync(__dirname + "/certs/kiszka.crt");
var options = {
	key: key,
	cert: cert
};

app = express();
app.use(cors());

app.get("/", (req, res) => {
	res.json({
		message: "Hello from the API Server!",
	});
});

var server = https.createServer(options, app);

server.listen(port, () => {
	console.log("Server started on: " + port)
});