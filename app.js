document.addEventListener('DOMContentLoaded',()=>{
   const cityinput= document.getElementById('input-text');
   const weatherbtn= document.getElementById('weather-btn');
   const weatherinfo= document.getElementById('weather-info');
   const cityname= document.getElementById('cityname');
   const Description= document.getElementById('Description');
   const temp= document.getElementById('temp');

   const errormsg= document.getElementById('error-msg');
   const APIKey="76c8f6dd2f63237b78f399c75b46af8d";

   weatherbtn.addEventListener('click',async()=>{
     const cname=cityinput.value.trim();
     if(!cname)return;
     

     try{
      const weatherdata=await fetchdata(cname);
      displayweather(weatherdata);
     
     }
     catch(error){
      showerror(error);
     }
     cityinput.value="";
   });
  async  function fetchdata(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${APIKey}&units=metric`;
    const response = await fetch(url);
  
    if(!response.ok){
      throw new Error("city not found")
    }
    const data=await response .json()
    return data;

   }
   
   function displayweather(data){
    console.log(data)
    const{name,main,weather}=data;
    cityname.textContent=name;
    temp.textContent=`Temperature : ${ main.temp}`;
    Description.textContent=`Description : ${weather[0].description}`

    weatherinfo.classList.remove("clss");
    errormsg.classList.add("clss")

   }
   function  showerror(){
   
    weatherinfo.classList.add("clss")
     errormsg.classList.remove("clss");

   }
});