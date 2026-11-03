const express = require("express");
const router = express.Router();

const layananSalonController = require("../controller/layananSaloncontroller");

router.get("/", layananSalonController.getAllLayananSalon);
router.get("/:id", layananSalonController.getLayananSalonById);
router.post("/", layananSalonController.createLayananSalon);
router.put("/:id", layananSalonController.updateLayananSalon);
router.delete("/:id", layananSalonController.deleteLayananSalon);

module.exports = router;
