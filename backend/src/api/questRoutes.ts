import express from 'express';
import { Quest } from '../models/quest';
import { QuestParticipant } from '../models/questparticipant';
import { User } from '../models/user';

const router = express.Router();


// Create a quest
router.post('/quests', async (req, res, next) => {
  try {
    const exampleQuestData = {
      name: req.body.name,
      live: true,
      categories: ['Adventure', 'Exploration'],
      disable: false,
      points: '100',
      points_token_ratio: 0.5,
      network: 'Mainnet',
      token_symbol: 'QST',
      primary_address: '0xabcdef1234567890',
    };

    const questData = { ...exampleQuestData, ...req.body };
    console.log("---questData ---", questData)

    const newQuest = await Quest.create(questData);

    res.status(201).json({ data: newQuest, message: 'Quest created successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Fetch all quests from the database
router.get('/quests', async (req, res, next) => {
  try {
    const allQuests = await Quest.findAll();
    res.json({ data: allQuests, message: 'success' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Fetch a quest by ID
router.get('/quests/:id', async (req, res, next) => {
  try {
    const questId = req.params.id;

    const quest = await Quest.findByPk(questId);

    if (!quest) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ data: quest, message: 'quest retrieved successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.get('/quest/details', (req, res) => {
//   res.json({ message: 'details not found' });
// });


// Delete a quest by ID
router.delete('/quests/:id', async (req, res, next) => {
  try {
    const questId = req.params.id;
    
    const quest = await Quest.findByPk(questId);

    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }

    await quest.destroy();

    res.json({ message: 'Quest deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.post('/quest-participants', async (req, res, next) => {
  try {
    const { quest_id, user_id } = req.body;

    // Check if a QuestParticipant already exists for the user and quest
    const existingQuestParticipant = await QuestParticipant.findOne({
      where: { quest_id, user_id },
    });

    if (existingQuestParticipant) {
      return res.status(400).json({ error: 'QuestParticipant already exists' });
    }

    // If no existing QuestParticipant, create a new one
    const newQuestParticipant = await QuestParticipant.create({
      quest_id,
      user_id,
    });

    res.status(201).json({
      data: newQuestParticipant,
      message: 'QuestParticipant created successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// router.get('/quest-participants', async (req, res) => {
//   try {
//     const participants = await QuestParticipant.findAll({
//       include: [User, Quest],
//     });
//     res.json(participants);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// Create a new Quest Participant
router.post('/quest-participants', async (req, res) => {
  const { quest_id, user_id } = req.body;

  try {
    const newParticipant = await QuestParticipant.create({
      quest_id,
      user_id,
      // You may add other fields as needed
    });

    res.status(201).json(newParticipant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;