const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const PORT = process.env.PORT || 8080


//Set View Engine
app.set('view engine' , 'ejs')


//Set Views directory
 app.set('views' , path.join(__dirname,'../','views'))



//Server Static folder
app.use('/public' , express.static('public'))




//Home Page

app.get('/' , (req , res) => {
    res.render('index.ejs')
})




app.get('/weather' , (req , res ) => {
    if(!req.query.address) {
        return res.send({error : 'Please provide a location'})
    }

    geocode(req.query.address , (error , {latitude , longitude , address} ={}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude , longitude , (forecast_error , forecast_data) => {
            if(forecast_error) {
                return res.send({ error : forecast_error })
            }

            forecast_data.address = address
            res.send(forecast_data)
        })
    })
})


// Show 404-pages
app.get('*' , (req , res) => {
    res.render('404')
})



app.listen(PORT , ()=>console.log('Server is runnning of port '+ PORT + '...'))