const Router = require("express");
const router = new Router();
const trainController = require("../controllers/trainController");
const authMiddleware = require("../middleware/authMiddleware");
const exeController = require("../controllers/exeController");

router.post("/", authMiddleware, trainController.start);
router.put("/:id", trainController.addSet);
//router.get("/:id", authMiddleware, trainController.getOne);
router.get("/:id", authMiddleware, exeController.getAllT);
router.get("/", authMiddleware, trainController.getAll);
router.delete("/:id", trainController.delete);

module.exports = router;
