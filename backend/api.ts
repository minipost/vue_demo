// wiki.js - Wiki route module.
import bodyParser = require('body-parser');
import express = require("express");
import cors = require("cors")
var router = express.Router();
router.use(cors())
router.use(bodyParser.json())
router.get("/[a-f]*", function(req, res) {
  let q=''
//   for (const key in req.query) {
//     q+=' Key:'+key+' value:'+req.query[key];
//   }
  res.send("You mad a request on :"+req.path.toString()+' with params: '+JSON.stringify(req.query));
});



router.post("/[a-f]*", function(req, res) {
    console.log('post req',req)
  for (const key in req.body) {
    console.log(key, req.body[key]);
  }
  res.end("yes");
});
export default router;
