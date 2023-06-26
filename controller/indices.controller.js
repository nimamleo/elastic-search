const createHttpError = require("http-errors");
const { elasticClient } = require("../config/elastic.config");

async function createNewIndex(req, res, next) {
    try {
        const { indexName } = req.body;
        if (!indexName)
            throw createHttpError.BadRequest("invalid value of index name ");
        const result = await elasticClient.indices.create({ index: indexName });
        console.log(result);
        return res.json({
            result,
            message: "index created!!ß",
        });
    } catch (error) {
        next(error);
    }
}
async function removeIndex(req, res, next) {
    try {
        const { indexName } = req.params;
        const removeResult = await elasticClient.indices.delete({
            index: indexName,
        });
        return res.json(removeResult);
    } catch (err) {
        next(err);
    }
}
async function getIndices(req, res, next) {
    try {
        const indices = await elasticClient.indices.getAlias();
        return res.json({
            indices,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    removeIndex,
    createNewIndex,
    getIndices,
};
