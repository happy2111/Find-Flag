const countriesData = [
  { name: "Afghanistan", flag: "images/afghanistan-flag.jpg" },
  { name: "Argentina", flag: "images/argentina-flag.jpg" },
  { name: "Australia", flag: "images/australia-flag.jpg" },
  { name: "Brazil", flag: "images/brazil-flag.jpg" },
  { name: "Canada", flag: "images/canada-flag.jpg" },
  { name: "China", flag: "images/china-flag.jpg" },
  { name: "Egypt", flag: "images/egypt-flag.jpg" },
  { name: "France", flag: "images/france-flag.jpg" },
  { name: "India", flag: "images/india-flag.jpg" },
  { name: "Indonesia", flag: "images/indonesia-flag.jpg" },
  { name: "Italy", flag: "images/italy-flag.jpg" },
  { name: "Mexico", flag: "images/mexico-flag.jpg" },
  { name: "Netherlands", flag: "images/netherlands-flag.jpg" },
  { name: "Nigeria", flag: "images/nigeria-flag.jpg" },
  { name: "Saudi Arabia", flag: "images/saudi-arabia-flag.jpg" },
  { name: "South Africa", flag: "images/south-africa-flag.jpg" },
  { name: "South Korea", flag: "images/south-korea-flag.jpg" },
  { name: "Spain", flag: "images/spain-flag.jpg" },
  { name: "Thailand", flag: "images/thailand-flag.jpg" },
  { name: "Turkey", flag: "images/turkey-flag.jpg" },
  { name: "United Kingdom", flag: "images/united-kingdom-flag.jpg" },
  { name: "United States", flag: "images/united-states-flag.jpg" },
  { name: "Uzbekistan", flag: "images/uzbekistan-flag.jpg" },
];

const randomPosition = (v) => Math.floor(Math.random() * v);

const threeRandom = (correctIndex) => {
  let wrongAnswers = countriesData.filter((_, index) => index !== correctIndex);
  let l = [];
  for (let i = 0; i < 3; i++) {
    let randomInx;
    do {
      randomInx = randomPosition(wrongAnswers.length);
    } while (randomInx === correctIndex || l.includes(randomInx));
    l.push(randomInx);
  }

  let emptyIndex = countriesData.findIndex((e) => e === undefined);
  if (emptyIndex !== -1) {
    l[emptyIndex] = correctIndex;
  } else {
    l.splice(randomPosition(4), 0, correctIndex);
  }
  return l;
};

// -------DOM -----------
let blockImg = document.querySelector(".block__mid");
let blockOptions = document.querySelector(".block__options");
const checkAnswer = (correctName, clickedName) =>
  correctName === clickedName ? true : false;
let score = 0;

const dom = () => {
  const correctIndex = randomPosition(countriesData.length); // to'gri jabob index
  const correctCountry = countriesData[correctIndex]; // to'g'ri javob object
  const option = threeRandom(correctIndex); // 3 random varian va 1 to'g'ri
  let nextBtn = document.querySelector(".next");
  blockImg.innerHTML = `
          <div class="block__img">
            <img src="${correctCountry.flag}" alt="${correctCountry.name}" /> 
          </div>
  `;
  blockOptions.innerHTML = "";

  // creating options
  option.forEach((index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("option__btn");
    btn.textContent = countriesData[index].name;
    blockOptions.appendChild(btn);
  });

  // coloring && after clicked
  const buttons = document.querySelectorAll(".option__btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function handleClick(e) {
      const isCorrect = checkAnswer(e.target.textContent, correctCountry.name);
      e.target.style.background = isCorrect ? "green" : "red";
      score += isCorrect ? 1 : 0; // scrore

      buttons.forEach((button) => {
        button.disabled = true;
      });
      nextBtn.classList.add("active");
    });
  });

  nextBtn.addEventListener("click", () => {
    nextBtn.classList.remove("active");
  });
};

let finish = document.querySelector(".block__top__inp");
let finishCounter = -1;
let form = document.querySelector("form");
let start = document.querySelector(".start");
let block = document.querySelector(".block");
start.addEventListener("click", () => {
  block.classList.add("active");
});

function afterFinish() {
  let blockScore = document.querySelector("#block__score");
  let spanCorrect = document.querySelector(".correct");
  let spanTotal = document.querySelector(".total");
  block.classList.add("hidden");
  spanCorrect.textContent = `${score}`;
  spanTotal.textContent = `${finish.value}`;
  blockScore.classList.add("active");
}
function playAgain() {
  let blockScore = document.querySelector("#block__score");
  block.classList.remove("hidden")
  block.classList.remove("active")
  blockScore.classList.remove("active");
}

document.querySelector(".play-again").addEventListener("click", () => {playAgain()})


form.addEventListener("submit", (e) => {
  finishCounter += 1;
  e.preventDefault();
  const img = blockImg.querySelector("div");
  if (img) blockImg.removeChild(img);

  blockOptions.innerHTML = "";
  if (Number(finish.value) == finishCounter) {
    afterFinish()
    score = 0
    finishCounter = -1;
    finish.value = "";
    form.reset();
  } else {
    dom();
  }
});
