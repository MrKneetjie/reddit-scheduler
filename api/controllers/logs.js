const { Log } = require('../cron');

const getLogs = async (req, res) => {
    const logs = await Log.find({}).limit(250).sort({ date: -1 });

    res.send(logs);
};

module.exports = {
    getLogs,
};