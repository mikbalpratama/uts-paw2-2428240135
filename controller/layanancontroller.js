const Service = require("../models/layananModel");

// GET: Menampilkan semua jenis servis
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      message: "Data jenis servis berhasil ditampilkan",
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET: Menampilkan jenis servis berdasarkan ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Jenis servis tidak ditemukan",
      });
    }

    res.status(200).json({
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// POST: Menambahkan jenis servis
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      message: "Jenis servis berhasil ditambahkan",
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// PUT: Mengubah jenis servis
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({
        message: "Jenis servis tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Jenis servis berhasil diperbarui",
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE: Menghapus jenis servis
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Jenis servis tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Jenis servis berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
