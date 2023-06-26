const { blogRouters } = require("./blog.routes");
const { indeicesRouters } = require("./indices.routes");

const AllRouters = require("express").Router();

AllRouters.get("/", (req, res) => {
    return res.render("pages/index.ejs" , {
        message:"hi express"
    });
});

AllRouters.use("/index" , indeicesRouters)
AllRouters.use("/blog" , blogRouters)

module.exports = {
    AllRouters,
};
