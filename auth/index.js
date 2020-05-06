require('dotenv').config();
const app = require('express')();
app.use(require('body-parser').json());
require('./utilities/prepRes')(app);


app.get('/', (req, res) => {
	res.send("hello auth");
})

app
	.post('/signup', require('./routes/signup'))
	.post('/login', require('./routes/login'))
	.post('/verify-token', require('./routes/verifyToken'))
	.post('/refresh-token', require('./routes/refreshToken'));


const port = 3000;
app.listen(port, () => {
	console.log(`auth listening on port ${port}`);
});
