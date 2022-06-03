
const prompt = require("prompt-sync")({ sigint: true });

//Collecting and storing the Initial User Data, viz --username, using the prompt method.
console.log("\n---------------------------------------------------------------------\n");
const userName = prompt("Welcom Player! Enter your Username to get started: ");

// A message to for the user to define how the game works.
console.log("\n");
console.log(`Welc// ome ${userName}! \nThis is a guesing game, you will be required to guess a number \nbetween the specified range! Each correct guess takes you to next Level. \nBut a wrong guess kicks you out of the game! \nNow ${userName}, let's get started, Let's see if you can get to the last stage!`);
console.log("\n");

// Below, we will declare and initialize our reset/default state variables.
// Beginning with the "fixed" lower limit of our game.
const rangeLower = 1; //The lower-bound will always be fixed at 1.

// Then the initial upper-bound value

// The start value of the upper range.
let rangeUpper = 2;

//The initial stage.
let stageCount = 1;

//A default value to act as a loop decision variable.
let stillPlaying = false;

//Starting stage for players
let playerPoint = 0;


// MY_SCALABLE RANDOM NUMBER GENERATOR FUNCTION
// This is one of the most important part of the Game building task. 
// This function takes two parameters; the fixed lower-bound range and the upper-bound range value 
// which is continuously modified(incremented) as the game stage increases.
// NOTE: I defined the function globally. It is therefore accessible to any other child block.
// Initially, I encountered problems when I defined it locally within a while loop block. So I adjusted it to global 
// declaration and preferably made this function return a value.
let guessMe = (rangeLower, rangeUpper) => {
    //This algorithm generates all the possible numbers in the specified interval!
    let randomNumber = Math.round(rangeLower + Math.random() * (rangeUpper - 1));

    // This my algorithm proves effective in randomizing all the possible numbers in the defined interval.

    return randomNumber; //return the value randomly generated so that it can be stored in a variable we will examine shortly.
}

// MY_SWITCHING-OFF FUNCTION
// This function will stop the game once the user enters a wrong guess.
let Stop = () => {
    stillPlaying = true; //Set to true because, this will cause the while loop never to run again until we refresh the console.
    console.log("\n");
    console.log("Please refresh the console to start again! Good-Luck this time around...");
    console.log("\n");
}

// MY_GAME LOOP
// This loop will repeat itself as long as the user guesses the correct number in each stage.
// If the user just guesses wrongly, the loops ends. The user will have to refresh the console to start again from Stage 1.
// NOTE: For developers only, I have commented out a line not so far from the Beginning of the while-loop. It can show us the
// random number per stage so that we can explore the infinite extents and precision of the source code.

// To See the secret number and test my code up further stages, uncomment line 87.

while (!stillPlaying) {
    // First thing is to save the randomized number per stage in a variable called myMysteriousNumber. This is the value returned from our generator function -> guessMe.
    let myMysteriousNumber = guessMe(rangeLower, rangeUpper);

    // A welcoming message into the Stage 1 Only!
    if (stageCount === 1) {
        console.log("<<< WELCOME TO STAGE 1 >>> \nGuess the secret number at each stage correctly and advance in Stages, else you'll have to start all over!");
        console.log(`You currently have no points`);
        console.log("\n+++*****++++++******++++++*****+++****+++*****++++++******\n");
    }

    // Uncomment the line 87 below so you can see the secretly generated number and track other variables line...Current gameStage and upperBound range value.
    // Comment it again to hide the secret values.
    // console.log(`Current Stage = ${stageCount}, Current UpperBound Range Value  = ${rangeUpper}, and Secret Number = ${myMysteriousNumber}`);

    // Collecting the user guess and storing it in a variable called yourGuess as an Integer in base 10.
    let yourGuess = parseInt(prompt(`What is my mysterious integer within the closed interval ${rangeLower} and ${rangeUpper}? Think carefully >>> `), 10);

    // MY_DECISION CASES...
    // The if block handles the case when the user guesses correctly, and increments corresponding variables stageCount 
    // FOR keeping track of players score and rangeUpper for modifying the extent of the generator function.
    if (yourGuess === myMysteriousNumber) {
        // A Congratulatory message celebrating the user for guessing correctly.
        console.log("\n");
        console.log(`Bravo ${userName}!!! That was an intuitive guess for Stage ${stageCount}! ${myMysteriousNumber} was my "Mysterious Number", and your choice of ${yourGuess} is 100 % correct...Now move on to stage ${stageCount + 1}...`);
        console.log("\n");
        // Incrementing the key variables
        stageCount += 1;
        rangeUpper += 1;
        playerPoint += 1;
        console.log(`<<< WELCOME TO STAGE ${stageCount} >>>`);
        // A message revealing the player's current score! Being Cautious About Singular and Plurals...
        if (playerPoint === 1) {
            console.log(`You currently have ${playerPoint} point.`); //for Singular Score.
        } else {
            console.log(`You currently have ${playerPoint} points.`); //for Plural Score.
        }

        console.log("\n****+++++*****++++++*****++++++\n");
    } else {
        // This block will control the sequence of actions that summarizes the users efforts, shuts down the game should the user fail, and directs the user on how to start all over.
        console.log("\n");
        console.log(`Oops! Wrong Guess ${userName}!!!`);
        console.log(`The correct guess was supposed to be ${myMysteriousNumber}.`);
        console.log(`Your guess of ${yourGuess} didn't match and that means Game Over!!!`);
        console.log(`The Highest Stage you reached is Stage ${stageCount} and your total Score is ${playerPoint}.`);
        Stop(); //This function is called and it has been defined globally. It will help us terminate the loop.
    }

}