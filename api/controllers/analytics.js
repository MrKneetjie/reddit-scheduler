const { Post, User, Account, Log } = require('../cron.js');

const getAmounts = async (req, res) => {
    let monthPosts = 0;
    let weekPosts = 0;
    let dayPosts = 0;

    let accountsAmount = 0;
    let usersAmount = 0;
    
    Post.find({date: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        $lt: new Date()
    }}, async (err, x) => {
        if (err) {
            const log = new Log({
                type: "analytics",
                title: "Analytics (monthly posts) Error",
                content: err.toString(),
                date: new Date()
            });

            await log.save();
            
            res.status(500);
            return;
        }

        monthPosts = x.length;

        Post.find({date: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            $lt: new Date()
        }}, async (err, y) => {
            if (err) {
                const log = new Log({
                    type: "analytics",
                    title: "Analytics (weekly posts) Error",
                    content: err.toString(),
                    date: new Date()
                });

                await log.save();

                res.status(500);
                return;
            }

            weekPosts = y.length;

            Post.find({date: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
                $lt: new Date()
            }}, async (err, z) => {
                if (err) {
                    const log = new Log({
                        type: "analytics",
                        title: "Analytics (daily posts) Error",
                        content: err.toString(),
                        date: new Date()
                    });

                    await log.save();

                    res.status(500);
                    return;
                }
        
                console.log(z);
                dayPosts = z.length;

                Account.find({}, async (err, accounts) => {
                    if (err) {
                        const log = new Log({
                            type: "analytics",
                            title: "Analytics (accounts) Error",
                            content: err.toString(),
                            date: new Date()
                        });

                        await log.save();

                        res.status(500);
                        return;
                    }
            
                    accountsAmount = accounts.length;

                    User.find({}, async (err, users) => {
                        if (err) {
                            const log = new Log({
                                type: "analytics",
                                title: "Analytics (users) Error",
                                content: err.toString(),
                                date: new Date()
                            });

                            await log.save();

                            res.status(500);
                            return;
                        }
                
                        usersAmount = users.length;

                        res.status(200).json({
                            posts: {
                                monthPosts,
                                weekPosts,
                                dayPosts,
                            },
                            accounts: accountsAmount,
                            users: usersAmount,
                        });
                    })
                })
            })
        })
    })
};

module.exports = {
    getAmounts,
};