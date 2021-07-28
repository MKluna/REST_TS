import { Router, Request, Response } from "express";
import Post from "../models/Post";

class PostRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getPosts(req: Request, res: Response) {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.json(error);
    }
  }

  public async getPost(req: Request, res: Response): Promise<void> {
    try {
      const post = await Post.findOne({ url: req.params.url });
      if (!post) {
        res.send("Post Not Found").status(404);
      }
      res.json(post);
    } catch (error) {
      res.send(error);
    }
  }

  public async createPost(req: Request, res: Response) {
    const { title, url, content, image } = req.body;
    const newPost = await new Post({ title, url, content, image }).save();
    res.json(newPost);
    try {
      res.send(req.body);
    } catch (error) {
      res.send(error);
    }
  }

  public async updatePost(req: Request, res: Response) {
    try {
      const post = await Post.findOneAndUpdate(
        { url: req.params.url },
        req.body,
        { new: true }
      );
      res.send(post);
    } catch (error) {
      res.send(error);
    }
  }

  public async deletePost(req: Request, res: Response) {
    try {
      await Post.findOneAndDelete({ url: req.params.url });
      res.send("Post Deleted");
    } catch (error) {
      res.send(error);
    }
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

export default postRoutes.router;
