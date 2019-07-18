const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./config/server");

mongoose.connect(config.db.host);
const db = mongoose.connection;

db.on("error", err => console.error(err));
db.once("connected", () => {
	app.listen(config.port, () => {
		console.log(`running on port ${config.port}`);
	});
});
