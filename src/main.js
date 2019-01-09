let seconds_left = 0;

let setupIndex = () => {
  console.log("setting up index");

  let startBtnElement = document.getElementById("startBtn");
  startBtnElement.onclick = () => {
    startGamePage();
  }

  let nextBtnElement = document.getElementById("nextBtn");
  nextBtnElement.onclick = () => {
    getNextQuestion();
  }

  let doneBtnElement = document.getElementById("doneBtn");
  doneBtnElement.onclick = () => {
    showEndScreen();
  }

  let quitBtnElement = document.getElementById("quitBtn");
  quitBtnElement.onclick = () => {
    showEndScreen();
  }

  let replayBtnElement = document.getElementById("replayBtn");
  replayBtnElement.onclick = () => {
    playAgain();
  }
}

setupIndex();

let myHeaders = new Headers({
  "X-Mashape-Key": "sjLOdOjxHBmshgdTvtaNlM9sGb4Gp1OHwKYjsnliev7Y3OabVQ",
  "Authorization": "Token token=yd8WzkWNEEzGtqMSgiZBrwtt",
  "Accept": "text/plain"
});

let myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

fetch('https://juanroldan1989-moviequotes-v1.p.mashape.com/api/v1/quotes', myInit)
  .then(response => response.json())
  .then(results => {
    //let stuff = '';
    console.log(results);
    //data.results.forEach()
    generateContent(results)
  })
  .catch(e => console.log(e));


let startGamePage = () => {
  let introSection = document.getElementById("canvasWrapper");
  introSection.style.display = "none";
  let gameSection = document.getElementById("mainContainer");
  gameSection.style.display = "block";
}

let currentQuestion;
let questionArray = [];
let score = 0;
let outOfNum;
let current = 0;
let skipped = 0;
let generateContent = results => {
  let container = document.getElementById("gameContainer").innerHTML;
  //create divs
  for (let i = 0; i < results.length; i++) {
    console.log(results[i]);

    //create div
    let div = document.createElement("div");
    div.id = `q_${i}`;
    console.log(div.id);

    let heading = document.createElement("h2");
    heading.id = `heading_${i}`;
    div.appendChild(heading);
    console.log(heading.id);

    //add quote
    let quote = document.createElement("p");
    quote.id = `quote_${i}`;
    quote.className = "quotes"
    div.appendChild(quote);

    let hintBtn = document.createElement('button');
    hintBtn.innerHTML = "Need a hint?";
    hintBtn.id = `hintBtn_${i}`;
    hintBtn.className = "hintBtn";
    div.appendChild(hintBtn);

    //add image
    let hintImg = document.createElement("img");
    hintImg.id = `hintImg_${i}`;
    hintImg.src = results[i].image_large_url;
    hintImg.className = "hintImages";
    div.appendChild(hintImg);


    let box = document.createElement('input');
    box.id = `answerbox_${i}`;
    box.className = `answerBoxes_${i}`;
    box.type = "text";
    // box.value = "answerBoxValue_" + i;
    div.appendChild(box);

    let button = document.createElement('button');
    button.innerHTML = "Submit";
    button.id = `answerBtn_${i}`;
    button.className = "qBtn";
    button.className = "hvr-push";
    div.appendChild(button);

    let skipBtn = document.createElement('button');
    skipBtn.innerHTML = "Skip";
    skipBtn.id = `skipBtn_${i}`;
    skipBtn.className = "hintBtn";
    div.appendChild(skipBtn);

    let validation = document.createElement('h3');
    validation.id = `validationFor_${i}`;
    div.appendChild(validation);

    let cheatBtn = document.createElement('button');
    cheatBtn.innerHTML = "Reveal Answer";
    cheatBtn.id = `cheatBtn_${i}`;
    cheatBtn.className = "hintBtn";
    div.appendChild(cheatBtn);

    //answers
    let answerDiv = document.createElement("div");
    answerDiv.id = `answerDiv_${i}`;

    //add answers
    let title = document.createElement("h4");
    title.id = `title_${i}`;
    answerDiv.appendChild(title);

    div.appendChild(answerDiv);
    //

    //more info
    let revealBtn = document.createElement('button');
    revealBtn.innerHTML = "More Info";
    revealBtn.id = `revealBtn_${i}`;
    revealBtn.className = "hintBtn";
    div.appendChild(revealBtn);

    let infoDiv = document.createElement('div');
    infoDiv.id = `infoDiv_${i}`;

    let character = document.createElement("h5");
    character.id = `character_${i}`;
    infoDiv.appendChild(character);

    let actor = document.createElement("h5");
    actor.id = `actor_${i}`;
    infoDiv.appendChild(actor);

    let category = document.createElement("h5");
    category.id = `category_${i}`;
    infoDiv.appendChild(category);

    for (let m = 0; m < results[i].categories.length; m++) {
      console.log(`cat: ${results[i].categories[m]}`);
      let cat = document.createElement("h6");
      cat.id = `catId_q_${i}_${m}`;
      infoDiv.appendChild(cat);
    }

    let year = document.createElement("h5");
    year.id = `year_${i}`;
    infoDiv.appendChild(year);

    let rating = document.createElement("h5");
    rating.id = `rating_${i}`;
    infoDiv.appendChild(rating);

    div.appendChild(infoDiv);
    //
    document.getElementById("gameContainer").appendChild(div);
    questionArray.push(div.id);
  }

  populateContent(results);
  initializeContent();
}

let populateContent = results => {

  document.getElementById(`scoreId`).innerHTML = `Score: ${score}`;

  //fill divs w/ content
  for (let j = 0; j < results.length; j++) {
    document.getElementById(`heading_${j}`).innerHTML = "What movie is this from?";
    document.getElementById(`quote_${j}`).innerHTML = `Quote: "${results[j].content}"`;
    document.getElementById(`hintImg_${j}`).style.display = "none";

    let skipBtnElement = document.getElementById(`skipBtn_${j}`);
    skipBtnElement.onclick = () => {
      skip(j);
    }

    let hintBtnElement = document.getElementById(`hintBtn_${j}`);
    hintBtnElement.onclick = () => {
      displayImage(j);
    }
    hintBtnElement.style.display = "none";

    let cheatBtnElement = document.getElementById(`cheatBtn_${j}`);
    cheatBtnElement.onclick = () => {
      displayAnswers(j);
    }
    cheatBtnElement.style.display = "none";

    let answerDivElement = document.getElementById(`answerDiv_${j}`);
    answerDivElement.style.display = "none";
    document.getElementById(`title_${j}`).innerHTML = `Movie title: ${results[j].movie.title}`;

    let answerBtnElement = document.getElementById(`answerBtn_${j}`);
    answerBtnElement.onclick = () => {
      checkAnswer(j, results);
    }
    document.getElementById(`validationFor_${j}`).style.display = "none";

    let revealBtnElement = document.getElementById(`revealBtn_${j}`);
    revealBtnElement.onclick = () => {
      displayInfo(j);
    }
    revealBtnElement.style.display = "none";
    document.getElementById(`infoDiv_${j}`).style.display = "none";
    document.getElementById(`character_${j}`).innerHTML = `Character: ${results[j].character.name}`;
    document.getElementById(`actor_${j}`).innerHTML = `Actor: ${results[j].actor.name}`;
    document.getElementById(`category_${j}`).innerHTML = "Categories: "
    for (let m = 0; m < results[j].categories.length; m++) {
      console.log(`populating cat for ${results[j].movie.title}: ${results[j].categories[m]}`);
      document.getElementById(`catId_q_${j}_${m}`).innerHTML = results[j].categories[m];
    }
    document.getElementById(`year_${j}`).innerHTML = `Year: ${results[j].year}`;
    document.getElementById(`rating_${j}`).innerHTML = `Rating: ${results[j].rating}/10`;
  }
}

let initializeContent = () => {
  for (var index = 0; index < questionArray.length; index++) {
    currentQuestion = questionArray[0];
    if (questionArray[index] != "q_0") {
      var questionElement = document.getElementById(questionArray[index]);
      questionElement.style.display = "none";
    }
  }
  seconds_left = 45;
}

let checkAnswer = (j, results) => {
  let userAnswer = document.getElementById(`answerbox_${j}`).value;
  console.log(`user answer for question ${j}: ${userAnswer}`);
  let answer = results[j].movie.title;
  console.log(`actual answer for question ${j}: ${results[j].movie.title.toLocaleLowerCase()}`);

  document.getElementById(`answerBtn_${j}`).style.display = "none";

  if (userAnswer.toLocaleLowerCase() == answer.toLocaleLowerCase()) {
    score += 1;
    console.log(score);
    document.getElementById(`scoreId`).innerHTML = `Score: ${score}`;
    document.getElementById(`validationFor_${j}`).innerHTML = "Correct!";
    document.getElementById(`validationFor_${j}`).style.display = "block";
    document.getElementById(`revealBtn_${j}`).style.display = "block";
    document.getElementById(`cheatBtn_${j}`).style.display = "none";
    document.getElementById(`skipBtn_${j}`).style.display = "none";
    //stop timer
    if (current == 18) {
      document.getElementById("doneBtn").style.display = "block";
    }
    else {
      document.getElementById("nextBtn").style.display = "block";
    }
    submitClicked = true;
  }
  else {
    document.getElementById(`validationFor_${j}`).innerHTML = "Incorrect";
    document.getElementById(`validationFor_${j}`).style.display = "block";
    document.getElementById(`revealBtn_${j}`).style.display = "none";
    document.getElementById(`cheatBtn_${j}`).style.display = "none";
    document.getElementById(`skipBtn_${j}`).style.display = "none";
    document.getElementById(`answerbox_${j}`).style.display = "none";
    document.getElementById(`answerDiv_${j}`).style.display = "block";    
    //stop timer
    if (current == 18) {
      document.getElementById("doneBtn").style.display = "block";
    }
    else {
      document.getElementById("nextBtn").style.display = "block";
    }
    submitClicked = true;
  }
}

//skip
let skip = j => {
  skipped += 1;
  document.getElementById(`answerBtn_${j}`).style.display = "none";
  document.getElementById(`answerDiv_${j}`).style.display = "block";
  document.getElementById(`answerbox_${j}`).style.display = "none";
  document.getElementById(`skipBtn_${j}`).style.display = "none";
  if (current == 18) {
    document.getElementById("doneBtn").style.display = "block";
  }
  else {
    document.getElementById("nextBtn").style.display = "block";
  }
  submitClicked = true;
}

//cheat
let displayAnswers = j => {
  let x = document.getElementById(`answerDiv_${j}`);
  let btn = document.getElementById(`cheatBtn_${j}`);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  document.getElementById(`answerbox_${j}`).style.display = "none";
  document.getElementById(`answerBtn_${j}`).style.display = "none";
  submitClicked = true;
}

//hint
let displayImage = j => {
  let x = document.getElementById(`hintImg_${j}`);
  let btn = document.getElementById(`hintBtn_${j}`);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//after submit
let displayInfo = j => {
  console.log(`displaying more info for question: ${j}`)
  let x = document.getElementById(`infoDiv_${j}`);
  let btn = document.getElementById(`revealBtn_${j}`);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

let submitClicked = false;
let interval = setInterval(function () {
  let currentDigitString = currentQuestion.split('_')[1];
  let currentDigitNum = parseInt(currentDigitString, 10);

  if (seconds_left > 0 && submitClicked != true) {
    document.getElementById("timer").innerHTML = `Time left: ${--seconds_left} sec`;
  }
  if (seconds_left <= 30) {
    document.getElementById(`hintBtn_${currentDigitNum}`).style.display = "block";
    //console.log("displaying hint");
  }
  if (seconds_left <= 10) {
    document.getElementById(`cheatBtn_${currentDigitNum}`).style.display = "block";
    //console.log("displaying cheat");
  }

  if (seconds_left <= 0 && current != 18) {
    document.getElementById("timer").innerHTML = "Time is Up!";
    document.getElementById(`answerDiv_${currentDigitNum}`).style.display = "block";
    document.getElementById(`revealBtn_${currentDigitNum}`).style.display = "block";
    document.getElementById(`answerBtn_${currentDigitNum}`).style.display = "none";
    document.getElementById(`answerbox_${currentDigitNum}`).style.display = "none";
    document.getElementById(`skipBtn_${currentDigitNum}`).style.display = "none";
    document.getElementById(`cheatBtn_${currentDigitNum}`).style.display = "none";
    document.getElementById(`hintBtn_${currentDigitNum}`).style.display = "none";    
    document.getElementById("nextBtn").style.display = "block";
  }
  //on last question
  if (seconds_left <= 0 && current == 18) {
    document.getElementById("timer").innerHTML = "Time is Up!";
    document.getElementById(`answerDiv_${currentDigitNum}`).style.display = "block";
    document.getElementById(`revealBtn_${currentDigitNum}`).style.display = "block";
    document.getElementById(`answerBtn_${currentDigitNum}`).style.display = "none";
    document.getElementById(`answerbox_${currentDigitNum}`).style.display = "none";
    document.getElementById(`skipBtn_${currentDigitNum}`).style.display = "none";
    document.getElementById(`cheatBtn_${currentDigitNum}`).style.display = "none";
    document.getElementById(`hintBtn_${currentDigitNum}`).style.display = "none";    
    document.getElementById(`doneBtn`).style.display = "block";
  }
}, 1000);


let getNextQuestion = () => {
  //console.log("in next question");
  submitClicked = false;
  seconds_left = 45;
  let nextButton = document.getElementById("nextBtn");
  nextButton.style.display = "none";
  let currentDigitString = currentQuestion.split('_')[1];
  let currentDigitNum = parseInt(currentDigitString, 10);
  let lastQDigit = parseInt((questionArray.length - 1), 10);

  if (currentDigitNum < lastQDigit) {
    let previousQuestion = document.getElementById("q_" + (currentDigitNum));
    previousQuestion.style.display = "none";

    if (currentDigitNum < lastQDigit) {
      let nextQuestion = document.getElementById("q_" + (currentDigitNum + 1));
      nextQuestion.style.display = "block";
      currentQuestion = "q_" + (currentDigitNum + 1);
      current++;
    }
    current = currentDigitNum;
    console.log(`current: ${current}`);
  }
  else {
    //console.log("in last num else");
    if (currentDigitNum == lastQDigit) {
      //console.log("in last num if");
      current++;
    }
  }
}

let showEndScreen = () => {
  //console.log("in show end screen");

  let gameDiv = document.getElementById("mainContainer");
  gameDiv.style.display = "none";

  document.getElementById("welcomeContainer").style.display = "none";
  document.getElementById("canvasWrapper").style.display = "block";
  document.getElementById("endGame").style.display = "block";

  console.log(`Your score: ${score}/20`);
  let numerator = score * 100;
  let denominator = 20 * 100;
  let percentage = (numerator / denominator) * 100;
  console.log(`Your score as percent: ${percentage}%`);

  document.getElementById("scoreHeading").innerHTML = `Your score: ${score}/20, ${percentage}%`;
  document.getElementById("skippedHeading").innerHTML = `You skipped ${skipped} questions`;

}

let playAgain = () => {
  window.location.reload();
}