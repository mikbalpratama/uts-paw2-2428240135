function cekApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!process.env.API_KEY) {
    return res.status(500).json({
      status: "error",
      message: "API Key belum dikonfigurasi di server",
      data: null,
    });
  }

  if (!apiKey) {
    return res.status(401).json({
      status: "error",
      message: "API Key wajib disertakan",
      data: null,
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      status: "error",
      message: "API Key tidak valid",
      data: null,
    });
  }

  next();
}

module.exports = cekApiKey;