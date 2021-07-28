import { Router, Request, Response } from "express";
import User from "../models/User";

class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  }

  public async getUser(req: Request, res: Response) {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate(
        "posts",
        "title content"
      );
      if (!user) {
        res.send("User Not Found").status(404);
      }
      res.json(user);
    } catch (error) {
      res.send(error);
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, username } = req.body;
      const newUser = await new User({
        name,
        email,
        password,
        username,
      }).save();
      res.json(newUser);
    } catch (error) {
      res.json(error);
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      await User.findOneAndDelete({ url: req.params.url });
      res.send("User Deleted");
    } catch (error) {
      res.send(error);
    }
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

export default userRoutes.router;
