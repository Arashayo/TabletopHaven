import axios from "axios";
import express, {Request, Response} from "express";
import xml2js from "xml2js";

const bggAPI= express.Router();
const xmlParser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });

bggAPI.get("/search/:query", async (req: Request, res: Response) => {
  try {
    const {query} = req.params;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Invalid query parameter" });
    }

    const apiUrl = `https://boardgamegeek.com/xmlapi2/search?query=${query}`;
    const response = await axios.get(apiUrl);
    xmlParser.parseString(response.data, (err, result) => {
        if (err) {
          console.error("Error parsing XML:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        // Customize the JSON response based on the converted data
        res.status(200).json(result);
      });
  } catch (error) {
    console.error("Error in boardgameController:", error);
    res.status(500).json({error: "Internal server error" });
  }
});

export {bggAPI};