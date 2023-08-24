import express from "express";
import recipeRouter from "./routes/recipes.route";
import userRouter from "./routes/user.route";
import authMiddleware from "./middleware/auth.middleware";

class App {
  appServer;
  constructor() {
    this.appServer = express();
    this.appServer.use(express.json());

    this.setRoutes();
  }

  setRoutes() {
    this.appServer.use("/recipies", authMiddleware, recipeRouter);
    this.appServer.use("/users", userRouter);
  }

  listen(port: number) {
    this.appServer.listen(port, () => {
      console.log(`server is running ${port}`);
    });
  }
}

export default App;
