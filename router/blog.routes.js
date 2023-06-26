const {
    createNewBlog,
    getAllBlogs,
    removeBlog,
    updateBlog,
    updateBlog2,
    searchByTitle,
    searchByMultiFiled,
    searchByRegex,
    searchMultiFieldsByRegex,
} = require("../controller/blog.controller");

const blogRouters = require("express").Router();

blogRouters.post("/create", createNewBlog);
blogRouters.get("/list/:value?", getAllBlogs);
blogRouters.delete("/delete/:id", removeBlog);
blogRouters.put("/update/:id", updateBlog);
blogRouters.put("/update2/:id", updateBlog2);
blogRouters.get("/findByTitle", searchByTitle);
blogRouters.get("/multi-fields", searchByMultiFiled);
blogRouters.get("/regexp-search", searchByRegex);
blogRouters.get("/regexp-search-multi", searchMultiFieldsByRegex);

module.exports = {
    blogRouters,
};
