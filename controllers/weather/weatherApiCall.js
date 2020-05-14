const axios = require('axios');
const fetch = require('node-fetch');

module.exports = async (req, res) => {







    try {


        // fetch('http://api.weatherapi.com/v1/current.json?key=7d21199c5e134b55a8283652202704&q=beirut')
        //     .then(response => response.json())
        //     .then(data => {
        //         let weatherData = data;
        //         console.log(weatherData);
        //         let location = data.location.name;
        //         console.log(location);
        //         let weatherFeelsLike = data.current.feelslike_c;
        //         console.log('Feels like : ' + weatherFeelsLike + ' C');

        //     });
        // let Data = data;


        

        axios.get('http://api.weatherapi.com/v1/current.json?key=7d21199c5e134b55a8283652202704&q=beirut')
            .then(response => {
                console.log(response.data);
                // console.log(response.data);
                let a =response.data;
                return res.status(200).json({
                    
                    data: {
                        message :a
                    }
                    // data: {
                    //     message: Data
                    // }
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