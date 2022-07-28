let meal;
let mealCounter = 0;



do {
    meal = prompt("Write one by one the name of your meals (max 5, leave empty to exit)");

    if (meal == "") {
        alert("You didn't enter a meal, exiting...");
    } else {
        document.getElementsByClassName("meal-span")[mealCounter].textContent=meal;
        console.log("You entered the meal "+meal);
        if (mealCounter >= 4){
            alert("Good job! You entered all 5 meals.");
            break
        }
    }

    mealCounter++
} while (meal != "");

