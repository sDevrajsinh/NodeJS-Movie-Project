/**
 * Error Handling Middleware
 * Demonstrates: Express middleware, Error handling
 */

// 404 Not Found Handler
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Global Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);

    // For API requests, send JSON
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        res.json({
            success: false,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
        });
    } else {
        // For page requests, render error page
        res.render('error', {
            title: 'Error',
            message: err.message,
            error: process.env.NODE_ENV === 'development' ? err : {}
        });
    }
};

module.exports = { notFound, errorHandler };
