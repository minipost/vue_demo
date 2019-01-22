"use strict";

import express = require("express");
import history = require("connect-history-api-fallback");
const port = 80;
const app = express();
app.use(
  history({
    verbose: true
  })
);

app.use("/", express.static("../frontend/dist"));
app.get('/api', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
