// 404 Handler Middleware
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'page not found',
    });
};

module.exports = notFoundHandler;