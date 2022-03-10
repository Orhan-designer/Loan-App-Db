const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const api = require('./routes/api');
const cors = require('cors');
const addNewFriend = require('./routes/add-new-friend');
const friends = require('./routes/friends');
const loans = require('./routes/loans');
const login = require('./routes/login');
const newCredit = require('./routes/new-credit');
const register = require('./routes/register');
const users = require('./routes/users');
const ghostProfile = require('./routes/ghost-profile');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);
app.use('/api', addNewFriend);
app.use('/api', friends);
app.use('/api', loans);
app.use('/api', login);
app.use('/api', newCredit);
app.use('/api', register);
app.use('/api', users);
app.use('/api', ghostProfile);



app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log("Server running on localhost: " + PORT);
});

