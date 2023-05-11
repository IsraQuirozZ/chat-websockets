const errorHandler = (error, req, res, next) => {
  console.log(error.stack);
  return res.json({
    status: 500,
    method: req.method,
    path: req.url,
    response: error.message,
  });
};

export default errorHandler;
