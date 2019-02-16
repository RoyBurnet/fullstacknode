const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost/vidjot-dev', { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//View engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next()
})


app.get('/', (req, res) => {
  const title = 'Welcome'
  res.render('index', {
    title: title
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});


// ROUTES
const ideas = require('./routes/ideas');
const users = require('./routes/users');

app.use('/ideas', ideas)
app.use('/users', users)

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on ${port}`);
});

