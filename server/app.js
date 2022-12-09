import express from 'express';
import session from 'express-session';
import Database from 'easy-json-database';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const db = new Database('./database.json');

// Session Setup
app.use(session({
    secret: 'somesecret',
    cookie: {
        maxAge: 360000000,
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        path: '/',
        domain: '127.0.0.1'
    },
    saveUninitialized: false,
    resave: false,
    name: 'sid',
    proxy: true
}));

// // Trust the first proxy
// app.set('trust proxy', 1);

// CORS Setup
app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// JSON Setup
app.use(express.json());

// Request Logging
app.use(morgan('dev'));

// Session validation middleware
function validateSession(req, res, next) {
    if (!req.session.username) return res.status(403).json({ message: 'Invalid session' });
    return next();
}

// Root Route
app.get('/', (req, res) => {
    return res.json({
        message: 'server is running'
    });
});

// Sign Up
app.post('/sign-up', (req, res) => {

    const { username, password } = req.body;

    if (!(username && password)) return res.status(400).json({ message: 'Username and password are both required' });

    const userExists = db.has(username);
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = { username, password, items: [] };
    db.set(username, user);

    req.session.username = username;

    return res.status(201).json({ message: 'Signup successful' });
});

app.post('/login', (req, res) => {

    const { username, password } = req.body;
    if (!(username && password)) return res.status(400).json({ message: 'Username and password are both required' });

    const userData = db.get(username);
    if (!userData) return res.status(404).json({ message: 'User not found' });

    req.session.username = userData.username;

    return res.json({ message: 'Login successful' });
});

app.get('/me', validateSession, (req, res) => {

    const { username } = req.session;
    const userData = db.get(username);

    res.json({ data: { username: userData.username, items: userData.items } });
});

app.patch('/add-item', validateSession, (req, res) => {

    const { username } = req.session;
    const { item } = req.body;

    const userData = db.get(username);
    userData.items.push(item);

    db.set(username, userData);

    res.json({ message: 'Item added' });
});

app.listen(8080, () => console.log('Web server listening on port 8080'));
