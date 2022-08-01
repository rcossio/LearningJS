
let meal;
let mealCounter = 0;
let meal1;
let meal2;
let meal3;
let meal4;
let meal5;
let meal6;
let meal7;
const totalMacros = { 
    proteins:0,
    fats:0,
    carbs:0,
    calories: function () {return (this.proteins+this.carbs)*4+this.fats*9; } 
    }

function mealChecker (meal){
    /* Returns true if input is acceptable (meal/empty or cancel button) */
    if (meal == null) {
        return true
    }
    switch (meal.toLowerCase()) {
        case "guiso":
        case "tacos":
        case "lasagna":
        case "pizza":
        case "ravioles":
        case "ensalada":
        case "fideos":
        case "":
            return true;
        default:
            return false;
    }
};

function Meal(name,proteins,fats,carbs){
    /* Constructor for the object meal */
    this.name = name;
    this.proteins = proteins;
    this.fats = fats;
    this.carbs = carbs;
}

function getMealObj(meal){
    switch (meal.toLowerCase()) {
        case "guiso":
            return meal1;
        case "tacos":
            return meal2;
        case "lasagna":
            return meal3;
        case "pizza":
            return meal4;
        case "ravioles":
            return meal5;
        case "ensalada":
            return meal6;
        case "fideos":
            return meal7;
    }
}

/* Creating (fake) meals. This should be read from a table or database in the future*/
meal1 = new Meal("guiso",11,21,31)
meal2 = new Meal("tacos",12,22,32)
meal3 = new Meal("lasagna",13,23,33)
meal4 = new Meal("pizza",14,24,34)
meal5 = new Meal("ravioles",15,25,35)
meal6 = new Meal("ensalada",16,26,36)
meal7 = new Meal("fideos",17,27,37)


/* Reading the input*/
do {
    meal = prompt("Write the meals one by one\r\nYou can choose between theese meals:\r\n      - Guiso\r\n      - Tacos\r\n      - Lasagna\r\n      - Pizza\r\n      - Ravioles\r\n      - Ensalada\r\n      - Fideos\r\n(max 5, leave empty to exit)");
    let passed = mealChecker(meal);

    if ((meal == "") || (meal == null)) {
        alert("You didn't enter a meal, exiting...");
        break
    } 
    else if (passed) {
        mealCounter++
        mealObj = getMealObj(meal)
        console.log("You entered the meal "+meal+". With "+mealObj.proteins+" proteins, "+mealObj.fats+" fats, and "+mealObj.carbs+" carbs.");

        /* Calculating total macros*/
        totalMacros.proteins += mealObj.proteins;
        totalMacros.fats += mealObj.fats;
        totalMacros.carbs += mealObj.carbs;

        /* Parte que googlee de ansioso pero que aun no vimos */
        document.getElementsByClassName("name-span")[mealCounter-1].textContent=mealObj.name;
        document.getElementsByClassName("proteins-span")[mealCounter-1].textContent=mealObj.proteins;
        document.getElementsByClassName("fats-span")[mealCounter-1].textContent=mealObj.fats;
        document.getElementsByClassName("carbs-span")[mealCounter-1].textContent=mealObj.carbs;

        if (mealCounter >= 5){
            alert("Good job! You entered all 5 meals.");
            break
        }
    } 
    else {
        alert("You didn't enter a valid meal, try again.");
        continue
    }

    
} while (meal != "");

alert("The quantity of calories in this plan is "+totalMacros.calories()+" with "+totalMacros.proteins+" proteins, "+totalMacros.fats+" fats, and "+totalMacros.carbs+" carbs.")