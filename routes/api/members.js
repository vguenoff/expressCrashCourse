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

    if (found) {
        res.json(members.filter(checkMember));
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`,
        });
    }
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

// Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === Number(req.params.id));

    if (found) {
        members.forEach(member => {
            if (member.id === Number(req.params.id)) {
                const { name, email } = req.body;

                member.name = name ? name : member.name;
                member.email = email ? email : member.email;

                res.json({
                    msg: 'Member updated',
                    member,
                });
            }
        });
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`,
        });
    }
});

// Delete a member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === Number(req.params.id));

    if (found) {
        res.json({
            msg: 'Member deleted',
            members: members.filter(
                member => member.id !== Number(req.params.id)
            ),
        });
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`,
        });
    }
});

module.exports = router;
