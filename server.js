require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

//connect to mongodb
const URI = process.env.MONGODB_CONNECTION;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err=> {
    if(err) {
        console.log('mongodb error');
    }
    console.log('Connected to MongoDB');
});

app.get('/', (req,res) => {
    res.json({msg: 'tugsuu'});
});

const PORT = process.env.port || 5000;

// routes folder zaaj ugch baiga heseg
require('./backend/routes')(app);

app.use(cors());
app.use(express.json());

app.listen(PORT, ()=> {
    console.log('Server is running on port', PORT);
});