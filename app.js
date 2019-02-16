const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const port = 5000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', {name: 'Fes'})
});

app.get('/about', (req, res) => {
  res.send('ABOUT');
});

app.listen(port, () =>{
  console.log(`Server started on ${port}`);
});

