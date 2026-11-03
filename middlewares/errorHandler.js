function notFoundHandler(req, res) {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null,
  });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).json({
      status: "error",
      message: "Format JSON tidak valid",
      data: null,
    });
  }

  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
    data: null,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
