const { Schema } = require('mongoose');
const { weather } = require('../mongodbConnection');


const feelingsSchema = new Schema({
    city: String,
    time: Date,
    feeling: String
});
const userWeatherSchema = new Schema({
    username: String,
    history: [String],
    feelings: [feelingsSchema]
});


const UserWeather = weather.model('UserHistory', userWeatherSchema);

function createUser(username, history = [], feelings) {
    return new UserWeather({ username, history, feelings })
}

async function getOrCreateRecord(username) {
    let user = await UserWeather.findOne({ username });
    if (user)
        return user;
    else {
        user = createUser(username);
        user.save();
    }
    return user;
}


async function updateHistory(username, searchItem) {
    const user = await getOrCreateRecord(username);
    user.history = [...user.history, searchItem];
    user.save();
}

async function updateFeelings(username, city, time, feeling) {
    const user = await getOrCreateRecord(username);
    user.feelings = [...user.feelings, { city, time, feeling }]
    user.save();
}


module.exports = {
    updateHistory,
    updateFeelings
}



