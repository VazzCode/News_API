const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

const newspapers =[
    {
        name: "guardian",
        address: "https://www.theguardian.com/environment/climate-crisis",
        base: ''
    },
    {
        name: "thetimes",
        address: "https://www.thetimes.co.uk/environment/climate-change",
        base: ''
    },
    {
        name: "telegraph",
        address: "https://www.telegraph.co.uk/climate-change",
        base: 'https://www.telegraph.co.uk'
    },
]
const articles = [];

newspapers.forEach(newspaper =>{

    axios.get(newspaper.address)
        .then(resp => {
            const html = resp.data;
            const che = cheerio.load(html)

            che('a:contains(climate)', html).each(function () {
                const title = che(this).text().trim()
                const url = che(this).attr('href')
                
                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })
        })
        .catch(err => console.log(err))
})

app.get('/',(req,res) =>{
    res.json(`Welcome to Vasanth's API `)
})

// Endpoint to send data
app.get('/news', (req, res) => {
    res.json(articles)
});

app.get('/news/:newspaperid',(req,res)=> {
    const newspaperId = req.params.newspaperid
    const newspaper = newspapers.filter(newspaper => newspaper.name == newspaperId)[0]
    const address = newspaper.address
    const base = newspaper.base

    axios.get(address)
        .then(response =>{
            const html = response.data
            const che = cheerio.load(html)
            const specific = []

            che('a:contains("climate")',html).each(function(){
                const title = cheche(this).text().trim()
                const url = che(this).attr("href")

                specific.push({
                    title,
                    url: base + url,
                    source: newspaperId
                })
            })
            res.json(specific)
        })
})

// Starting the server on port 3000
app.listen(3000, () => {
console.log('Server started on http://localhost:3000/news');
});