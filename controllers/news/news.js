const fetch = require('node-fetch');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('fd499cf14e084484b819df9a6a7c13e3');

const axios = require('axios');

module.exports = async (req, res) => {


    try {

        newsapi.v2.topHeadlines({
                sources: 'the-wall-street-journal',
                language: 'en',

            }).then(response => {
                let news1 = response.articles[1];
                let news2 = response.articles[2];
                let news3 = response.articles[3];
                
                console.log(news1.author);

                return res.status(200).json({
                    
                    data:{
                        news1,news2,news3
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });





    } catch (error) {
        console.log(error.message);
        return res.status(500).json('Internal Server Error');
    }


}