const request = require('request')

// Lat + Long -> weather 

const forecast = (latitude , longitude , callback) => {
    url = 'https://api.darksky.net/forecast/1a59f0677bd538ea9381476e452608fc/'+latitude+','+longitude

    request({ url : url , json:true} , (error , response) => {
        if(error){ //Low Level Error
            callback('Unable to connect to the network!' , undefined)
        }
        else if(response.body.error) {
            callback('Unable to find the location !' , undefined)
        }
        else{
            callback(undefined , {summary : response.body.daily.data[0].summary , temperature : response.body.currently.temperature , precipProbability : response.body.currently.precipProbability , humidity : response.body.currently.humidity})
        }
    })
}


module.exports = forecast