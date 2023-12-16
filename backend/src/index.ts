import http from "node:http";
import express from "express";
import cors from "cors";

import {test} from "./controllers/test";
import {bggAPI} from "./controllers/bggAPI";

const PORT = 5000;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(test);
app.use(bggAPI);

http.createServer(app).listen(PORT, () => {
  console.log(`Server lisening on port ${PORT}`);
});