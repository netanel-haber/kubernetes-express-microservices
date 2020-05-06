const { Schema } = require('mongoose');
const { weather } = require('../mongodbConnection');

const userWeatherSchema = new Schema({
    username: String,
    history: [String],
    feelings: [{ city: String, time: Date }]
});

const UserWeather = weather.model('UserHistory', userWeatherSchema);

const userWeather = new UserWeather({
    username: "aaa",
    history: ["london", "paris"],
    feelings: [
        { city: "london", time: Date.now() },
        { city: "paris", time: Date.now() }
    ]
}).save();


