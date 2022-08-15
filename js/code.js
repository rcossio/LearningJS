
/* Method to transform string to lowercase with first char in uppercase  */
String.prototype.firstToUpperCase = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

/* Saves & retrieves information about foods*/
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

    totalProteins(){ return this.proteins*this.servings; };

    totalFats(){ return this.fats*this.servings; };

    totalCarbs(){ return this.carbs*this.servings; };
}

/* Asks user for permission to run the script */
let accepted = confirm("This site is not currently working with real nutritional information. Do you still want to enter the site?")
if (!accepted) {
    /* Aun no vimos esto que googlee, no se si hay una mejor forma de terminar el script */
    throw new Error("The user didn't accept to run the script");
}

/* Creates foods. This will be loaded from JSON file in the future*/
const foodObjArray = [];
foodObjArray.push( new Food("Guiso", 11, 21, 31,"./img/guiso.webp")   )
foodObjArray.push( new Food("Tacos", 12, 22, 32,"./img/tacos.webp")   )
foodObjArray.push( new Food("Lasagna", 13, 23, 33,"./img/lasagna.webp") )
foodObjArray.push( new Food("Pizza", 14, 24, 34,"./img/pizza.webp")   )
foodObjArray.push( new Food("Ravioles", 15, 25, 35,"./img/ravioles.webp"))
foodObjArray.push( new Food("Ensalada", 16, 26, 36,"./img/ensalada.webp"))
foodObjArray.push( new Food("Fideos", 17, 27, 37,"./img/fideos.webp")  )

/* Defines available foods to input*/
let foodNameArray = foodObjArray.map( (item) => item.name )
foodNameArray.unshift("")

/* Loads the page with available foods */
let foodDatalist = document.getElementById("foods-available");
for (let foodName of foodNameArray) {
    foodDatalist.innerHTML += `<option>${foodName}</option>`;
}

/* Cleans previos inputs on reload */
document.getElementById("searchFoodBox").value = null;
for (let i=0; i<5; i++) {
    document.getElementsByClassName("food-selection")[i].value = "";
    document.getElementsByClassName("serving-span")[i].value = null;
}


/* Show at random first initial foods*/
let sectionToShowFoods = document.getElementById("section-show-foods")
usedIndices = []
for (let i=1; i<5; i++) {
    let index = Math.floor(Math.random()*foodObjArray.length)
    if (usedIndices.includes(index)) {
        i--;
        continue
    } 
    usedIndices.push(index)
    sectionToShowFoods.innerHTML += `
    <div class="card" style="width: 10rem">
    <img src="${foodObjArray[index].image}" class="card-img-top" alt="Image of a food" style="height: 8rem;">
    <div class="card-body mx-auto text-center">
      <h5 class="card-title">${foodObjArray[index].name}</h5>
      <button class="btn btn-secondary" id="button-${foodObjArray[index].name.toLowerCase()}">Agregar</a>
    </div>
    </div>`;
}
setBtnfunctions ();

/* Adds effect to add buttons to foods*/
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


/* Runs main function by pressing button (lo vimos en el afterclass del miercoles) */
let calculateButton = document.getElementById("calculateMacros-btn");
calculateButton.onclick = calculateMacros;

/* Returns true if input is acceptable (food or empty) */
function foodChecker(food) {
    if (foodNameArray.includes(food.firstToUpperCase())) {
        return true
    } else {
        return false
    }
};

/* Finds food object from its name */
function getFoodObj(food) {
    return foodObjArray.find((elem) => elem.name === food.firstToUpperCase())
}

/* Displays dash where the input is invalid */
function setInvalidFood(index){
    document.getElementsByClassName("proteins-span")[index].textContent = "-";
    document.getElementsByClassName("fats-span")[index].textContent = "-";
    document.getElementsByClassName("carbs-span")[index].textContent = "-";
}

/* Reading the data and calculating macronutrients*/
function calculateMacros(){

    let index = 0;
    const totalMacros = { proteins: 0, fats:0, carbs:0, 
        calories: function () { return (this.proteins + this.carbs) * 4 + this.fats * 9; }
    }

    for (let foodInput of document.getElementsByClassName("food-selection")) {
        let food = foodInput.value;
        let passed = foodChecker(food);
    
        /* Skips when input is invalid */
        if ((food == "") || (!passed)) {
            foodInput.style.background = "rgba(255,0,0,0.3)"
            setInvalidFood(index);
            index++;
            continue;
        }
        foodInput.style.background = null
        
        /* Sums up macronutrients*/
        foodObj = getFoodObj(food)
        foodObj.setServings(document.getElementsByClassName("serving-span")[index].value);
        totalMacros.proteins += foodObj.totalProteins();
        totalMacros.fats += foodObj.totalFats();
        totalMacros.carbs += foodObj.totalCarbs();
    
        /* Displays values in the table */
        document.getElementsByClassName("proteins-span")[index].textContent = foodObj.totalProteins();
        document.getElementsByClassName("fats-span")[index].textContent = foodObj.totalFats();
        document.getElementsByClassName("carbs-span")[index].textContent = foodObj.totalCarbs();
    
        index++;
    }
    
    document.getElementById("calories-calculation").textContent = "The quantity of calories in this plan is " + totalMacros.calories() + " with " + totalMacros.proteins + " proteins, " + totalMacros.fats + " fats, and " + totalMacros.carbs + " carbs.";
}

/* Browses foods */
let inputBox = document.getElementById("searchFoodBox");
inputBox.addEventListener("input",() => {
    let filteredArray = foodObjArray.filter((elem) => elem.name.toLowerCase().includes(inputBox.value.toLowerCase()));
    let sectionToShowFoods = document.getElementById("section-show-foods")
    sectionToShowFoods.innerHTML = "";
    for (let i=0; i< Math.min(4,filteredArray.length) ; i++) {
        sectionToShowFoods.innerHTML += `
        <div class="card" style="width: 10rem">
        <img src="${filteredArray[i].image}" class="card-img-top" alt="Image of a food" style="height: 8rem;">
        <div class="card-body">
        <h5 class="card-title">${filteredArray[i].name}</h5>
        <button class="btn btn-secondary" id="button-${filteredArray[i].name.toLowerCase()}">Agregar</a>
        </div>
        </div>`;
    }
    setBtnfunctions ();
} );


