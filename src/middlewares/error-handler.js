export const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(",");
    customError.statusCode = 400
    customError.msg = message
  }

  if (err.name === "CastError") {
    customError.statusCode = 404
    customError.msg = `Invalid id: ${err.value}`
  }

  //Error customizado para errores duplicados
  if (err.code && err.code === 11000){
    customError.statusCode = 400
    customError.msg = `Duplicate value entered for: ${Object.keys (err.keyValue)}, please choose another value`
  }

  res.status(customError.statusCode).json({ status: "error", message:customError.msg });
};
