const rootRouter = require("express").Router();
const auth = require("../middlewares/auth");

rootRouter.use("/signup", require("./signup"));
rootRouter.use("/signin", require("./signin"));

rootRouter.use(auth);

rootRouter.use("/users", require("./users"));
rootRouter.use("/movies", require("./movie"));

rootRouter.use("*", (req, res, next) => {
  next(new NotFoundError("Страница не найдена "));
});

module.exports = rootRouter;