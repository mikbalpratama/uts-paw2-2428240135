const express = require("express");
const stylistController = require("../controller/stylistcontroller");

const router = express.Router();

router.get("/", stylistController.getAllStylist);
router.get("/:id", stylistController.getStylistById);
router.post("/", stylistController.createStylist);
router.put("/:id", stylistController.updateStylist);
router.delete("/:id", stylistController.deleteStylist);

module.exports = router;