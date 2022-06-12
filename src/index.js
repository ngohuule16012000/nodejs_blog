const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const { urlencoded } = require('express');
const app = express();
const port = 3000;

const route = require('./routes');

        app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
); // xử lý lấy dữ liệu từ post form | req.body
app.use(express.json());

// dạng dữ liệu XMLHttpRequest, fetch, axios lên server ko qua form

// HTTP logger
//app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`);
});
