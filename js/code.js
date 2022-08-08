let meal;
let mealCounter = 0;
const mealList = [];
const totalMacros = {
    proteins: 0,
    fats: 0,
    carbs: 0,
    calories: function () { return (this.proteins + this.carbs) * 4 + this.fats * 9; }
}
/* Defines mealNameArray, which is the array of possible input meals*/
/* It is defined as a global variable instead of inside mealChecker so it wont be defined on every prompt */
let mealNameArray = mealList.map( (item) => item.name )
mealNameArray.push("")

function mealChecker(meal) {
    /* Returns true if input is acceptable (meal,empty or cancel button) */
    if (meal == null) {
        return true
    } else if (mealNameArray.includes(meal.toLowerCase())) {
        return true
    } else {
        return false
    }
};

class Meal {
    constructor (name, proteins, fats, carbs) {
        this.name = name;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;}
}

function getMealObj(meal) {
    /* Returns meal object by finding it from its name */
    return mealList.find((elem) => elem.name === meal)
}

/* Creating (fake) meals. This should be read from a table or database in the future*/
mealList.push( new Meal("guiso", 11, 21, 31)   )
mealList.push( new Meal("tacos", 12, 22, 32)   )
mealList.push( new Meal("lasagna", 13, 23, 33) )
mealList.push( new Meal("pizza", 14, 24, 34)   )
mealList.push( new Meal("ravioles", 15, 25, 35))
mealList.push( new Meal("ensalada", 16, 26, 36))
mealList.push( new Meal("fideos", 17, 27, 37)  )


/* Reading the input*/
do {
    meal = prompt("Write the meals one by one\r\nYou can choose between theese meals:\r\n      - Guiso\r\n      - Tacos\r\n      - Lasagna\r\n      - Pizza\r\n      - Ravioles\r\n      - Ensalada\r\n      - Fideos\r\n(max 5, leave empty to exit)");
    let passed = mealChecker(meal);

    if ((meal == "") || (meal == null)) {
        alert("You didn't enter a meal, exiting...");
        break
    } else if (passed) {
        mealCounter++
        mealObj = getMealObj(meal)
        console.log("You entered the meal " + meal + ". With " + mealObj.proteins + " proteins, " + mealObj.fats + " fats, and " + mealObj.carbs + " carbs.");

        /* Calculating total macros*/
        totalMacros.proteins += mealObj.proteins;
        totalMacros.fats += mealObj.fats;
        totalMacros.carbs += mealObj.carbs;

        /* Parte que googlee de ansioso pero que aun no vimos */
        document.getElementsByClassName("name-span")[mealCounter - 1].textContent = mealObj.name;
        document.getElementsByClassName("proteins-span")[mealCounter - 1].textContent = mealObj.proteins;
        document.getElementsByClassName("fats-span")[mealCounter - 1].textContent = mealObj.fats;
        document.getElementsByClassName("carbs-span")[mealCounter - 1].textContent = mealObj.carbs;

        if (mealCounter >= 5) {
            alert("Good job! You entered all 5 meals.");
            break
        }
    } else {
        alert("You didn't enter a valid meal, try again.");
        continue
    }


} while (meal != "");

alert("The quantity of calories in this plan is " + totalMacros.calories() + " with " + totalMacros.proteins + " proteins, " + totalMacros.fats + " fats, and " + totalMacros.carbs + " carbs.")