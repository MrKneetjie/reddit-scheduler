const snoowrap = require('snoowrap');

const { User, Log } = require('../cron.js');

const { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, USER_AGENT } = process.env;

const commentOnPost = async (req, res) => {
    if(req.body.postId === "" || req.body.account === "" || req.body.comment === "") {
        console.log("Empty request property!");
        res.send('404');
        return
    }

    User.findOne({ username: req.body.account.endsWith("\r") ? req.body.account.slice(0, -1) : req.body.account }, async (err, user) => {
        if(err) {
            const log = new Log({
                type: "comment",
                title: `Comment (username: ${req.body.account}) Error`,
                content: err.toString(),
                date: new Date()
            });

            await log.save();
        }
    
        const reddit = new snoowrap({
            userAgent: USER_AGENT,
            clientId: AUTH_CLIENT_ID,
            clientSecret: AUTH_CLIENT_SECRET,
            refreshToken: user.refreshToken
        });

        console.log(req.body.postId, req.body.comment);
        console.log("test");
        reddit.getSubmission(req.body.postId);
        console.log("test2");
        reddit.getSubmission(req.body.postId).reply(req.body.comment);
        console.log("test3");
        // reddit.getSubmission(req.body.postId).reply(req.body.comment).then(result => res.status(200));
    }).catch(err => {
        res.status(500);
    });

    res.status(500);
}

module.exports = {
    commentOnPost,
};