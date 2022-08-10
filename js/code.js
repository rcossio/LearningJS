let meal;
let mealCounter = 0;
const mealList = [];
const totalMacros = {
    /* proteins, fats and carbs are Per Serving Size */
    proteins: 0,
    fats: 0,
    carbs: 0,
    calories: function () { return (this.proteins + this.carbs) * 4 + this.fats * 9; }
}

function mealChecker(meal) {
    /* Returns true if input is acceptable (meal or empty) */
    if (mealNameArray.includes(meal.toLowerCase())) {
        return true
    } else {
        return false
    }
};

function getMealObj(meal) {
    /* Returns meal object by finding it from its name */
    return mealList.find((elem) => elem.name === meal.toLowerCase())
}

function setInvalidMeal(index){
    /* Used to established a dash where the input is invalid */
    document.getElementsByClassName("proteins-span")[index].textContent = "-";
    document.getElementsByClassName("fats-span")[index].textContent = "-";
    document.getElementsByClassName("carbs-span")[index].textContent = "-";
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
    }

    totalProteins(){ return this.proteins*this.servings; }

    totalFats(){ return this.fats*this.servings; }

    totalCarbs(){ return this.carbs*this.servings; }
}

/* Creating (fake) meals. This should be read from a table or database in the future*/
mealList.push( new Meal("guiso", 11, 21, 31)   )
mealList.push( new Meal("tacos", 12, 22, 32)   )
mealList.push( new Meal("lasagna", 13, 23, 33) )
mealList.push( new Meal("pizza", 14, 24, 34)   )
mealList.push( new Meal("ravioles", 15, 25, 35))
mealList.push( new Meal("ensalada", 16, 26, 36))
mealList.push( new Meal("fideos", 17, 27, 37)  )

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

/* Reading the input*/
for (let mealInput of document.getElementsByClassName("meal-selection")) {
    let meal = mealInput.value;
    let passed = mealChecker(meal);

    mealCounter++;

    if ((meal == "") || (!passed)) {
        mealInput.style.background = "rgba(255,0,0,0.3)"
        setInvalidMeal(mealCounter - 1);
        continue;
    }
    
    mealObj = getMealObj(meal)
    mealObj.setServings(document.getElementsByClassName("serving-span")[mealCounter - 1].value);

    /* Calculating total macros*/
    totalMacros.proteins += mealObj.totalProteins();
    totalMacros.fats += mealObj.totalFats();
    totalMacros.carbs += mealObj.totalCarbs();

    /* Set nutriend values in the table */
    document.getElementsByClassName("proteins-span")[mealCounter - 1].textContent = mealObj.totalProteins();
    document.getElementsByClassName("fats-span")[mealCounter - 1].textContent = mealObj.totalFats();
    document.getElementsByClassName("carbs-span")[mealCounter - 1].textContent = mealObj.totalCarbs();

    if (mealCounter >= 5) {
        break;
    }
}

document.getElementById("calories-calculation").textContent = "The quantity of calories in this plan is " + totalMacros.calories() + " with " + totalMacros.proteins + " proteins, " + totalMacros.fats + " fats, and " + totalMacros.carbs + " carbs.";