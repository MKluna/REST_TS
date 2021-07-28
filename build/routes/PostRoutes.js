"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = __importDefault(require("../models/Post"));
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield Post_1.default.find();
                res.json(posts);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield Post_1.default.findOne({ url: req.params.url });
                if (!post) {
                    res.send("Post Not Found").status(404);
                }
                res.json(post);
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, content, image } = req.body;
            const newPost = yield new Post_1.default({ title, url, content, image }).save();
            res.json(newPost);
            try {
                res.send(req.body);
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield Post_1.default.findOneAndUpdate({ url: req.params.url }, req.body, { new: true });
                res.send(post);
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Post_1.default.findOneAndDelete({ url: req.params.url });
                res.send("Post Deleted");
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    routes() {
        this.router.get("/", this.getPosts);
        this.router.get("/:url", this.getPost);
        this.router.post("/", this.createPost);
        this.router.put("/:url", this.updatePost);
        this.router.delete("/:url", this.deletePost);
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
