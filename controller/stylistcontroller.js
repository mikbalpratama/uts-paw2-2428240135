const Stylist = require("../models/stylistModel");
const LayananSalon = require("../models/layananSalonModel");

function getErrorStatus(error) {
  if (error.code === 11000) return 409;
  if (error.name === "ValidationError" || error.name === "CastError") return 400;
  return 500;
}

exports.getAllStylist = async (req, res) => {
  try {
    const data = await Stylist.find().sort({ nama: 1 });
    res.status(200).json({ message: "Data stylist berhasil ditampilkan", data });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data stylist" });
  }
};

exports.getStylistById = async (req, res) => {
  try {
    const stylist = await Stylist.findById(req.params.id);
    if (!stylist) {
      return res.status(404).json({ message: "Stylist tidak ditemukan" });
    }
    res.status(200).json({ data: stylist });
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
};

exports.createStylist = async (req, res) => {
  try {
    const stylist = await Stylist.create(req.body);
    res.status(201).json({ message: "Stylist berhasil ditambahkan", data: stylist });
  } catch (error) {
    res.status(getErrorStatus(error)).json({
      message: error.code === 11000 ? "Kode stylist sudah digunakan" : error.message,
    });
  }
};

exports.updateStylist = async (req, res) => {
  try {
    const stylist = await Stylist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!stylist) {
      return res.status(404).json({ message: "Stylist tidak ditemukan" });
    }
    res.status(200).json({ message: "Stylist berhasil diperbarui", data: stylist });
  } catch (error) {
    res.status(getErrorStatus(error)).json({
      message: error.code === 11000 ? "Kode stylist sudah digunakan" : error.message,
    });
  }
};

exports.deleteStylist = async (req, res) => {
  try {
    const stylist = await Stylist.findById(req.params.id);
    if (!stylist) {
      return res.status(404).json({ message: "Stylist tidak ditemukan" });
    }

    const masihDigunakan = await LayananSalon.exists({ stylistId: stylist._id });
    if (masihDigunakan) {
      return res.status(409).json({ message: "Stylist masih digunakan oleh layanan salon" });
    }

    await Stylist.findByIdAndDelete(stylist._id);
    res.status(200).json({ message: "Stylist berhasil dihapus" });
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
};