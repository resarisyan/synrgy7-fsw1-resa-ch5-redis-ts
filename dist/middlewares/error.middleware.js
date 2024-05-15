const notFound = (req, res, next) => {
    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const port = process.env.APP_PORT;
    const fullUrl = `${protocol}://${host}:${port}${url}`;
    res.status(404).send({
        success: false,
        message: `Route ${fullUrl} Not Found`,
    });
};
const appError = (err, req, res, next) => {
    const errStatusCode = err.status_code || 400;
    const errMessage = err.message || 'Something went wrong';
    res.status(errStatusCode).json({
        success: false,
        message: errMessage,
    });
};
const idNotFound = async (req, res, next) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(400).send({
            success: false,
            message: 'Invalid Id',
        });
    }
    next();
};
export { notFound, appError, idNotFound };
//# sourceMappingURL=error.middleware.js.map