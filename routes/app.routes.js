const categoryController = require("../controllers/categories.controller");

const express = require("express");
const router = express.Router();

router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category", categoryController.findOne);
router.delete("/category", categoryController.delete);
router.put("/category", categoryController.update);

module.exports = router;