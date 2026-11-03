const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema(
	{
		durasi: {
			type: String,
			required: true,
			trim: true,
		},
		catatan: {
			type: String,
			trim: true,
			default: "",
		},
	},
	{ _id: false },
);

const layananSalonSchema = new mongoose.Schema(
	{
		kodeLayanan: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		nama: {
			type: String,
			required: true,
			trim: true,
		},
		harga: {
			type: Number,
			required: true,
			min: 0,
		},
		kategori: {
			type: String,
			required: true,
			trim: true,
		},
		info: {
			type: infoSchema,
			required: true,
		},
		stylistId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Stylist",
			required: true,
		},
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model("LayananSalon", layananSalonSchema);
