const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');

//middleware  =  =  =  =  =  =
app.use(cors({
  origin: 'http://localhost:3001',
  "Content-Type": "application/json",
}))

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

const client= new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'image_storage_db',
  //TODO: add encryption to this password and configs
  password: 'pass.me1234',
  port:1000
});

client.connect();

//TODO: make a disconnect method that we can call here (optional)
//-- use the client.end() method

app.get('/photos', (req, response) => {
  client.query('SELECT * FROM photos', (err, res) => {
    console.log(res.rows)
    response.status(200).send(res.rows);
  });
});

app.post('/photos', (req, response) => {
  const imageUrl = req.body.url;

  //add to db
  client.query(`INSERT INTO photos (url) VALUES ('${imageUrl}')`, (err, res) => {
    if (err) {
      response.status(500).send(err);
    }

    response.status(200).send(res);
  });
});

//TODO: remove this if not needed
app.delete('/photos', (req, response) => {
  // delete all from db
  client.query(`DELETE FROM photos`, (err, res) => {
    if (err) {
      response.status(500).send(err);
    }

    response.status(200).send(res);
  });
})

app.listen(port, () => console.log('now listening on port '))

