/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var seconds_left = 0;

var setupIndex = function setupIndex() {
  console.log("setting up index");

  var startBtnElement = document.getElementById("startBtn");
  startBtnElement.onclick = function () {
    startGamePage();
  };

  var nextBtnElement = document.getElementById("nextBtn");
  nextBtnElement.onclick = function () {
    getNextQuestion();
  };

  var doneBtnElement = document.getElementById("doneBtn");
  doneBtnElement.onclick = function () {
    showEndScreen();
  };

  var quitBtnElement = document.getElementById("quitBtn");
  quitBtnElement.onclick = function () {
    showEndScreen();
  };

  var replayBtnElement = document.getElementById("replayBtn");
  replayBtnElement.onclick = function () {
    playAgain();
  };
};

setupIndex();

var myHeaders = new Headers({
  "X-Mashape-Key": "sjLOdOjxHBmshgdTvtaNlM9sGb4Gp1OHwKYjsnliev7Y3OabVQ",
  "Authorization": "Token token=yd8WzkWNEEzGtqMSgiZBrwtt",
  "Accept": "text/plain"
});

var myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

fetch('https://juanroldan1989-moviequotes-v1.p.mashape.com/api/v1/quotes', myInit).then(function (response) {
  return response.json();
}).then(function (results) {
  //let stuff = '';
  console.log(results);
  //data.results.forEach()
  generateContent(results);
}).catch(function (e) {
  return console.log(e);
});

var startGamePage = function startGamePage() {
  var introSection = document.getElementById("canvasWrapper");
  introSection.style.display = "none";
  var gameSection = document.getElementById("mainContainer");
  gameSection.style.display = "block";
};

//will global work??
var currentQuestion = void 0;
var questionArray = [];
var score = 0;
var outOfNum = void 0;
var current = 0;
var skipped = 0;
var generateContent = function generateContent(results) {
  var container = document.getElementById("gameContainer").innerHTML;
  //create divs
  for (var i = 0; i < results.length; i++) {
    console.log(results[i]);

    //create div
    var div = document.createElement("div");
    div.id = "q_" + i;
    console.log(div.id);

    var heading = document.createElement("h2");
    heading.id = "heading_" + i;
    div.appendChild(heading);
    console.log(heading.id);

    //add quote
    var quote = document.createElement("p");
    quote.id = "quote_" + i;
    quote.className = "quotes";
    div.appendChild(quote);

    var hintBtn = document.createElement('button');
    hintBtn.innerHTML = "Need a hint?";
    hintBtn.id = "hintBtn_" + i;
    hintBtn.className = "hintBtn";
    div.appendChild(hintBtn);

    //add image
    var hintImg = document.createElement("img");
    hintImg.id = "hintImg_" + i;
    hintImg.src = results[i].image_large_url;
    hintImg.className = "hintImages";
    div.appendChild(hintImg);

    var box = document.createElement('input');
    box.id = "answerbox_" + i;
    box.className = "answerBoxes_" + i;
    box.type = "text";
    // box.value = "answerBoxValue_" + i;
    div.appendChild(box);

    var button = document.createElement('button');
    button.innerHTML = "Submit";
    button.id = "answerBtn_" + i;
    button.className = "qBtn";
    button.className = "hvr-push";
    div.appendChild(button);

    var skipBtn = document.createElement('button');
    skipBtn.innerHTML = "Skip";
    skipBtn.id = "skipBtn_" + i;
    skipBtn.className = "hintBtn";
    div.appendChild(skipBtn);

    var validation = document.createElement('h3');
    validation.id = "validationFor_" + i;
    div.appendChild(validation);

    var cheatBtn = document.createElement('button');
    cheatBtn.innerHTML = "Reveal Answer";
    cheatBtn.id = "cheatBtn_" + i;
    cheatBtn.className = "hintBtn";
    div.appendChild(cheatBtn);

    //answers
    var answerDiv = document.createElement("div");
    answerDiv.id = "answerDiv_" + i;

    //add answers
    var title = document.createElement("h4");
    title.id = "title_" + i;
    answerDiv.appendChild(title);

    div.appendChild(answerDiv);
    //

    //more info
    var revealBtn = document.createElement('button');
    revealBtn.innerHTML = "More Info";
    revealBtn.id = "revealBtn_" + i;
    revealBtn.className = "hintBtn";
    div.appendChild(revealBtn);

    var infoDiv = document.createElement('div');
    infoDiv.id = "infoDiv_" + i;

    var character = document.createElement("h5");
    character.id = "character_" + i;
    infoDiv.appendChild(character);

    var actor = document.createElement("h5");
    actor.id = "actor_" + i;
    infoDiv.appendChild(actor);

    var category = document.createElement("h5");
    category.id = "category_" + i;
    infoDiv.appendChild(category);

    for (var m = 0; m < results[i].categories.length; m++) {
      console.log("cat: " + results[i].categories[m]);
      var cat = document.createElement("h6");
      cat.id = "catId_q_" + i + "_" + m;
      infoDiv.appendChild(cat);
    }

    var year = document.createElement("h5");
    year.id = "year_" + i;
    infoDiv.appendChild(year);

    var rating = document.createElement("h5");
    rating.id = "rating_" + i;
    infoDiv.appendChild(rating);

    div.appendChild(infoDiv);
    //
    document.getElementById("gameContainer").appendChild(div);
    questionArray.push(div.id);
  }

  populateContent(results);
  initializeContent();
};

var populateContent = function populateContent(results) {

  document.getElementById("scoreId").innerHTML = "Score: " + score;

  //fill divs w/ content

  var _loop = function _loop(j) {
    document.getElementById("heading_" + j).innerHTML = "What movie is this from?";
    document.getElementById("quote_" + j).innerHTML = "Quote: \"" + results[j].content + "\"";
    document.getElementById("hintImg_" + j).style.display = "none";

    var skipBtnElement = document.getElementById("skipBtn_" + j);
    skipBtnElement.onclick = function () {
      skip(j);
    };

    var hintBtnElement = document.getElementById("hintBtn_" + j);
    hintBtnElement.onclick = function () {
      displayImage(j);
    };
    hintBtnElement.style.display = "none";

    var cheatBtnElement = document.getElementById("cheatBtn_" + j);
    cheatBtnElement.onclick = function () {
      displayAnswers(j);
    };
    cheatBtnElement.style.display = "none";

    var answerDivElement = document.getElementById("answerDiv_" + j);
    answerDivElement.style.display = "none";
    document.getElementById("title_" + j).innerHTML = "Movie title: " + results[j].movie.title;

    var answerBtnElement = document.getElementById("answerBtn_" + j);
    answerBtnElement.onclick = function () {
      checkAnswer(j, results);
    };
    document.getElementById("validationFor_" + j).style.display = "none";

    var revealBtnElement = document.getElementById("revealBtn_" + j);
    revealBtnElement.onclick = function () {
      displayInfo(j);
    };
    revealBtnElement.style.display = "none";
    document.getElementById("infoDiv_" + j).style.display = "none";
    document.getElementById("character_" + j).innerHTML = "Character: " + results[j].character.name;
    document.getElementById("actor_" + j).innerHTML = "Actor: " + results[j].actor.name;
    document.getElementById("category_" + j).innerHTML = "Categories: ";
    for (var m = 0; m < results[j].categories.length; m++) {
      console.log("populating cat for " + results[j].movie.title + ": " + results[j].categories[m]);
      document.getElementById("catId_q_" + j + "_" + m).innerHTML = results[j].categories[m];
    }
    document.getElementById("year_" + j).innerHTML = "Year: " + results[j].year;
    document.getElementById("rating_" + j).innerHTML = "Rating: " + results[j].rating + "/10";
  };

  for (var j = 0; j < results.length; j++) {
    _loop(j);
  }
};

var initializeContent = function initializeContent() {
  for (var index = 0; index < questionArray.length; index++) {
    currentQuestion = questionArray[0];
    if (questionArray[index] != "q_0") {
      var questionElement = document.getElementById(questionArray[index]);
      questionElement.style.display = "none";
    }
  }
  seconds_left = 45;
};

var checkAnswer = function checkAnswer(j, results) {
  var userAnswer = document.getElementById("answerbox_" + j).value;
  console.log("user answer for question " + j + ": " + userAnswer);
  var answer = results[j].movie.title;
  console.log("actual answer for question " + j + ": " + results[j].movie.title.toLocaleLowerCase());

  document.getElementById("answerBtn_" + j).style.display = "none";

  if (userAnswer.toLocaleLowerCase() == answer.toLocaleLowerCase()) {
    score += 1;
    console.log(score);
    document.getElementById("scoreId").innerHTML = "Score: " + score;
    document.getElementById("validationFor_" + j).innerHTML = "Correct!";
    document.getElementById("validationFor_" + j).style.display = "block";
    document.getElementById("revealBtn_" + j).style.display = "block";
    document.getElementById("cheatBtn_" + j).style.display = "none";
    document.getElementById("skipBtn_" + j).style.display = "none";
    //stop timer
    if (current == 18) {
      document.getElementById("doneBtn").style.display = "block";
    } else {
      document.getElementById("nextBtn").style.display = "block";
    }
    submitClicked = true;
  } else {
    document.getElementById("validationFor_" + j).innerHTML = "Incorrect";
    document.getElementById("validationFor_" + j).style.display = "block";
    document.getElementById("revealBtn_" + j).style.display = "none";
    document.getElementById("cheatBtn_" + j).style.display = "none";
    document.getElementById("skipBtn_" + j).style.display = "none";
    document.getElementById("answerbox_" + j).style.display = "none";
    document.getElementById("answerDiv_" + j).style.display = "block";
    //stop timer
    if (current == 18) {
      document.getElementById("doneBtn").style.display = "block";
    } else {
      document.getElementById("nextBtn").style.display = "block";
    }
    submitClicked = true;
  }
};

//skip
var skip = function skip(j) {
  skipped += 1;
  document.getElementById("answerBtn_" + j).style.display = "none";
  document.getElementById("answerDiv_" + j).style.display = "block";
  document.getElementById("answerbox_" + j).style.display = "none";
  document.getElementById("skipBtn_" + j).style.display = "none";
  if (current == 18) {
    document.getElementById("doneBtn").style.display = "block";
  } else {
    document.getElementById("nextBtn").style.display = "block";
  }
  submitClicked = true;
};

//cheat
var displayAnswers = function displayAnswers(j) {
  var x = document.getElementById("answerDiv_" + j);
  var btn = document.getElementById("cheatBtn_" + j);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  document.getElementById("answerbox_" + j).style.display = "none";
  document.getElementById("answerBtn_" + j).style.display = "none";
  submitClicked = true;
};

//hint
var displayImage = function displayImage(j) {
  var x = document.getElementById("hintImg_" + j);
  var btn = document.getElementById("hintBtn_" + j);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};

//after submit
var displayInfo = function displayInfo(j) {
  console.log("displaying more info for question: " + j);
  var x = document.getElementById("infoDiv_" + j);
  var btn = document.getElementById("revealBtn_" + j);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};

var submitClicked = false;
var interval = setInterval(function () {
  var currentDigitString = currentQuestion.split('_')[1];
  var currentDigitNum = parseInt(currentDigitString, 10);

  if (seconds_left > 0 && submitClicked != true) {
    document.getElementById("timer").innerHTML = "Time left: " + --seconds_left + " sec";
  }
  if (seconds_left <= 30) {
    document.getElementById("hintBtn_" + currentDigitNum).style.display = "block";
    //console.log("displaying hint");
  }
  if (seconds_left <= 10) {
    document.getElementById("cheatBtn_" + currentDigitNum).style.display = "block";
    //console.log("displaying cheat");
  }

  if (seconds_left <= 0 && current != 18) {
    document.getElementById("timer").innerHTML = "Time is Up!";
    document.getElementById("answerDiv_" + currentDigitNum).style.display = "block";
    document.getElementById("revealBtn_" + currentDigitNum).style.display = "block";
    document.getElementById("answerBtn_" + currentDigitNum).style.display = "none";
    document.getElementById("answerbox_" + currentDigitNum).style.display = "none";
    document.getElementById("skipBtn_" + currentDigitNum).style.display = "none";
    document.getElementById("cheatBtn_" + currentDigitNum).style.display = "none";
    document.getElementById("hintBtn_" + currentDigitNum).style.display = "none";
    document.getElementById("nextBtn").style.display = "block";
  }
  //on last question
  if (seconds_left <= 0 && current == 18) {
    document.getElementById("timer").innerHTML = "Time is Up!";
    document.getElementById("answerDiv_" + currentDigitNum).style.display = "block";
    document.getElementById("revealBtn_" + currentDigitNum).style.display = "block";
    document.getElementById("answerBtn_" + currentDigitNum).style.display = "none";
    document.getElementById("answerbox_" + currentDigitNum).style.display = "none";
    document.getElementById("skipBtn_" + currentDigitNum).style.display = "none";
    document.getElementById("cheatBtn_" + currentDigitNum).style.display = "none";
    document.getElementById("hintBtn_" + currentDigitNum).style.display = "none";
    document.getElementById("doneBtn").style.display = "block";
  }
}, 1000);

var getNextQuestion = function getNextQuestion() {
  //console.log("in next question");
  submitClicked = false;
  seconds_left = 45;
  var nextButton = document.getElementById("nextBtn");
  nextButton.style.display = "none";
  var currentDigitString = currentQuestion.split('_')[1];
  var currentDigitNum = parseInt(currentDigitString, 10);
  var lastQDigit = parseInt(questionArray.length - 1, 10);

  if (currentDigitNum < lastQDigit) {
    var previousQuestion = document.getElementById("q_" + currentDigitNum);
    previousQuestion.style.display = "none";

    if (currentDigitNum < lastQDigit) {
      var nextQuestion = document.getElementById("q_" + (currentDigitNum + 1));
      nextQuestion.style.display = "block";
      currentQuestion = "q_" + (currentDigitNum + 1);
      current++;
    }
    current = currentDigitNum;
    console.log("current: " + current);
  } else {
    //console.log("in last num else");
    if (currentDigitNum == lastQDigit) {
      //console.log("in last num if");
      current++;
    }
  }
};

var showEndScreen = function showEndScreen() {
  //console.log("in show end screen");

  var gameDiv = document.getElementById("mainContainer");
  gameDiv.style.display = "none";

  document.getElementById("welcomeContainer").style.display = "none";
  document.getElementById("canvasWrapper").style.display = "block";
  document.getElementById("endGame").style.display = "block";

  console.log("Your score: " + score + "/20");
  var numerator = score * 100;
  var denominator = 20 * 100;
  var percentage = numerator / denominator * 100;
  console.log("Your score as percent: " + percentage + "%");

  document.getElementById("scoreHeading").innerHTML = "Your score: " + score + "/20, " + percentage + "%";
  document.getElementById("skippedHeading").innerHTML = "You skipped " + skipped + " questions";
};

var playAgain = function playAgain() {
  window.location.reload();
};

/***/ })
/******/ ]);