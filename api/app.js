const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const upload = multer();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
const accessBodyLogStream = fs.createWriteStream(path.join(__dirname, 'accessBody.log'), {flags: 'a'})

const app = express();

app.use(bodyParser.json());

app.use(morgan('combined', {stream: accessLogStream}))
morganBody(app, {stream: accessBodyLogStream});

const port = 3030;

const AuthController = require('./controllers/auth');
const ImportController = require('./controllers/import');
const PostController = require('./controllers/post');
const CommentController = require('./controllers/comment');
const AccountsController = require('./controllers/accounts');
const PythonController = require('./controllers/python');
const UpvotesController = require('./controllers/upvotes');
const ObAccountsController = require('./controllers/ob-auth');
const AnalyticsController = require('./controllers/analytics');
const LogsController = require('./controllers/logs');
const connectDB = require('./mongoose');
const createController = require('./utils/create-controller');
const { errorHandler } = require('./utils/error-handling');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json({
type: ['application/json', 'text/plain']
}))

app.use(errorHandler);

app.get('/api/authUrl', createController(AuthController.authenticate));
app.get('/api/authorize_callback', createController(AuthController.callback));
app.get('/api/authorize_callback_bot', createController(AuthController.botCallback));
app.get('/api/auth_result', (req, res, next) => {
    debugger;
});

app.post('/api/commentOnPost', createController(CommentController.commentOnPost));

app.post('/api/fromAuth', createController(PostController.fromAuth));
app.get('/api/getPosts/:username', createController(PostController.getPosts));
app.post('/api/getFlairs/', createController(PostController.getFlairs));
app.get('/api/getDate', (req, res) => {
    res.send(new Date(new Date().setHours(new Date().getHours() - 8)));
});

app.post('/api/cancelPost', createController(PostController.cancelPost));

app.get('/api/getUsers', createController(AccountsController.getUsers));
app.post('/api/removeUser', createController(AccountsController.removeUser));
app.post('/api/cleanseUser', createController(AccountsController.cleanseUser));

app.get('/api/getBots', createController(UpvotesController.getBots));
app.post('/api/removeBot', createController(UpvotesController.removeBot));
app.get('/api/getUpvotes', createController(UpvotesController.getUpvotes));
app.post('/api/upvotePost', createController(UpvotesController.upvotePost));

app.post('/api/bulkAcc', createController(PythonController.bulkAccountUpload));
app.post('/api/bulkBot', createController(PythonController.bulkBotUpload));
app.post('/api/bulkUnblock', createController(PythonController.bulkUnblockAccount));
app.post('/api/massDm', createController(PythonController.massDm));

app.post('/api/login', createController(ObAccountsController.login));
app.post('/api/register', createController(ObAccountsController.register));
app.get('/api/getAccounts', createController(ObAccountsController.getAccounts));
app.post('/api/togglePerms', createController(ObAccountsController.togglePerms));
app.post('/api/removeAccount', createController(ObAccountsController.removeAccount));
app.get('/api/getAuth/:username', createController(ObAccountsController.getAuth));

app.get('/api/getAmounts', createController(AnalyticsController.getAmounts));

app.get('/api/getLogs', createController(LogsController.getLogs));

app.post('/api/import', upload.single('file'), createController(ImportController.csv));

app.get(['*', '/*'], (req, res) => {
    res.send('Hello World!')
});

(async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
})();
