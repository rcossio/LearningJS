
/* Method to transform string to lowercase with first char in uppercase  */
String.prototype.firstToUpperCase = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

/* Saves & retrieves information about meals*/
class Meal {
    constructor (name, proteins, fats, carbs) {
        /* Proteins, fats and carbs are Per Serving Size */
        this.name = name;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.servings = 0;
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

/* Creates meals. This will be loaded from JSON file in the future*/
const mealObjArray = [];
mealObjArray.push( new Meal("Guiso", 11, 21, 31)   )
mealObjArray.push( new Meal("Tacos", 12, 22, 32)   )
mealObjArray.push( new Meal("Lasagna", 13, 23, 33) )
mealObjArray.push( new Meal("Pizza", 14, 24, 34)   )
mealObjArray.push( new Meal("Ravioles", 15, 25, 35))
mealObjArray.push( new Meal("Ensalada", 16, 26, 36))
mealObjArray.push( new Meal("Fideos", 17, 27, 37)  )

/* Defines available meals to input*/
let mealNameArray = mealObjArray.map( (item) => item.name )
mealNameArray.unshift("")

/* Loads the page with available meals */
let mealDatalist = document.getElementById("meals-available");
for (let mealName of mealNameArray) {
    mealDatalist.innerHTML += `<option>${mealName}</option>`;
}

/* Runs main function by pressing button (lo vimos en el afterclass del miercoles) */
let calculateButton = document.getElementById("calculateMacros-btn");
calculateButton.onclick = calculateMacros;

/* Returns true if input is acceptable (meal or empty) */
function mealChecker(meal) {
    if (mealNameArray.includes(meal.firstToUpperCase())) {
        return true
    } else {
        return false
    }
};

/* Finds meal object from its name */
function getMealObj(meal) {
    return mealObjArray.find((elem) => elem.name === meal.firstToUpperCase())
}

/* Displays dash where the input is invalid */
function setInvalidMeal(index){
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

    for (let mealInput of document.getElementsByClassName("meal-selection")) {
        let meal = mealInput.value;
        let passed = mealChecker(meal);
    
        /* Skips when input is invalid */
        if ((meal == "") || (!passed)) {
            mealInput.style.background = "rgba(255,0,0,0.3)"
            setInvalidMeal(index);
            index++;
            continue;
        }
        mealInput.style.background = null
        
        /* Sums up macronutrients*/
        mealObj = getMealObj(meal)
        mealObj.setServings(document.getElementsByClassName("serving-span")[index].value);
        totalMacros.proteins += mealObj.totalProteins();
        totalMacros.fats += mealObj.totalFats();
        totalMacros.carbs += mealObj.totalCarbs();
    
        /* Displays values in the table */
        document.getElementsByClassName("proteins-span")[index].textContent = mealObj.totalProteins();
        document.getElementsByClassName("fats-span")[index].textContent = mealObj.totalFats();
        document.getElementsByClassName("carbs-span")[index].textContent = mealObj.totalCarbs();
    
        index++;
    }
    
    document.getElementById("calories-calculation").textContent = "The quantity of calories in this plan is " + totalMacros.calories() + " with " + totalMacros.proteins + " proteins, " + totalMacros.fats + " fats, and " + totalMacros.carbs + " carbs.";
}