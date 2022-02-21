const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.json()
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
               winston.format.colorize(),
               winston.format.simple()
            )
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' }),
        new winston.transports.Console({ level: 'info', format: winston.format.json() })
    ]
});

function error(err, req, res, next) {
    logger.info(err.message, err);
    logger.error(err.message, err);

    // error
    // warn
    // info

    res.status(500).send("Something failed");
    next();
}

exports.logger = logger;
exports.error = error;