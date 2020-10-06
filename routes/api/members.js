const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const { members } = require('../../constants');

// Gets all members
router.get('/', (req, res) => {
  res.json(members);
});

// Get single member
router.get('/:id', (req, res) => {
  const {
    params: { id }
  } = req;

  const found = members.some(member => member.id === Number(id));

  if (found) {
    res.json(members.filter(member => member.id === Number(id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${id}` });
  }
});

// Create Member
router.post('/', (req, res) => {
  const {
    body: { name, email }
  } = req;

  if (!name || !email) {
    return res.status(400).json({ msg: 'Name and Email fields are required' });
  }

  const newMember = {
    id: uuid.v4(),
    name,
    email,
    status: 'active'
  };

  // Add the new data into db

  res.json(newMember);
  // for inserting through template form
  // res.redirect('/template');
});

// Update Member
router.put('/:id', (req, res) => {
  const {
    params: { id }
  } = req;

  const found = members.some(member => member.id === Number(id));

  if (found) {
    const {
      body: { name, email, status }
    } = req;

    // update data in db

    let [member] = members.filter(member => member.id === Number(id));
    member.name = name ? name : member.name;
    member.email = email ? email : member.email;
    member.status = status ? status : member.status;

    res.json({ msg: 'Member Updated', member });
  } else {
    res.status(400).json({ msg: `No member with the id of ${id}` });
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  const {
    params: { id }
  } = req;

  const found = members.some(member => member.id === Number(id));

  if (found) {
    // Delete data from db

    res.json({ msg: 'Member Deleted', members: members.filter(member => member.id !== Number(id)) });
  } else {
    res.status(400).json({ msg: `No member with the id of ${id}` });
  }
});

module.exports = router;
