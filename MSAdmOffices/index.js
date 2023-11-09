require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const officeRoutes = require("./router/officeRouter");
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const mongoURL = process.env.MONGO_DB;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error))
  .then(() => {
    app.use("/api/v1/offices", officeRoutes);
    app.listen(port, () => {
      console.log(`Init in the port: ${port}`);
    });
  }).catch(err => console.log(err));