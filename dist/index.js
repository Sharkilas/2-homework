"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const blogs_routes_1 = require("./routes/blogs-routes");
const posts_routers_1 = require("./routes/posts-routers");
const db_1 = require("./repositories/db");
const app = (0, express_1.default)();
const port = 3003;
app.use((0, body_parser_1.default)());
app.use(express_1.default.json());
app.use('/posts', posts_routers_1.postsRoute);
app.use('/blogs', blogs_routes_1.blogsRoute);
app.get('/', (req, res) => {
    res.send('Доброе утро!!');
});
app.delete('/testing/all-data', (req, res) => {
    db_1.db.posts = [];
    db_1.db.blogs = [];
    res.sendStatus(204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
