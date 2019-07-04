// FETCH basic

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         // console.log(data)
//     })
// })

const form = document.querySelector('form')
const search = document.querySelector('input')
var  message1 = document.querySelector('#message1')
var message2 = document.querySelector('#message2')

form.addEventListener('submit' , (e) => {
    e.preventDefault();

    const location = search.value


    if(!location) {
         message1.innerHTML = 'Please provide a location.'
    }else {
        fetch('/weather/?address=' + location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    message1.innerHTML = data.error
                }
                else {
                    message1.innerHTML = data.summary + ' With ' + 'Temperature ' + data.temperature + ' degree, Rain probability ' + data.precipProbability + '% & Humidity '+ data.humidity + ' :)'
                    message2.innerHTML = data.address
                }
            })
        })
    }

})
