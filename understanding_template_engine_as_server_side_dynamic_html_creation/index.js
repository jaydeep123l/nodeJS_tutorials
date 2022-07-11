const express = require('express')
const ejs = require('ejs')
const path = require('path')

var indexRouter = require('./routes/index.js')
var userRouter = require('./routes/users.js')



const app = express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/',indexRouter);
app.use('/user_details',userRouter);


app.listen(3000,(err) => {
    if(err) throw err;
    console.log(`server listening on port 3000`)

})

