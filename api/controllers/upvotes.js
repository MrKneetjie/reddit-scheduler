const snoowrap = require('snoowrap');
const { Bot, Upvote } = require('../cron');

const getBots = async (req, res) => {
    const bots = await Bot.find({});

    res.send(bots);
};

const removeBot = async (req, res) => {
    Bot.findById(req.body.id).remove(() => {
        res.status(200);
    });

    res.status(500);
}

const getUpvotes = async (req, res) => {
  const upvotes = await Upvote.find({});

  res.send(upvotes);
};

let i = 0;

const upvotePost = async (req, res) => {
    const newUpvote = new Upvote({ post: req.body.post, amount: req.body.amount, current: 0, status: "Upvoting" });

    await newUpvote.save();

    const bots = await Bot.find({}).limit(req.body.amount);
    i = 0;
    upvote(bots, req.body.post, bots.length, newUpvote._id)
      
    bots.forEach(async (bot) => {

    });
    res.status(200);
}

const upvote = (bots, post, amount, id) => {
    setTimeout(async function() {
      const reddit = new snoowrap({
            userAgent: "mac:www.onlybands.xyz:v1.3.1 (by /u/MrKneetjie)",
            clientId: "lSlIXuxM-nVK4VKvHCuNIQ",
            clientSecret: "3XhIqFMLlSI1Lk6JHgFI52K7CC1hiQ",
            refreshToken: bots[i].refreshToken
        });

        console.log(bots[i].username + " Upvoting: " + post);
        reddit.getSubmission(post).upvote().then(res => {}).catch(err => console.log(err));

        await Upvote.findOneAndUpdate({ _id: id }, { $inc: { current: 1 }})
      i++;
      if (i < amount) {
        upvote(bots, post, amount, id);
      } else {
        await Upvote.findOneAndUpdate({ _id: id }, { status: "Done" })
      }
    }, 5000)
  }

module.exports = {
    getBots,
    removeBot,
    getUpvotes,
    upvotePost,
};