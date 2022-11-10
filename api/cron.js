const mongoose = require('mongoose');
const axios = require('axios');
const qs = require('qs');

const postSchema = new mongoose.Schema({
    code: String,
    date: Date,
    sub: String,
    title: String,
    text: String,
    flair: String,
    posted: Boolean,
    link: String,
    score: Number,
    views: Number,
    comments: Number,
    username: String,
});

const Post = mongoose.model('Post', postSchema);

const userSchema = new mongoose.Schema({
    username: String,
    refreshToken: String,
});

const User = mongoose.model('User', userSchema);

const botSchema = new mongoose.Schema({
    username: String,
    refreshToken: String,
});

const Bot = mongoose.model('Bot', botSchema);

const upvoteSchema = new mongoose.Schema({
    post: String,
    amount: Number,
    current: Number,
    status: String,
});

const Upvote = mongoose.model('Upvote', upvoteSchema);

const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: { type: Boolean, default: 'false' },
    redditPosts: { type: Boolean, default: 'false' },
    redditDms: { type: Boolean, default: 'false' },
    redditUpvotes: { type: Boolean, default: 'false' },
});

const Account = mongoose.model('Account', accountSchema);

const logSchema = new mongoose.Schema({
    type: String,
    title: String,
    content: String,
    date: Date,
});

const Log = mongoose.model('Log', logSchema);

module.exports = { Post, User, Bot, Upvote, Account, Log };

const CronJob = require('cron').CronJob;
const snoowrap = require('snoowrap');

const { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, USER_AGENT } = process.env;

const isValidHttpUrl = (string) => {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

const postSubmission = async (reddit, submission, refreshToken) => {
    try {
        if (isValidHttpUrl(submission.text)) {
            return reddit
            .getSubreddit(submission.sub)
            .submitLink({title: submission.title, url: submission.text});
        } else {
            return reddit
                .getSubreddit(submission.sub)
                .submitSelfpost({title: submission.title, text: submission.text, flairId: submission.flair}); // over_18: true
        }
    } catch (err) {
            const log = new Log({
                type: "post",
                title: `Post Error`,
                content: err.toString(),
                date: new Date()
            });

            await log.save();
    }
}

const checkPosts = async () => {
    console.log("CHECKING POSTS");
    const posts = await Post.find({ posted: false });
    posts.forEach(async (post) => {
        // const date = new Date(new Date().setHours(new Date().getHours() - 8));
        const date = new Date();
        if(new Date(post.date) <= date) {
            const response = new snoowrap({
                userAgent: USER_AGENT,
                clientId: AUTH_CLIENT_ID,
                clientSecret: AUTH_CLIENT_SECRET,
                refreshToken: post.code
            });

            const submission = {
                sub: post.sub,
                title: post.title,
                text: post.text,
                flair: post.flair,
            }

            await postSubmission(response, submission).then(async (res) => {
                post.posted = true;
                post.link = res.name;

                await post.save();
                console.log("POSTED!");
            }).catch(async (err) => {
                const log = new Log({
                    type: "post",
                    title: `Post (ID: ${post.id}) Error`,
                    content: err.toString(),
                    date: new Date()
                });

                await log.save();

                if (err.toString().includes("RATELIMIT")) {
                    let time = err.toString().split(" ")[13];

                    if (err.toString().split(" ")[14].startsWith('s')) {
                        time /= 60;
                    } else if (err.toString().split(" ")[14].startsWith('h')) {
                        time *= 60;
                    } else if (err.toString().split(" ")[14].startsWith('d')) {
                        time *= 60*24;
                    }

                    // let date = new Date(new Date().getTime() + (time * 60000));
    
                    // post.date = date;
            
                    await post.save();
                }
            });
        }
    });
};

const checkPostsAnalytics = async () => {
    console.log("CHECKING POST ANALYTICS");
    const posts = await Post.find({}).limit(20);
    posts.forEach(async (post) => {
        const reddit = new snoowrap({
            userAgent: USER_AGENT,
            clientId: AUTH_CLIENT_ID,
            clientSecret: AUTH_CLIENT_SECRET,
            refreshToken: post.code
        });

        reddit.getSubmission(post.link).fetch().then(async (sub) => {
            post.score = sub.score | 0;
            post.views = sub.view_count | 0;
            post.comments = sub.comments | 0;

            await post.save();
        });
    });
};

const refreshAccounts = async () => {
    const users = await User.find({});
    const bots = await Bot.find({});
    users.concat(bots).forEach(async (user) => {
            const data = qs.stringify({
                'grant_type': 'refresh_token',
                'refresh_token': user.refreshToken,
            });
            
            const config = {
            method: 'post',
            url: 'https://www.reddit.com/api/v1/access_token',
            headers: { 
                'Authorization': 'Basic UFlXaTVQU1RiQlE0VWNhdE9pX1JRZzpqcjdrS1RaM1Q4dzRTU05oUElfbElZQTRCZmZWOUE=', 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Cookie': 'edgebucket=R6dAc6w0vNZmnTkVIk; loid=0000000000hobqpphe.2.1639788644311.Z0FBQUFBQmh2VEJremI4bGw3aGRKNFlDRTVWX1lxaG82RkFNVFVYU1RZb1JJbUVGX2tkWDU3a3J5bkI4N3NSeHFCWnNwWHRaOVVZdmpxOGx0eFU0Mk1MbXlSeVZFdG8tU0ZQTlZablQ3QUh3U3gzcVd1TXVxa2k4bUVFenZMU0lDaU5xUzVZVjd6Umo'
            },
            data : data
            };
        
            axios(config)
            .then(async function (response) {
                console.log("UPDATED REFRESH TOKEN FOR: " + user.username + "!");
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

const clearLogs = async () => {
    console.log("CHECKING LOGS TO CLEAR");
    const count = await Log.countDocuments({});
    if (count > 250) {
        await Log.deleteMany({}, () => {
            console.log("CLEARED LOGS");
        });
    }
};

const postJob = new CronJob('* * * * *', function() {
    checkPosts();
}, null, true, 'Europe/Brussels');

const analyticsJob = new CronJob('*/5 * * * *', function() {
    checkPostsAnalytics();
}, null, true, 'Europe/Brussels');

const logsJob = new CronJob('*/5 * * * *', function() {
    clearLogs();
}, null, true, 'Europe/Brussels');

const refreshJob = new CronJob('*/30 * * * *', function() {
    refreshAccounts();
}, null, true, 'Europe/Brussels');

postJob.start();
analyticsJob.start();
logsJob.start();
refreshJob.start();
