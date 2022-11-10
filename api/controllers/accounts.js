const snoowrap = require('snoowrap');
const { User, Log } = require('../cron');

const { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, USER_AGENT } = process.env;

const getUsers = async (req, res) => {
    const users = await User.find({});

    res.send(users);
};

const removeUser = async (req, res) => {
    User.findById(req.body.id).remove(() => {
        res.status(200);
    });

    res.status(500);
}

const cleanseUser = async (req, res) => {
    User.findById(req.body.id, async (err, user) => {
        if(err) {
            const log = new Log({
                type: "account",
                title: `Cleanse Account (ID: ${req.body.id}) Error`,
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

        reddit.getMe().getSubmissions().then(submissions => submissions.map(submission => {
            reddit.getSubmission(submission.id).delete();
        }));

        reddit.getMe().getComments().then(comments => comments.map(comment => {
            reddit.getComment(comment.id).delete();
        }));

        res.status(200)
    });

    res.status(500);
}

module.exports = {
    getUsers,
    removeUser,
    cleanseUser
};