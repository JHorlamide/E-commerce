/* 404 error middleware */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/* ObjectId error middleware */
export const objectIdErrorHandler = (error, req, res, next) => {
  if (error.kind === 'ObjectId') {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    return res.json({
      message: err.message,
      stack: process.env.NODE_EN === 'production' ? null : err.stack,
    });
  }

  next(error);
};

/* Custom error middleware */
export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack_trace: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};
