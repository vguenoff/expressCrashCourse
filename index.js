const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger');

const app = express();

// Init middleware
app.use(logger);

// Gets All Members
app.get('/api/members/', (req, res) => res.json(members));

// Gets Single Member
app.get('/api/members/:id', (req, res) => {
    const checkMember = member => member.id === Number(req.params.id);
    const found = members.some(checkMember);

    found
        ? res.json(members.filter(checkMember))
        : res
              .status(400)
              .json({ msg: `No member with the id of ${req.params.id}` });
});

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
