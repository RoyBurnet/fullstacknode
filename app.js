const express = require('express');
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

require('./models/Idea');
const Idea = mongoose.model('ideas');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
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

app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      })
    })
});

app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
})

app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    res.render('ideas/edit', {
      idea: idea
    });
  })
})

app.post('/ideas', (req, res) => {
  let errors = [];

  if(!req.body.title){
    errors.push({text: 'please add a title'});
  }
  if(!req.body.details){
    errors.push({text: 'please add some details'})
  }
  if(errors.length > 0 ){
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser={
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        req.flash('success_msg', 'Video Idea added')
        res.redirect('/ideas')
      })
  }
})

app.put('/ideas/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
    .then(idea => {
      req.flash('success_msg', 'Video Idea updated')
      res.redirect('/ideas')
    })
  })
})

app.delete('/ideas/:id', (req, res) => {
  Idea.deleteOne({
    _id: req.params.id
  })
  .then(() => {
    req.flash('success_msg', 'Video Idea removed')
    res.redirect('/ideas')
  })
})

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on ${port}`);
});

