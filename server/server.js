const express = require('express');
const { Client } = require('pg');
const app = express();

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

client.query('SELECT * FROM land_registry_price_paid_uk', (err, res) => {
  console.log(res.rows)
});

client.query(`INSERT INTO land_registry_price_paid_uk (street, city, price) VALUES ('fairview', 'fairfield', 4500)`, (err, res) => {
  console.log(res)
  //client.end()
});

//TODO: change the table name and data
app.get('/', (req, response) => {
  client.query('SELECT * FROM land_registry_price_paid_uk', (err, res) => {
    console.log(res.rows)
    response.status(200).send(res.rows);
  });
});

const port = 4000;
app.listen(port, () => console.log('now listening on port '))

