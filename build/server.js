"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = "mongodb://localhost/restapits";
        mongoose_1.default.set("useFindAndModify", true);
        mongoose_1.default
            .connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
            .then((db) => {
            console.log("DB is connected");
        });
        // Settings
        this.app.set("port", process.env.PORT || 4000);
        // Middlewares
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use("/api/posts", PostRoutes_1.default);
        this.app.use("/api/users", UserRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
