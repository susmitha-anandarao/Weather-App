

const weatherForm = document.querySelector('form')
const myWeatherButton = document.querySelector('#my-weather')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = '/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

myWeatherButton.addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    myWeatherButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {

        const url = `/weather?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
        myWeatherButton.removeAttribute('disabled')
    })
})