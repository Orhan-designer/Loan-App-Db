const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const api = require('./routes/api');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
/* Connect to DB */

app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log("Server running on localhost: " + PORT);
});

