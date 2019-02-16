const express = require('express');

const app = express();

const port = 5000;

app.use(function(req, res, next){
  req.name = 'Doti Fresh';
  next();
});

app.get('/', (req, res) => {
  res.send(req.name);
});

app.get('/about', (req, res) => {
  res.send('ABOUT');
});

app.listen(port, () =>{
  console.log(`Server started on ${port}`);
});

