const layananSalonController = require("./layananSaloncontroller");

module.exports = {
  getAllServices: layananSalonController.getAllLayananSalon,
  getServiceById: layananSalonController.getLayananSalonById,
  createService: layananSalonController.createLayananSalon,
  updateService: layananSalonController.updateLayananSalon,
  deleteService: layananSalonController.deleteLayananSalon,
};
