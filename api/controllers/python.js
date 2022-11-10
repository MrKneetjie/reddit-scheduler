const fs = require('fs');
const csvStringify = require('csv-stringify');
const { exec } = require('child_process');
const { Log } = require('../cron');

const bulkAccountUpload = async (req, res) => {
    let users = [];

    req.body.users.forEach(user => {
        users.push([user.username, user.password])
    });

    csvStringify.stringify(users, { header: false }, async (err, output) => {
        if (err) {
            const log = new Log({
                type: "python",
                title: `Python bulkAccountUpload stringify Error`,
                content: err.toString(),
                date: new Date()
            });

            await log.save();
        }

        fs.writeFile('accounts.csv', output, async (err) => {
            if (err) {
                const log = new Log({
                    type: "python",
                    title: `Python bulkAccountUpload writeFile Error`,
                    content: err.toString(),
                    date: new Date()
                });

                await log.save();
            }

            console.log('accounts.csv saved.');

            exec('python3 refresh-token.py',
            async (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    const log = new Log({
                        type: "python",
                        title: `Python bulkAccountUpload refresh-token Error`,
                        content: error.toString(),
                        date: new Date()
                    });
                    
                    await log.save();

                    console.log(`exec error: ${error}`);
                }
            });

            res.status(200)
        });
    });

    res.status(500);
};

const bulkBotUpload = async (req, res) => {
    let users = [];

    req.body.users.forEach(user => {
        users.push([user.username, user.password])
    });

    csvStringify.stringify(users, { header: false }, async (err, output) => {
        if (err) {
            const log = new Log({
                type: "python",
                title: `Python bulkBotUpload stringify Error`,
                content: err.toString(),
                date: new Date()
            });

            await log.save();
        }

        fs.writeFile('bots.csv', output, async (err) => {
        if (err) {
            const log = new Log({
                type: "python",
                title: `Python bulkBotUpload writeFile Error`,
                content: err.toString(),
                date: new Date()
            });

            await log.save();
        }

            console.log('bots.csv saved.');

            exec('python3 refresh-token-bots.py',
            async (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    const log = new Log({
                        type: "python",
                        title: `Python bulkBotUpload refresh-token-bots Error`,
                        content: error.toString(),
                        date: new Date()
                    });
        
                    await log.save();

                    console.log(`exec error: ${error}`);
                }
            });

            res.status(200)
        });
    });

    res.status(500);
};

const bulkUnblockAccount = async (req, res) => {
    let users = [];

    req.body.users.forEach(user => {
        users.push([user.username, user.password])
    });

    csvStringify.stringify(users, { header: false }, async (err, output) => {
        if (err) {
            const log = new Log({
                type: "python",
                title: `Python bulkUnblockAccount stringify Error`,
                content: err.toString(),
                date: new Date()
            });

            await log.save();
        }

        fs.writeFile('unblock-accounts.csv', output, async (err) => {
        if (err) {
            const log = new Log({
                type: "python",
                title: `Python bulkUnblockAccount writeFile Error`,
                content: err.toString(),
                date: new Date()
            });

            await log.save();
        }

            console.log('unblock-accounts.csv saved.');

            exec('python3 unblock-accounts.py',
            async (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    const log = new Log({
                        type: "python",
                        title: `Python bulkUnblockAccount unblock-accounts Error`,
                        content: error.toString(),
                        date: new Date()
                    });
        
                    await log.save();

                    console.log(`exec error: ${error}`);
                }
            });

            res.status(200)
        });
    });

    res.status(500);
};

const massDm = async (req, res) => {
    try {
        exec(`python3 ./Reddit_ChatBot_Python-master/reddit_chat-cli.py ${req.body.login.username} ${req.body.login.password} '${req.body.message}' ${req.body.users.join(" ")}`,
        async (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);

                const log = new Log({
                    type: "python",
                    title: `Python massDm Error`,
                    content: error.toString(),
                    date: new Date()
                });
    
                await log.save();
            }
        });

        res.status(200)
    } catch (err) {
        const log = new Log({
            type: "python",
            title: `Python massDm Error`,
            content: err.toString(),
            date: new Date()
        });

        await log.save();

        res.status(500);
    }
};

module.exports = {
    bulkAccountUpload,
    bulkBotUpload,
    bulkUnblockAccount,
    massDm
};