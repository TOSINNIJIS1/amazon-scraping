const express = require('express');
const { reset } = require('nodemon');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 8080;

// const apiKey = "0488625dd07c945af1d84ddc5f0bc175";

const generateApiKey = (apiKey) => (`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`);


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Orna Game Scraper API')
})


// Get Product Details by Product ID

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params

    const { api_key } = req.query

    try {
        const response = await request(`${generateApiKey(api_key)}&url=https://www.amazon.com/dp/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        reset.json(error)
    }
})

// Get Product Review

app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query


    try {
        const response = await request(`${generateApiKey(api_key)}&url=https://www.amazon.com/product-revews/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        reset.json(error)
    }
})

// Get Product offers

app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query


    try {
        const response = await request(`${generateApiKey(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        reset.json(error)
    }
})

// Search Product

app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params
    const { api_key } = req.query


    try {
        const response = await request(`${generateApiKey(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)

        res.json(JSON.parse(response));
    } catch (error) {
        reset.json(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

