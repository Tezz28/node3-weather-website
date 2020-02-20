const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From JavaScript'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = '/weather?address=' + encodeURIComponent(location) 
    
    messageTwo.textContent = ''
    messageOne.textContent = "Loading...."
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            }else {

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
    // console.log(location)
})