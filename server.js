const express = require('express')
const app = express()
const cors = require('cors')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')


const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));


app.use('/', indexRouter);
app.use('/authors', authorRouter)
app.use('/books', bookRouter)


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// app.listen(process.env.PORT || 9000)
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});


