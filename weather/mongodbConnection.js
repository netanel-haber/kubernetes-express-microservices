const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}`;

const weather = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

weather.on('error', function () {
    console.log('mongo connection error');
});
weather.once('open', function () {
    console.log("mongo: were connected");
});


module.exports = { weather };