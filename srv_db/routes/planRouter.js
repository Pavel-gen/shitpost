const Router = require("express");
const router = new Router();
const exeController = require("../controllers/exeController");
const authMiddleware = require("../middleware/authMiddleware");
const planController = require("../controllers/planCotroller");

router.post("/", authMiddleware, planController.create);
router.get("/", authMiddleware, planController.getAll);
//router.get("/:id", authMiddleware, planController.getOne);
router.delete("/:id", authMiddleware, planController.delete);

router.post("/:id", exeController.add);
router.get("/:id", authMiddleware, exeController.getAllP);
router.put("/:id/exe/:id", exeController.update);
router.delete("/:id/exe/:id", exeController.delete);

module.exports = router;
