const router = require("express").Router();
const ItemController = require("../controllers/Item.Controller");

router.get("/item", ItemController.getItem);
router.get("/item/:id", ItemController.getItemDetail);
router.post("/item", ItemController.create);
router.put("/item/:id", ItemController.update);
router.delete("/item/:id", ItemController.delete);
module.exports = router;