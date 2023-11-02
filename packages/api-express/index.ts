import "dotenv/config";
import express from "express";

import routes from "./routes";
import "./database/db";

const { PORT = 3000 } = process.env;

const app = express();

app.use("/", routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
