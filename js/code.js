let meal;
const mealList = [];


/* Defines a new method to transform string to lowercase with first char in uppercase  */
String.prototype.firstToUpperCase = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

/* Returns true if input is acceptable (meal or empty) */
function mealChecker(meal) {
    if (mealNameArray.includes(meal.firstToUpperCase())) {
        return true
    } else {
        return false
    }
};

/* Returns meal object by finding it from its name */
function getMealObj(meal) {
    return mealList.find((elem) => elem.name === meal.firstToUpperCase())
}

/* Used to established a dash where the input is invalid */
function setInvalidMeal(index){
    document.getElementsByClassName("proteins-span")[index].textContent = "-";
    document.getElementsByClassName("fats-span")[index].textContent = "-";
    document.getElementsByClassName("carbs-span")[index].textContent = "-";
}

class totalMacros {
    constructor (){
        /* proteins, fats and carbs are Per Serving Size */
        this.proteins= 0;
        this.fats=0;
        this.carbs=0;
    }

    calories() { return (this.proteins + this.carbs) * 4 + this.fats * 9; };

    resetValues() {
        this.proteins=0;
        this.fats=0;
        this.carbs=0;
    }
}

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

/* Creating (fake) meals. This should be read from a table or database in the future*/
mealList.push( new Meal("Guiso", 11, 21, 31)   )
mealList.push( new Meal("Tacos", 12, 22, 32)   )
mealList.push( new Meal("Lasagna", 13, 23, 33) )
mealList.push( new Meal("Pizza", 14, 24, 34)   )
mealList.push( new Meal("Ravioles", 15, 25, 35))
mealList.push( new Meal("Ensalada", 16, 26, 36))
mealList.push( new Meal("Fideos", 17, 27, 37)  )

/* Defines mealNameArray, which is the array of possible input meals*/
/* It is defined as a global variable instead of inside mealChecker so it wont be defined on every prompt */
let mealNameArray = mealList.map( (item) => item.name )
mealNameArray.unshift("")

/* Loads the page with the possible meals */
let availableMeals = document.getElementById("meals-available");
for (let mealName of mealNameArray) {
    let mealNewOption = document.createElement("option");
    mealNewOption.innerHTML = mealName;
    availableMeals.append(mealNewOption);
}

/* Agreement to use test script */
let accepted = confirm("This site is not currently working with real nutritional information. Do you still want to enter the site?")
if (!accepted) {
    /* Aun no vimos esto pero tambien lo google, no se si hay una mejor forma de terminar el script */
    throw new Error("The user didn't accept to run the script");
}

/* Use click on button as and event (lo vimos en el afterclass del miercoles) */
let eventButton = document.getElementById("calculateMacros-btn");
eventButton.onclick = calculateMacros;

/* Reading the data and calculating*/
function calculateMacros(){
    let mealCounter = 0;
    let totalMacrosInPlan = new totalMacros();
    for (let mealInput of document.getElementsByClassName("meal-selection")) {
        let meal = mealInput.value;
        let passed = mealChecker(meal);
    
        mealCounter++;
    
        if ((meal == "") || (!passed)) {
            mealInput.style.background = "rgba(255,0,0,0.3)"
            setInvalidMeal(mealCounter - 1);
            continue;
        } else {
            mealInput.style.background = null
        }
        
        mealObj = getMealObj(meal)
        mealObj.setServings(document.getElementsByClassName("serving-span")[mealCounter - 1].value);
    
        /* Calculating total macros*/
        totalMacrosInPlan.proteins += mealObj.totalProteins();
        totalMacrosInPlan.fats += mealObj.totalFats();
        totalMacrosInPlan.carbs += mealObj.totalCarbs();
    
        /* Set nutriend values in the table */
        document.getElementsByClassName("proteins-span")[mealCounter - 1].textContent = mealObj.totalProteins();
        document.getElementsByClassName("fats-span")[mealCounter - 1].textContent = mealObj.totalFats();
        document.getElementsByClassName("carbs-span")[mealCounter - 1].textContent = mealObj.totalCarbs();
    
        if (mealCounter >= 5) {
            break;
        }
    }
    
    document.getElementById("calories-calculation").textContent = "The quantity of calories in this plan is " + totalMacrosInPlan.calories() + " with " + totalMacrosInPlan.proteins + " proteins, " + totalMacrosInPlan.fats + " fats, and " + totalMacrosInPlan.carbs + " carbs.";
}
