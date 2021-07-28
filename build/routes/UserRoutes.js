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
const User_1 = __importDefault(require("../models/User"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                res.json(users);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ _id: req.params.id }).populate("posts", "title content");
                if (!user) {
                    res.send("User Not Found").status(404);
                }
                res.json(user);
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, username } = req.body;
                const newUser = yield new User_1.default({
                    name,
                    email,
                    password,
                    username,
                }).save();
                res.json(newUser);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
                res.send(user);
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.default.findOneAndDelete({ url: req.params.url });
                res.send("User Deleted");
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    routes() {
        this.router.get("/", this.getUsers);
        this.router.get("/:id", this.getUser);
        this.router.post("/", this.createUser);
        this.router.put("/:id", this.updateUser);
        this.router.delete("/:id", this.deleteUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
