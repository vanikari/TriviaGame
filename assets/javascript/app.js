// Database of all the question and answers
var question_bank = [{
    q: "Which is the world's largest ocean?",
    choices: ["Atlantic", "Pacific", "Antarctic"],
    a: "Pacific",
    name: "largest_ocean"
},
{
    q: "Which is the world's longest river?",
    choices: ["Nile", "Amazon", "Congo"],
    a: "Nile",
    name: "longest_river"
},
{
    q: "What is the capital city of Spain?",
    choices: ["Valencia", "Barcelona", "Madrid"],
    a: "Madrid",
    name: "capital_spain"
},
{
    q: "Which country is Krakow in?",
    choices: ["Czech Republic", "Poland", "Slovenia"],
    a: "Poland",
    name: "country_krakow"
},
{
    q: "What is the diameter of Earth in miles?",
    choices: ["8,000", "15,000", "7,500"],
    a: "8,000",
    name: "diameter_earth"
},
{
    q: "Which African nation has the most pyramids?",
    choices: ["Egypt", "Sudan", "Algeria"],
    a: "Sudan",
    name: "most_pyramids"
},
{
    q: "Which U.S. state has the most active volcanoes?",
    choices: ["Alaska", "Hawaii", "California"],
    a: "Alaska",
    name: "active_volcanoes"
},
{
    q: "Doha is the capital of which Middle-Eastern country?",
    choices: ["Syria", "Yemen", "Qatar"],
    a: "Qatar",
    name: "riyadh_country"
}]

var score = 0;
var question = $("<div>");
var choices = $("<div>");
var scoreDiv = $("<div>");
var i = 0;

// Start Page
function firstPage() {
    
    $("#question-box").empty();
    $(".time").empty();
    
    var start = $("<button>");
    start.addClass('start');
    start.html("<h2>Start</h2>");
    $("#question-box").append(start);
    start.on("click", function() {
        quizMaster(i);
    });
}

firstPage();

function quizMaster(i) {

    // reset the timer for each question
    resetTimer();

    // empty the question box display
    $("#question-box").empty();

    // Formulate the question
    question.html("<h4>" + question_bank[i].q + "</h4>");
    
    // Append the question into the question box
    $("#question-box").append(question);

    // Create a variable for concatinating the "choices" one after the other
    var choices_html_string = '';

    // generate the choices in radio button form
    for (var j = 0; j < question_bank[i].choices.length; j++) {
        var id = "q" + (i + 1) + "c" + (j + 1);
        
        choices_html_string += "<strong> <input type='radio' class='answers' id=" + id + " name= " + question_bank[i].name + " value= " + question_bank[i].choices[j] + ">" + " " + question_bank[i].choices[j] + "</strong> <br>";
    }
  
    // Put the choices in the "choices" div
    choices.html(choices_html_string)

    // Append the "choices" div into the "question-box" id
    $("#question-box").append(choices);

    // Start the timer here once the question and choices are generated
    startTimer();

    // Check for the answer when clicked on any of the radio buttons
    $("input:radio").on("click", function () {

        // stop the timer
        stopTimer();

        // check the answer in the validator function
        validator($(this));

    });

}

// Check if the player's choice is correct and update the score acordingly
function validator(playerChoice) {
    $("#question-box").empty();
    for (var i = 0; i < question_bank.length; i++) {
        if (playerChoice.attr('name') == question_bank[i].name) {
            if (playerChoice.attr('value') == question_bank[i].a) {
                score++;
                scoreDiv.html("<strong>Answer: " + question_bank[i].a + "<br><br>You got the Right Answer!<br><br>Your Score is now " + score + "</strong>");
                $("#question-box").append(scoreDiv);
                setTimeout(nextQuestion, 4000);
            }
            else {
                scoreDiv.html("<strong>Correct Answer: " + question_bank[i].a + "<br><br>Oops, you failed this one!<br><br>Your Score is still " + score + "</strong>");
                $("#question-box").append(scoreDiv);
                setTimeout(nextQuestion, 4000);
            }
        }
    }    
}

// When the player is out of time to answer a question
function timeExpired() {

    $("#question-box").empty();
    scoreDiv.html("<strong>Correct Answer: " + question_bank[i].a + "<br><br>Oops, you Timed out!<br><br>Your Score is still " + score + "</strong>");
    $("#question-box").append(scoreDiv);
    setTimeout(nextQuestion, 4000);

}
  

// Calling the quizMaster function again
function nextQuestion() {
    //increase i by 1 to go to next question
    i++;

    // when all questions are not done
    if (i < question_bank.length) {
        quizMaster(i);
    }

    // when all questions are done
    else {
        $("#question-box").empty();
        $(".time").empty();
        scoreDiv.html("<strong><h2>All Done! Here's how you did.. </h2><br> <h3>You have completed with a score " + score + " out of " + question_bank.length + " </h3></strong>");
        $("#question-box").append(scoreDiv);
        setTimeout(firstPage, 5000);
        
    }
}


 // Time Functions   

var time = 20;
var clockRunning = false;
var intervalId;

// Starting the timer
function startTimer() {

    clearInterval(intervalId); //gets rid of the interval counter

    // start the count here and set the clock to running.
    if (!clockRunning) {

        intervalId = setInterval(decrement, 1000);

        clockRunning = true;
    }

}

// Decreasing the time in the timer
function decrement() {

    time--;

    if (time === 0) {
        stopTimer();

        // Whenthe player has run out of time
        timeExpired();

    }

    $("#time").text(time + " seconds");
}

// Stopping the timer
function stopTimer() {

    //  Using clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);

    clockRunning = false;

}

// Resetting the timer each time
function resetTimer() {

    time = 20;

    //  Change the "time" div to "30 seconds"
    $(".time").html("<h5> Time Remaining: <span id='time'></span> </h5>");
    $("#time").text(time + " seconds");

}





