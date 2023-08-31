"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const recipes_route_1 = __importDefault(require("./routes/recipes.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
class App {
    constructor() {
        this.appServer = (0, express_1.default)();
        this.appServer.use((0, cors_1.default)());
        this.appServer.use(express_1.default.json());
        this.setRoutes();
    }
    setRoutes() {
        this.appServer.use("/recipies", auth_middleware_1.default, recipes_route_1.default);
        this.appServer.use("/users", user_route_1.default);
    }
    listen(port) {
        this.appServer.listen(port, () => {
            console.log(`server is running ${port}`);
        });
    }
}
exports.default = App;
