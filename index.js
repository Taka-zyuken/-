const express = require('express');
const app = express();

const mongoose = require('mongoose');

// MongoDB Atlasの接続文字列
const uri = "mongodb+srv://takazyuken:f4Lnpk9kondCSAta@quiz.m5u3r.mongodb.net/?retryWrites=true&w=majority&appName=Quiz";

// MongoDBに接続
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
