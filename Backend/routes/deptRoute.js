const express = require("express");
const { DeptFetch, getDepartments } = require("../controllers/DeptController");

const deptRouter = express.Router();

deptRouter.get("/", getDepartments);
deptRouter.get("/:id", DeptFetch);

module.exports = deptRouter;
