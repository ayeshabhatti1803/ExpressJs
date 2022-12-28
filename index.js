const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const logger =require('./middleware/logger');
const members = require('./Members');

const app = express();


//init middleware
//app.use(logger);


// Handlebars Middleware
app.engine('handlebars', expressHbs.engine({
    layoutsDir: 'views/', // directory to handlebars files
    defaultLayout: null,
    extname: 'handlebars'
  })
);

app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false})); //pass in an object


// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);


//set static Folder
app.use(express.static(path.join(__dirname, 'public')));

//members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;



app.listen(PORT, ()  => console.log(`server started on port ${PORT}`));  //port variable
 
