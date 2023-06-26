const { elasticClient } = require("../config/elastic.config");

const indexBlog = "blog";

async function getAllBlogs(req, res, next) {
    try {
        const value = req.params.value;
        const blogs = await elasticClient.search({
            index: indexBlog,
            q: value,
        });
        return res.json(blogs);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
async function createNewBlog(req, res, next) {
    try {
        const { title, author, text } = req.body;
        const createdResult = await elasticClient.index({
            index: indexBlog,
            document: {
                title,
                text,
                author,
            },
        });
        return res.json(createdResult);
    } catch (error) {
        next(error);
    }
}
async function removeBlog(req, res, next) {
    try {
        const { id } = req.params;
        const deletedResult = await elasticClient.deleteByQuery({
            index: indexBlog,
            query: {
                match: {
                    _id: id,
                },
            },
        });
        return res.json(deletedResult);
    } catch (error) {
        next(error);
    }
}
async function updateBlog(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        Object.keys(data).forEach((key) => {
            if (!data[key]) delete data[key];
        });
        const blog = (
            await elasticClient.search({
                index: indexBlog,
                query: { match: { _id: id } },
            })
        ).hits.hits[0];
        const payload = blog?._source || {};
        const updateResult = await elasticClient.index({
            index: indexBlog,
            id,
            body: { ...payload, ...data },
        });
        return res.json(updateResult);
    } catch (error) {
        next(error);
    }
}
async function updateBlog2(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        Object.keys(data).forEach((key) => {
            if (!data[key]) delete data[key];
        });
        const updateResult = await elasticClient.update({
            index: indexBlog,
            id,
            doc: data,
        });
        return res.json(updateResult);
    } catch (error) {
        next(error);
    }
}
async function searchByTitle(req, res, next) {
    try {
        const { title } = req.query;
        const blog = await elasticClient.search({
            index: indexBlog,
            query: { match: { title } },
        });
        res.json(blog);
    } catch (err) {
        next(err);
    }
}
async function searchByMultiFiled(req, res, next) {
    try {
        const { search } = req.query;
        const result = await elasticClient.search({
            index: indexBlog,
            query: {
                multi_match: { query: search, fields: ["title", "text"] },
            },
        });
        const blogs = result.hits.hits;
        return res.json(blogs);
    } catch (err) {
        next(err);
    }
}
async function searchByRegex(req, res, next) {
    try {
        const { search } = req.query;
        const result = await elasticClient.search({
            index: indexBlog,
            query: { regexp: { title: `.*${search}.*` } },
        });
        return res.json(result.hits.hits);
    } catch (err) {
        next(err);
    }
}
async function searchMultiFieldsByRegex(req, res, next) {
    try {
        const { search } = req.query;
        const result = await elasticClient.search({
            index: indexBlog,
            query: {
                bool: {
                    should: [
                        {
                            regexp: { title: `.*.${search}*` },
                        },
                        {
                            text: `.*.${search}*`,
                        },
                        {
                            author: `.*.${search}*`,
                        },
                    ],
                },
            },
        });
        return res.json(result.hits.hits);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createNewBlog,
    getAllBlogs,
    removeBlog,
    updateBlog,
    updateBlog2,
    searchByMultiFiled,
    searchByRegex,
    searchByTitle,
    searchMultiFieldsByRegex,
};
