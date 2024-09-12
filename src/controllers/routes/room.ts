import roomController from "../roomController";

const { Router } = require("express");

const router = new Router();

router.get("/api/v1/room", roomController)


module.exports = { router };