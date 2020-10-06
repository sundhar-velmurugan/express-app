const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const logger = require('./middleware/logger');
const constants = require('./constants');

const app = express();

const PORT = process.env.PORT || constants.PORT;

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Template routes
app.get('/template', (req, res) => {
  const { members } = constants;
  res.render('index', {
    title: 'Member App',
    members
  });
});

app.get('/template/new', (req, res) => {
  res.render('add', {
    title: 'Add New Member'
  });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Route
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
