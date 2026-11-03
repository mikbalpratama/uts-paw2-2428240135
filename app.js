require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const logger = require("./middlewares/logger");
const cekApiKey = require("./middlewares/cekApiKey");

const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");

// Import routes
const layananSalonRoutes = require("./routes/layananroutes");
const stylistRoutes = require("./routes/stylistroutes");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware global
app.use(logger);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());

// Route utama
app.get("/", (req, res) => {
  res.json({
    nama: process.env.NAMA,
    nim: process.env.NPM,
    topik: "Salon Kecantikan",
    endpoints: [
      "GET /layanan-salon",
      "GET /layanan-salon/:id",
      "POST /layanan-salon",
      "PUT /layanan-salon/:id",
      "DELETE /layanan-salon/:id",
      "GET /stylist",
      "GET /stylist/:id",
      "POST /stylist",
      "PUT /stylist/:id",
      "DELETE /stylist/:id",
    ],
  });
});

// Route layanan salon dan stylist
app.use("/layanan-salon", cekApiKey, layananSalonRoutes);
app.use("/stylist", cekApiKey, stylistRoutes);

// Error handler
app.use(notFoundHandler);
app.use(errorHandler);

if (require.main === module) {
  if (!process.env.DB_URI || !process.env.API_KEY) {
    console.error("DB_URI dan API_KEY wajib diatur di file .env");
    process.exitCode = 1;
  } else {
    mongoose
      .connect(process.env.DB_URI)
      .then(() => {
        console.log("Terhubung ke MongoDB");

        app.listen(PORT, () => {
          console.log(`Server berjalan di http://localhost:${PORT}`);
        });
      })
      .catch((err) => {
        console.error("Gagal terhubung:", err.message);
        process.exitCode = 1;
      });
  }
}

module.exports = app;
