const request = require('request')

//Geocoding
//Address-> Lat/Long 

const geocode = (address , callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+  address +'.json?access_token=pk.eyJ1Ijoic3VyeWEyNiIsImEiOiJjanhrMTJlNzIwMGRtM3luMGRtcGNneThmIn0.kDh5Un9GUkIVA-0sc4LLiQ&limit=1'
    request({url : url , json : true} , (error , response) => {
        if(error){ // Low Level Error
            callback('Unable to connect to the network!' , undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find the location.', undefined)
        }
        else{
            callback(undefined , {latitude : response.body.features[0].center[0] , longitude : response.body.features[0].center[1] , address: response.body.features[0].place_name})
        }
    })
}


module.exports = geocode