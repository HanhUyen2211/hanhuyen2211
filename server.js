const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '.')));

// Route to serve a random message
app.get('/messages', (req, res) => {
    const messagesPath = path.join(__dirname, 'messages.json');
    fs.readFile(messagesPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Không thể đọc file messages' });
        }
        
        try {
            const messages = JSON.parse(data);
            const messageKeys = Object.keys(messages);
            const randomKey = messageKeys[Math.floor(Math.random() * messageKeys.length)];
            
            res.json({
                key: randomKey,
                message: messages[randomKey]
            });
        } catch (parseErr) {
            res.status(500).json({ error: 'Lỗi xử lý dữ liệu messages' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
