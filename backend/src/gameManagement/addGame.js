const { Request, Response } = require('express');
const db = require('../db');

async function addGame(req, res) {
    try {
        const userId = req.params.userId;
        const gameId = req.params.gameId;

        await db.none('UPDATE users SET owned_games = array_append(owned_games, $1) WHERE id = $2', [gameId, userId]);
        res.status(200).json({ success: true, message: 'Game added succesfully' });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: 'Something bad happend' });
    }
}

module.exports = addGame;
