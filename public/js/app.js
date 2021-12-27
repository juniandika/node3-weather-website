console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageLocation = document.querySelector('#location-message')
const messageForecast = document.querySelector('#forecast-message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    messageLocation.textContent = 'loading...'
    messageForecast.textContent = ''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageLocation.textContent = data.error
            } else {
                messageLocation.textContent = data.location
                messageForecast.textContent = data.forcast
            }
        })
    })
})