let input = document.querySelector("#input-field");
let nameAscending = document.querySelector("#name-ascending");
let nameDescending = document.querySelector("#name-descending");
let priceAscending = document.querySelector("#price-ascending");
let priceDescending = document.querySelector("#price-descending");
let genreFilters = document.querySelectorAll(".filter");
let resetBtn = document.querySelector("#reset-btn");
let gamesWrapper = document.querySelector("#games-wrapper");
let gameDiv = document.querySelectorAll(".game-div");

const search = () => {
  let inputValue = input.value.toLowerCase();
  for (let i = 0; i < gameDiv.length; i++) {
    let gameNames = gameDiv[i].querySelectorAll(".game-name")[0];
    let originalValue =
      gameNames.innerText.toLowerCase().indexOf(inputValue) > -1;
    let altValue =
      gameNames.innerText
        .toLowerCase()
        .replace(/[\.:']/gi, "")
        .indexOf(inputValue) > -1;
    originalValue || altValue
      ? (gameDiv[i].style.display = "")
      : (gameDiv[i].style.display = "none");
  }
};
input.addEventListener("keyup", search);

const nameAZ = () => {
  Array.from(gamesWrapper.children)
    .sort((a, b) => {
      return a.textContent.localeCompare(b.textContent);
    })
    .forEach((game) => gamesWrapper.append(game));
};
nameAscending.addEventListener("click", nameAZ);

const nameZA = () => {
  Array.from(gamesWrapper.children)
    .sort((a, b) => {
      return b.textContent.localeCompare(a.textContent);
    })
    .forEach((game) => gamesWrapper.append(game));
};
nameDescending.addEventListener("click", nameZA);

const price = (e) =>
  Number(e.querySelector(".price").textContent.replace(/\€/g, ""));

const lowToHigh = () => {
  Array.from(gamesWrapper.children)
    .sort((a, b) => {
      return price(a) - price(b);
    })
    .forEach((game) => gamesWrapper.append(game));
};
priceAscending.addEventListener("click", lowToHigh);

const highToLow = () => {
  Array.from(gamesWrapper.children)
    .sort((a, b) => {
      return price(b) - price(a);
    })
    .forEach((game) => gamesWrapper.append(game));
};
priceDescending.addEventListener("click", highToLow);

const switchGenres = (e) => {
  let target = e.target.dataset.genre;
  gameDiv.forEach((game) => {
    game.classList.contains(target)
      ? (game.style.display = "")
      : (game.style.display = "none");
  });
};

genreFilters.forEach((filter) => {
  filter.addEventListener("click", switchGenres);
});

resetBtn.addEventListener("click", () => window.location.reload());
