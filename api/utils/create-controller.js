module.exports = (controller) => (req, res, next) => {
    controller(req, res, next).catch((err) => {
        // console.error(err);
        
        next(err);
    });
};