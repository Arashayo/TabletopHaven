import { Request, Response } from 'express';
const db = require('../db');

async function addGame(req: Request, res: Response): Promise<void> {

    try {
        const userId = req.params.userId;
        const gameId = req.params.gameId;

        await db.none('UPDATE users SET owned_games = array_append(owned_games, $1) WHERE id = $2', [gameId, userId]);
        res.status(200).json({ success: true, message: 'Game added to owned_games successfully' });
    }
    catch(error){
        console.log("dupa")
    }
}

export { addGame };
