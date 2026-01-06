const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

router.post("/", controller.addBook);
router.get("/", controller.getAllBooks);
router.get("/category/:category", controller.getByCategory);
router.get("/after2015", controller.getAfter2015);
router.put("/copies/:id", controller.updateCopies);
router.put("/category/:id", controller.updateCategory);
router.delete("/:id", controller.deleteBook);

module.exports = router;