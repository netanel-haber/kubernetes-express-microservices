function prepRes(statusCode, ok, content = {}) {
    this.status(statusCode).json({ ok, ...(content && { content }) });
}
module.exports = (app) => {
    app.use((req, res, next) => {
        res.prepRes = prepRes;
        return next();
    })
}