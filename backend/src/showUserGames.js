const path = require('path');
const dotenvPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: dotenvPath });
const db = require('./db');

async function displayAllGames() {
    try {
        const games = await db.any('SELECT owned_games FROM users');
        console.log('Your games:');
        games.forEach(game => {
            console.log(game); // Adjust the output format as needed
        });
    } catch (error) {
        console.error('Error fetching games from database:', error);
    }
}

displayAllGames();
