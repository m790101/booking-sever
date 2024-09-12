import express, { Request, Response } from "express";
import dotenv from "dotenv";

const {router} = require("./controllers/routes/room");
const { Sequelize } = require('sequelize');

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;


// Export sequelize



// try {
//   sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }



app.get("/", (req:Request, res:Response) => { 
  res.status(200).send("Hello World");
}); 

app.use(router);

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
})