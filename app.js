const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

//express method to conver urlsearchparams
app.use(express.urlencoded());

//options to set method and api key
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'Insert Api key here',
		'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
	}
};

app.get('/list', async (req, res) => {
    let listOfCurr = await fetch('https://currency-converter5.p.rapidapi.com/currency/list?format=JSON', options)
	.then(data => data.json());
	res.send(listOfCurr);
});

app.post('/', async (req, res) => {
    let test =  await fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${req.body.from}&to=${req.body.to}&amount=${req.body.amount}`, options)
	.then(response => response.json());
    console.log(test);
	console.log(req.body.amount);
    res.send(test.rates[req.body.to].rate_for_amount);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
