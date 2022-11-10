const { Account, Log } = require("../cron");

const login = async (req, res) => {
    const doesUserExit = await Account.exists({ username: req.body.username });
    if (doesUserExit) {
        const loggedAccount = await Account.find({ username: req.body.username });
        if(loggedAccount[0].password == req.body.password) {
            res.send(loggedAccount._id);
        } else {
            res.status(401).send("Wrong Password");;
        }
    } else {
        res.status(404).send("Account Not Found");;
    }
}

const register = async (req, res) => {
    const doesUserExit = await Account.exists({ username: req.body.username });
    if (doesUserExit === false) {
        const newAccount = new Account({ username: req.body.username, password: req.body.password });
    
        await newAccount.save();
        res.status(200).send("Registered");;
    } else {
        res.status(409).send("User Already Exists");;
    }
    res.status(500).send("Server Error");;
}

const getAuth = async (req, res) => {
    const loggedAccount = await Account.find({ username: req.params.username });
    if (loggedAccount) {
        res.send(loggedAccount[0]);
    } else {
        res.status(404).send("User Not Found");;
    }
}

const getAccounts = async (req, res) => {
    const users = await Account.find({});

    res.send(users);
};

const togglePerms = async (req, res) => {
    const users = await Account.findOne({ username: req.body.username }, async (err, user) => {
        if (err) {
            const log = new Log({
                type: "user",
                title: `User (username: ${req.body.username}) perm toggle Error`,
                content: err.toString(),
                date: new Date()
            });

            await log.save();
        }

        switch (req.body.perm) {
            case "admin":
                user.admin = !user.admin;
                user.save()
                break;
            case "posts":
                user.redditPosts = !user.redditPosts;
                user.save()
                break;
            case "dms":
                user.redditDms = !user.redditDms;
                user.save()
                break;
            case "upvotes":
                user.redditUpvotes = !user.redditUpvotes;
                user.save()
                break;
            default:
                user.save();
        }
    });
};

const removeAccount = async (req, res) => {
    Account.findById(req.body.id).remove(() => {
        res.status(200);
    });

    res.status(500);
}

module.exports = {
    login,
    register,
    getAuth,
    getAccounts,
    togglePerms,
    removeAccount
};