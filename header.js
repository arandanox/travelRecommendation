class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
      <div class="left-section">
      <img src= "img/logo.png" alt="logo de mi empresa" class="logo" >
      <span>My beautifull project</span>
     </div>
        <nav>
          <a href="travel_recommendation.html">Home</a>
          <a href="about.html">About Us</a>
          <a href="contact_us.html">Contact Us</a>
        </nav>
        <div class = "right-section">
        <input type="text" id="destination-input" placeholder= "Enter destination or key word">
        <button id= "search-btn">  Search</button>
        <button id="clean-search-btn"> Clean</button>
        </div>

      </header>
    `;
  }
}
customElements.define("my-header", MyHeader);

function getDestination(){
  const inputValue = document.getElementById("destination-input").value.toLowerCase();
  console.log(inputValue);
  return inputValue;
}
async function getDataFromJson(inputValue){       //returns array results
        try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
          let results =[];
          Object.values(data).forEach(array => {   //recorremos los objetos del json
            array.forEach(item =>{
              if ("cities" in item){
                item.cities.forEach(city =>{
                  if (city.name.toLowerCase().includes(inputValue)){
                  console.log(`included ${city.name}`)
                  results.push(city)}
                })
              } else {
                if (item.name.toLowerCase().includes(inputValue)){
                  console.log(`included ${item.name}`)
                  results.push(item)}
              }
            })
            })
        if (results.length === 0){
            
          Object.entries(data).slice(1).forEach(([key, array]) => {
              if(key.includes(inputValue)){
                array.forEach(item =>{        //recorremos las listas dentro de esos objetos
                    console.log(`included ${item.name}`);
                  results.push(item);
                })
              }})

        } return results 
              
          
       

       } catch(error){
            console.error("Error loading data:", error)
       } ;
}


const searchBtn = document.getElementById('search-btn');
const cleanBtn = document.getElementById('clean-search-btn');
let results = []
async function search(){
  cleanSearch()
  const inputValue = getDestination()
  results = await getDataFromJson(inputValue) // return results array
  console.log(results)
}
searchBtn.addEventListener("click",async () => {
  await search();         // primero actualizar resultados
  renderResults();  // luego mostrar los resultados
});

cleanBtn.addEventListener("click", async () => {
  await cleanSearch();    // primero limpiar
  renderResults();  // luego actualizar la vista
});


function cleanSearch(){
 results = []
 console.log(`results : ${results}`)
}
const resultsContainer = document.getElementById('search-results');
function renderResults(){
    if (results.length > 0){
      resultsContainer.innerHTML = "";
      results.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("result-item");
        div.innerHTML = `
          <img src="img/${item.imageUrl}" alt="${item.name}" class="result-img">
          <div class="result-text">
          <h3>${item.name}</h3>
        <p>${item.description}</p>
          </div>
    `;

        resultsContainer.appendChild(div);
      })
      resultsContainer.classList.add("active");
    }else {
        resultsContainer.classList.remove("active");
      }
    }
  