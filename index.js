/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const gameCard = document.createElement('div');
        
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal
        gameCard.innerHTML = `
            <img class="game-img" src="${games[i].img}" alt="${games[i].name}"/>
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p><strong>Pledged:</strong> $${games[i].pledged.toLocaleString()} / $${games[i].goal.toLocaleString()}</p>
        `;

        // Append the game card to the games container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function to add all games to the page
addGamesToPage(GAMES_JSON);


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// Step 1: total number of individual contributions (sum of backers)
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
// display with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card
const raisedCard = document.getElementById("total-raised");
// Step 2: total amount pledged across all games
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
// display with dollar sign and commas
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
// Step 3: total number of games
const totalGames = GAMES_JSON.length;
// display with commas (not strictly necessary here, but for consistency)
gamesCard.innerHTML = totalGames.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // first, clear out any existing cards
    deleteChildElements(gamesContainer);

    // filter for games where pledged < goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    
    // add only those unfunded games back to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    // clear out existing cards
    deleteChildElements(gamesContainer);

    // filter for games where pledged >= goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);


    // add only those funded games back to the DOM
    addGamesToPage(fundedGames);

}

// show all games
function showAllGames() {
    // clear out existing cards
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn   = document.getElementById("funded-btn");
const allBtn      = document.getElementById("all-btn");

unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click',   filterFundedOnly);
allBtn.addEventListener('click',      showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const descriptionContainer = document.getElementById("description-container");

const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

const summaryStr = `
  A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games.
  Currently, ${unfundedCount} ${unfundedCount === 1 ? "game remains" : "games remain"} unfunded.
`;

const summaryEl = document.createElement("p");
summaryEl.innerHTML = summaryStr.trim();
descriptionContainer.appendChild(summaryEl);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Step 1: Use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// Step 2: Displaying the Top Games
// Create a new element for the top funded game
const firstGameEl = document.createElement('p');
firstGameEl.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameEl);

const secondGameEl = document.createElement('p');
secondGameEl.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameEl);