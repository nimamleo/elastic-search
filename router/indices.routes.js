const { createNewIndex, getIndices, removeIndex } = require("../controller/indices.controller");

const indeicesRouters = require("express").Router();

indeicesRouters.post("/create", createNewIndex);
indeicesRouters.get("/list", getIndices);
indeicesRouters.delete("/delete/:indexName", removeIndex);

module.exports = {
    indeicesRouters,
};
