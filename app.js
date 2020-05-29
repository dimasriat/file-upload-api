const express = require("express");
const bp = require("body-parser");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: `${__dirname}/public/upload` });

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("halooo dunia"));

app.post("/upload", upload.single("avatar"), (req, res) => {
	if (req.file) {
		fs.rename(
			`${req.file.destination}/${req.file.filename}`,
			`${req.file.destination}/${req.file.originalname}`,
			(err) => res.send(req.file)
		);
	}
});

app.listen(8000, () => console.log("app running on port 8000"));
