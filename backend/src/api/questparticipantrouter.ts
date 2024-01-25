// routes/questParticipants.js
import express from 'express';

const router = express.Router();

const { QuestParticipant, User, Quest } = require('../models');

// Get all Quest Participants


// Get a specific Quest Participant by ID
router.get('/quest-participants/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const participant = await QuestParticipant.findByPk(id, {
      include: [User, Quest],
    });
    if (!participant) {
      return res.status(404).json({ error: 'Quest Participant not found' });
    }
    res.json(participant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Update a Quest Participant by ID
router.put('/quest-participants/:id', async (req, res) => {
  const id = req.params.id;
  const { quest_id, user_id } = req.body;

  try {
    const participant = await QuestParticipant.findByPk(id);

    if (!participant) {
      return res.status(404).json({ error: 'Quest Participant not found' });
    }

    await participant.update({
      quest_id,
      user_id,
      // You may add other fields as needed
    });

    res.json(participant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a Quest Participant by ID
router.delete('/quest-participants/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const participant = await QuestParticipant.findByPk(id);

    if (!participant) {
      return res.status(404).json({ error: 'Quest Participant not found' });
    }

    await participant.destroy();

    res.json({ message: 'Quest Participant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
