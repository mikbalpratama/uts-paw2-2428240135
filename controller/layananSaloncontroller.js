const LayananSalon = require("../models/layananSalonModel");

function getErrorStatus(error) {
  if (error.code === 11000) return 409;
  if (error.name === "ValidationError" || error.name === "CastError") return 400;
  return 500;
}

exports.getAllLayananSalon = async (req, res) => {
  try {
    const filter = req.query.kategori ? { kategori: req.query.kategori } : {};
    const data = await LayananSalon.find(filter).sort({ nama: 1 });
    res.status(200).json({ message: "Data layanan salon berhasil ditampilkan", data });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data layanan salon" });
  }
};

exports.getLayananSalonById = async (req, res) => {
  try {
    const layanan = await LayananSalon.findById(req.params.id);
    if (!layanan) {
      return res.status(404).json({ message: "Layanan salon tidak ditemukan" });
    }
    res.status(200).json({ data: layanan });
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
};

exports.createLayananSalon = async (req, res) => {
  try {
    const layanan = await LayananSalon.create(req.body);
    res.status(201).json({ message: "Layanan salon berhasil ditambahkan", data: layanan });
  } catch (error) {
    res.status(getErrorStatus(error)).json({
      message: error.code === 11000 ? "Kode layanan sudah digunakan" : error.message,
    });
  }
};

exports.updateLayananSalon = async (req, res) => {
  try {
    const layanan = await LayananSalon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!layanan) {
      return res.status(404).json({ message: "Layanan salon tidak ditemukan" });
    }
    res.status(200).json({ message: "Layanan salon berhasil diperbarui", data: layanan });
  } catch (error) {
    res.status(getErrorStatus(error)).json({
      message: error.code === 11000 ? "Kode layanan sudah digunakan" : error.message,
    });
  }
};

exports.deleteLayananSalon = async (req, res) => {
  try {
    const layanan = await LayananSalon.findByIdAndDelete(req.params.id);
    if (!layanan) {
      return res.status(404).json({ message: "Layanan salon tidak ditemukan" });
    }
    res.status(200).json({ message: "Layanan salon berhasil dihapus" });
  } catch (error) {
    res.status(getErrorStatus(error)).json({ message: error.message });
  }
};
