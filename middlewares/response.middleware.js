const responseMiddleware = (req, res, next) => {
    res.send(res.data);
    next();
};

exports.responseMiddleware = responseMiddleware;