"use strict";

import express = require("express");
import history = require("connect-history-api-fallback");
import apiRouter from "./api";

const port = 80;
const app = express();
app.use(
  history({
    verbose: true,
    rewrites: [
      {
        from: /^\/api$/,
        to: function(context) {
          return "/api"; // + context.parsedUrl.pathname;
        }
      }
    ]
  })
);

// app.get('/api', (req, res) => res.send('Hello World!'))
app.use("/api/", apiRouter);
app.use("/", express.static("../frontend/dist"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
