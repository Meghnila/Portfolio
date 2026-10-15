const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
// Normalize multiple consecutive slashes (e.g. //api/projects -> /api/projects)
app.use((req, res, next) => {
    req.url = req.url.replace(/\/{2,}/g, '/');
    next();
});

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000",
    "https://portfolio-coral-six-glzj2w31yw.vercel.app"
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

// Database Connection
console.log('Connecting to MongoDB...');
if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI is not defined in .env file!');
} else {
    console.log('MONGODB_URI found in environment.');
}

mongoose.connect(process.env.MONGODB_URI)
    .then((conn) => console.log(`MongoDB Connected Successfully: ${conn.connection.host}`))
    .catch(err => {
        console.error('MongoDB Connection Error Details:');
        console.error(err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
