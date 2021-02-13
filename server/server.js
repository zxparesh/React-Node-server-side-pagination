require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const { fetchUserList, fetchUserCount } = require('./handlers');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("login fetch", email, password)
    res.send({
        token: 'test123'
    });
});

app.use('/users', async (req, res) => {
    try {
        const { page, size } = req.query;
        console.log("page", page, size)
        const rows = await fetchUserList(page, size)
        const count = await fetchUserCount(size);
        res.send({
            count,
            rows
        });
    } catch (error) {
        console.log("Error fetching list of users!", error);
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}/login`)
});