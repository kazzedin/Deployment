const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { employerModel } = require('./db/userDb.js');
const { resModel } = require('./db/resultDb.js');
require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin:["https://deployment-server-side-g337o3oro-kazzedins-projects.vercel.app"],
    methods:["GET", "POST"],
    credentials:true,
}));

mongoose.connect(process.env.MONGO_URL) //PetroMag cest le nom de la base de donner

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/employer', async (req, res) => {
    try {
        const data = await employerModel.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/employer/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await employerModel.findById(id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/result', async (req, res) => {
    try {
        const { id, T, R, I, M, A, C, Cr, Indemnité_Route, Kilometrage, Nuisances, CR_Avec_IZCV, CR_Sans_IZCV, Autre_ZONE } = req.body;
        const _1 = req.body['1'];
        const _2 = req.body['2'];
        const _6 = req.body['6'];
        const _7 = req.body['7'];
        const _8 = req.body['8'];
        const _9 = req.body['9'];

        const user1 = await employerModel.findById(id);
        if (!user1) return res.status(404).json("User not found");

        const user2 = await resModel.findById(id);
        if (user2) return res.json("Result already exists");

        await resModel.create({
            _id: id,
            T, R, I, M, A,
            1: _1, 2: _2, 6: _6, 7: _7, 8: _8, 9: _9,
            C, Cr, Indemnité_Route, Kilometrage, Nuisances,
            CR_Avec_IZCV, CR_Sans_IZCV, Autre_ZONE
        });

        res.json("Success");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});
