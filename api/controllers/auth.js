const snoowrap = require('snoowrap');
const axios = require('axios');
const qs = require('qs');
const { User, Bot } = require('../cron');

const { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_REDIRECT_URI, USER_AGENT } = process.env;

const authenticate = (req, res) => {
    const authenticationUrl = snoowrap.getAuthUrl({
        clientId: AUTH_CLIENT_ID,
        scope: ['*'],
        redirectUri: AUTH_REDIRECT_URI,
        permanent: true,
        state: 'fe211bebc52eb3da9bef8db6e63104d3' // a random string, this could be validated when the user is redirected back
    });

    res.send({
        url: authenticationUrl,
    });
};

const callback = async (req, res, next) => {
    const { code } = req.query;

    const data = qs.stringify({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': AUTH_REDIRECT_URI
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
        const reddit = new snoowrap({
            userAgent: USER_AGENT,
            clientId: AUTH_CLIENT_ID,
            clientSecret: AUTH_CLIENT_SECRET,
            refreshToken: response.data.refresh_token
        });

        const userInfo = await getInfo(reddit);

        const doesUserExit = await User.exists({ username: userInfo.name });
        if (doesUserExit === false) {
            console.log("No user found adding " + userInfo.name + " to DB!");
            const newUser = new User({ username: userInfo.name, refreshToken: response.data.refresh_token });

            await newUser.save();
        }
        res.redirect(`https://www.onlybands.xyz`);
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send();
    });
};

const botCallback = async (req, res, next) => {
    const { code } = req.query;

    const data = qs.stringify({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'https://www.onlybands.xyz/api/authorize_callback_bot'
    });

    const config = {
    method: 'post',
    url: 'https://www.reddit.com/api/v1/access_token',
    headers: { 
        'Authorization': 'Basic bFNsSVh1eE0tblZLNFZLdkhDdU5JUTozWGhJcUZNTGxTSTFMazZKSGdGSTUySzdDQzFoaVE=', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'edgebucket=R6dAc6w0vNZmnTkVIk; loid=0000000000hobqpphe.2.1639788644311.Z0FBQUFBQmh2VEJremI4bGw3aGRKNFlDRTVWX1lxaG82RkFNVFVYU1RZb1JJbUVGX2tkWDU3a3J5bkI4N3NSeHFCWnNwWHRaOVVZdmpxOGx0eFU0Mk1MbXlSeVZFdG8tU0ZQTlZablQ3QUh3U3gzcVd1TXVxa2k4bUVFenZMU0lDaU5xUzVZVjd6Umo'
    },
        data : data
    };

    axios(config)
    .then(async function (response) {
        const reddit = new snoowrap({
            userAgent: 'windows:www.onlybands.xyz:v1.3.1 (by /u/MrKneetjie)',
            clientId: 'lSlIXuxM-nVK4VKvHCuNIQ',
            clientSecret: '3XhIqFMLlSI1Lk6JHgFI52K7CC1hiQ',
            refreshToken: response.data.refresh_token
        });

        const userInfo = await getInfo(reddit);

        const doesUserExit = await Bot.exists({ username: userInfo.name });
        if (doesUserExit === false) {
            console.log("No bot found adding " + userInfo.name + " to DB!");
            const newUser = new Bot({ username: userInfo.name, refreshToken: response.data.refresh_token });

            await newUser.save();
        }
        res.redirect(`https://www.onlybands.xyz`);
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send();
    });
};

const getInfo = async (reddit) => {
    try {
        return reddit
            .getMe();
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    authenticate,
    callback,
    botCallback,
};
