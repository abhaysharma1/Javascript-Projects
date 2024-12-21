document.addEventListener('DOMContentLoaded',()=>{


    const getweather = document.getElementById('addbut')
    const input = document.getElementById('textbox')
    const infosec = document.getElementById('info')
    const city = document.getElementById('city-name')
    const temp = document.getElementById('temperature')
    const desc = document.getElementById('description')

    const error = document.getElementById('error')

    const apikey =` `


    getweather.addEventListener('click',async ()=>{
        const cityname = input.value.trim()
       
        if(!cityname)return

        try {
            const data = await getdata(cityname)
            showdata(data)
        } catch (error) {
            showerror()
        }

    })

    async function getdata (cityname){
        const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cityname}&aqi=no`

        const response = await fetch(url)
        console.log(response);

        if (!response.ok){
            throw new Error("City Not Found")
        }

        const data = await response.json()
        return data
        
    }

    function showdata (data){
        console.log(data)

        const {location,current} = data
        temp.textContent = `Temperature: ${current.temp_c} C`
        desc.textContent = `Humidity: ${current.humidity} `
        city.textContent = `City: ${location.name}`
       

        infosec.classList.remove('hidden')
        error.classList.add('hidden')
    }
    
    function showerror(){
        infosec.classList.remove('hidden')
        error.classList.add('hidden')
    }
})
