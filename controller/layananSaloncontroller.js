const LayananSalon = require("../models/layananSalonModel");
const Stylist = require("../models/stylistModel");

function getErrorStatus(error) {
  if (error.code === 11000) return 409;
  if (error.name === "ValidationError" || error.name === "CastError") return 400;
  return 500;
}

exports.getAllLayananSalon = async (req, res) => {
  try {
    const filter = {};
    if (req.query.kategori) {
      filter.kategori = req.query.kategori;
    }

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      LayananSalon.find(filter)
        .populate("stylistId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      LayananSalon.countDocuments(filter),
    ]);

    res.status(200).json({
      message: "Data layanan salon berhasil ditampilkan",
      pagination: {
        totalData: total,
        totalHalaman: Math.ceil(total / limit),
        halamanSekarang: page,
        limit,
      },
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data layanan salon",
    });
  }
};

exports.getLayananSalonById = async (req, res) => {
  try {
    const layanan = await LayananSalon.findById(req.params.id).populate("stylistId");

    if (!layanan) {
      return res.status(404).json({
        message: "Layanan salon tidak ditemukan",
      });
    }

    res.status(200).json({
      data: layanan,
    });
  } catch (error) {
    res.status(getErrorStatus(error)).json({
      message: error.name === "CastError" ? "ID layanan tidak valid" : error.message,
    });
  }
};

exports.createLayananSalon = async (req, res) => {
  try {
    if (!req.body.stylistId || !(await Stylist.exists({ _id: req.body.stylistId }))) {
      return res.status(400).json({ message: "stylistId wajib berisi ID stylist yang terdaftar" });
    }

    const layanan = await LayananSalon.create(req.body);
    await layanan.populate("stylistId");

    res.status(201).json({
      message: "Layanan salon berhasil ditambahkan",
      data: layanan,
    });
  } catch (error) {
    res.status(getErrorStatus(error)).json({
      message: error.code === 11000 ? "Kode layanan sudah digunakan" : error.message,
    });
  }
};

exports.updateLayananSalon = async (req, res) => {
  try {
    if (Object.hasOwn(req.body, "stylistId")) {
      if (!req.body.stylistId || !(await Stylist.exists({ _id: req.body.stylistId }))) {
        return res.status(400).json({ message: "stylistId harus berisi ID stylist yang terdaftar" });
      }
    }

    const layanan = await LayananSalon.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).populate("stylistId");

    if (!layanan) {
      return res.status(404).json({
        message: "Layanan salon tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Layanan salon berhasil diperbarui",
      data: layanan,
    });
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
      return res.status(404).json({
        message: "Layanan salon tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Layanan salon berhasil dihapus",
    });
  } catch (error) {
    res.status(getErrorStatus(error)).json({
      message: error.name === "CastError" ? "ID layanan tidak valid" : error.message,
    });
  }
};
