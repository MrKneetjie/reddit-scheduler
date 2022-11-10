const ERRORS = {
    NOT_FOUND: 'ERROR_NOT_FOUND',
    SYSTEM: 'ERROR_SYSTEM',
};

const errorHandler = (err, req, res, next) => {
    if (!err) {
        return next();
    }

    if (res.headersSent) {
        return;
    }

    switch (err) {
        case ERRORS.NOT_FOUND:
            res.status(404).json({
                code: ERRORS.NOT_FOUND,
                err: 'Resource not found!',
            });
            break;
        default:
            res.status(500).json({
                code: ERRORS.SYSTEM,
                err: 'A system error occured.',
            });
    }
};

module.exports = {
    ERRORS,
    errorHandler,
};
