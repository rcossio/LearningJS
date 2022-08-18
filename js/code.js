/* 
* DEFINITIONS 
*/

String.prototype.firstToUpperCase = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

class Food {
    constructor (name, proteins, fats, carbs,imageUrl) {
        /* Proteins, fats and carbs are Per Serving Size */
        this.name = name;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.servings = 0;
        this.image = imageUrl;
    }

    setServings(servings){ 
        this.servings = servings;
    };

    totalProteins(){ 
        return this.proteins*this.servings; 
    };

    totalFats(){ 
        return this.fats*this.servings; 
    };

    totalCarbs(){ 
        return this.carbs*this.servings; 
    };
}

/* 
* SIMULATE BACKEND 
*/
function loadFoodObjArray(){
    let foodObjArray = []
    foodObjArray.push( new Food("Guiso", 11, 21, 31,"./img/guiso.webp")   )
    foodObjArray.push( new Food("Tacos", 12, 22, 32,"./img/tacos.webp")   )
    foodObjArray.push( new Food("Lasagna", 13, 23, 33,"./img/lasagna.webp") )
    foodObjArray.push( new Food("Pizza", 14, 24, 34,"./img/pizza.webp")   )
    foodObjArray.push( new Food("Ravioles", 15, 25, 35,"./img/ravioles.webp"))
    foodObjArray.push( new Food("Ensalada", 16, 26, 36,"./img/ensalada.webp"))
    foodObjArray.push( new Food("Fideos", 17, 27, 37,"./img/fideos.webp")  )
    return foodObjArray;
}


/* 
* RUN MAIN SCRIPT 
*/

/* Asks user for permission to run the script */
swal({
    title: "Accept Terms and Conditions",
    text:"This site is not currently working with real nutritional information. Do you still want to enter the site?",
    buttons: {
        accept:{
            text: "Accept",
            value: true},
        reject:{
            text: "Reject",
            value: false}
        }
    }).then( (acceptedTerms) =>{
        if (!acceptedTerms) { 
            /* Aun no vimos esto que googlee, no se si hay una mejor forma de terminar el script */
             throw new Error("The user didn't accept to run the script");
        } 
    } )

/* Main global variables*/
const foodObjArray = loadFoodObjArray();
let foodNameArray = foodObjArray.map( (item) => item.name )
foodNameArray.unshift("")


setFoodOptions(foodNameArray);

cleanPage();

drawFoodCarrousel(foodObjArray,getArrayOfRandomIndices(4,foodObjArray.length))



/* 
* EVENTS 
*/

/* Calculate button */
let calculateButton = document.getElementById("calculate-macros-btn");
calculateButton.onclick = calculateMacros;

/* Load Prev settings button */
let loadPrevSettingsBtn = document.getElementById("load-previous-foods-btn");
loadPrevSettingsBtn.onclick = () => {null};

/* Browses foods */
let inputBox = document.getElementById("searchFoodBox");
inputBox.addEventListener("input",() => {
    let filteredArray = foodObjArray.filter((elem) => elem.name.toLowerCase().includes(inputBox.value.toLowerCase()));
    let foodCarrousel = document.getElementById("food-carrousel")
    foodCarrousel.innerHTML = "";
    for (let i=0; i< Math.min(4,filteredArray.length) ; i++) {
        foodCarrousel.innerHTML += getCardInnerHtml(filteredArray[i]);
    }
    setBtnfunctions ();
} );



/* 
* AUXILIARY FUNCTIONS 
*/
function getArrayOfRandomIndices(size,maxnum){
    let indices = [];
    while (indices.length < size) {
        let index = Math.floor(Math.random()*maxnum);
        if (indices.includes(index)) {
            continue;
        };
        indices.push(index);
    }    
    return indices;
};


function setFoodOptions(foodNameArray){
    let foodDatalist = document.getElementById("food-options");
    for (let foodName of foodNameArray) {
        foodDatalist.innerHTML += `<option>${foodName}</option>`;
    }
}


function cleanPage() {
    document.getElementById("searchFoodBox").value = null;
    for (const node of document.getElementsByClassName("food-selection")){
        node.value=null;
    }
    for (const node of document.getElementsByClassName("serving-span")){
        node.value=null;
    }
}


function getCardInnerHtml (foodObj){
    return `
    <div class="card" style="width: 10rem">
    <img src="${foodObj.image}" class="card-img-top" alt="Image of the food ${foodObj.name}" style="height: 8rem;">
    <div class="card-body mx-auto text-center">
      <h5 class="card-title">${foodObj.name}</h5>
      <button class="btn btn-secondary" id="button-${foodObj.name.toLowerCase()}">Add</a>
    </div>
    </div>`;
}


function drawFoodCarrousel(foodObjArray,indicesArray){
    let foodCarrousel = document.getElementById("food-carrousel");
    for (let index of indicesArray) {
        foodCarrousel.innerHTML += getCardInnerHtml(foodObjArray[index]);
    }
    setBtnfunctions ();
}


function setBtnfunctions (){
    for (let foodName of foodNameArray) {
        let button = document.getElementById("button-"+foodName.toLowerCase());
        if (!(button === null)) {
            button.onclick = () => {
                for (let i=0; i<5; i++) {
                    let inputBox = document.getElementsByClassName("food-selection")[i];
                    if (inputBox.value === ""){
                        inputBox.value = foodName;
                        document.getElementsByClassName("serving-span")[i].value = 1;
                        break
                    }
                }
            };
        }
    }
}


function getFoodObjFromName(food) {
    return foodObjArray.find((elem) => elem.name === food.firstToUpperCase())
}


function parseFood(food) {
    if (foodNameArray.includes(food.firstToUpperCase())) {
        return food
    } else {
        return ""
    }
};


function parseServings(servings) {
    if ((servings < 0) || (servings > 99) || (servings == "") ){
        return ""
    } else{
        return servings
    }
}


function readMealPlan(){
    let mealPlan = []
    let index = 0;
    
    for (let foodInput of document.getElementsByClassName("food-selection")) {
        let food = parseFood(foodInput.value);
        let servings = parseServings(document.getElementsByClassName("serving-span")[index].value)

        mealPlan.push({food: food, servings: servings, index:index})

        index++;
    };

    return mealPlan;
};


function invalidEntry(entry){
    return ((entry.food == "") || (entry.servings == ""))
};


function markInvalidEntries(entry){
    let backgroundColor = null;
    if (entry.food == "") {
        backgroundColor = "rgba(255,0,0,0.3)"
        displayDashesInInvalidRow(entry.index)
    }
    document.getElementsByClassName("food-selection")[entry.index].style.background = backgroundColor

    backgroundColor = null;
    if (entry.servings == "") {
        backgroundColor = "rgba(255,0,0,0.3)"
        displayDashesInInvalidRow(entry.index)
    } 
    document.getElementsByClassName("serving-span")[entry.index].style.background = backgroundColor
};


function displayDashesInInvalidRow(index){
    document.getElementsByClassName("proteins-span")[index].textContent = "-";
    document.getElementsByClassName("fats-span")[index].textContent = "-";
    document.getElementsByClassName("carbs-span")[index].textContent = "-";
}


function calculateMacros(){
    let mealPlan = readMealPlan();
    const totalMacros = { proteins: 0, fats:0, carbs:0, 
        calories: function () { return (this.proteins + this.carbs) * 4 + this.fats * 9; }
    }

    localStorage.setItem("mealPlan",JSON.stringify(mealPlan))

    for (let entry of mealPlan){

        if (invalidEntry(entry)) {
            markInvalidEntries(entry);
            continue
        }

        const foodObj = getFoodObjFromName(entry.food)
        foodObj.setServings(entry.servings);

        /* Sums up macronutrients*/
        totalMacros.proteins += foodObj.totalProteins();
        totalMacros.fats += foodObj.totalFats();
        totalMacros.carbs += foodObj.totalCarbs();

        /* Displays values in the table */
        document.getElementsByClassName("proteins-span")[entry.index].textContent = foodObj.totalProteins();
        document.getElementsByClassName("fats-span")[entry.index].textContent = foodObj.totalFats();
        document.getElementsByClassName("carbs-span")[entry.index].textContent = foodObj.totalCarbs();
    };
    
    document.getElementById("calories-calculation").textContent = "The quantity of calories in this plan is " + totalMacros.calories() + " with " + totalMacros.proteins + " proteins, " + totalMacros.fats + " fats, and " + totalMacros.carbs + " carbs.";
}