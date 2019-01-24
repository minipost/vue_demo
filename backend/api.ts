// wiki.js - Wiki route module.
import bodyParser = require('body-parser');
import express = require("express");
import cors = require("cors")
var router = express.Router();
router.use(cors())
router.use(bodyParser.json())
router.get("/", function(req, res) {
  for (const key in req.query) {
    console.log(key, req.query[key]);
  }
  res.send("Wiki home page");
});

router.get("/about", function(req, res) {
  console.log(req);
  res.send(JSON.stringify({ a: 8, b: 7 }));
});

router.post("/postPath", function(req, res) {
    console.log('post req',req)
  for (const key in req.body) {
    console.log(key, req.body[key]);
  }
  res.end("yes");
});
export default router;
