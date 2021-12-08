/* Global Variables */
// URL for data related to input zip code
const mainURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API (metric for degree in C)
const myAPIKey = "&appid=8e5add0fbde256d0d7e99747cc9a2a86&units=metric";

// global var for Elements used below
const genrBtn = document.getElementById('generate');
const feelingElem = document.getElementById('feelings');
const zipElem = document.getElementById('zip');
const dateElem = document.getElementById('date');
const tempElem = document.getElementById('temp');
const contentElem = document.getElementById('content'); 

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
genrBtn.addEventListener('click', performAction);
/* Function called by event listener */
function performAction(e){
    let zipCode = zipElem.value;
    let content = feelingElem.value;
    getWebAPIData(zipCode).then((data)=>{
        if(data.cod===200){
            postData('/addData', {
                date:newDate,
                temp:data.main.temp,
                content: content,
            });
            updateUI('/all');
        }else{
            alert(data.message);
        }
    });
}

/* Function to GET Web API Data*/
const getWebAPIData = async(zip)=>{
    const res = await fetch(`${mainURL}${zip}${myAPIKey}`);
    try{
        const allData = await res.json();
        console.log(allData);
        return allData;
    }catch(error){
        console.error();
    }
};

/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const res = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data),
  });

    try {
        const newData = await res.json();
        
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};

/* Function to GET ProjectData */
const updateUI = async (url) => {
    const req = await fetch(url);
    try{
        const allData = await req.json();
        
        dateElem.innerHTML =`Date: ${allData.date}`;
        tempElem.innerHTML =`Temprature: ${allData.temp}°C`;
        contentElem.innerHTML =`My Feelings: ${allData.content}` ;
    }catch(error){
        console.log("error", error);
    }   
};