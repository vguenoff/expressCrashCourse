const express = require('express');
const uuid = require('uuid');

const members = require('../../Members');

const router = express.Router();

// Gets All Members
router.get('/', (req, res) => res.json(members));

// Gets Single Member
router.get('/:id', (req, res) => {
    const checkMember = member => member.id === Number(req.params.id);
    const found = members.some(checkMember);

    found
        ? res.json(members.filter(checkMember))
        : res
              .status(400)
              .json({ msg: `No member with the id of ${req.params.id}` });
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg: 'Please include a name and email',
        });
    }

    members.push(newMember);

    res.json(members);
});

module.exports = router;
