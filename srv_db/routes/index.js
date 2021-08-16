const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const planRouter = require("./planRouter");
const trainRouter = require("./trainRouter");

router.use("/user", userRouter);
router.use("/plan", planRouter);
router.use("/train", trainRouter);

module.exports = router;
