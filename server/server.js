const express = require('express');
const next = require('next');
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

/*
*This variable contains my mongoDB URL.  I realize this contains my user name and password, but I didn't have
*time to deploy this to a server.  Also, I thought you would appreciate not having to hook up your own mongoDB
*database. 
*/
const MONGO_URL = 'mongodb+srv://NJosten99:b29tc4wAMDB@cluster0.uxonuvl.mongodb.net/?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
mongoose.connect(MONGO_URL, options);

const port = 3000;
const ROOT_URL = `http://localhost:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cors());
  server.use("/api", routes);
  server.use(express.urlencoded({ extended: true }));

  server.get('*', (req, res) => handle(req, res));

  // starting express server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`);
  });
});
