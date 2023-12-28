import express from 'express';
import { Quest } from '../models/quest';
const router = express.Router();
var slugify = require('slugify')

// creating a new quest 
router.post('/quests', async (req, res, next) => {
  try {
    // Example data for a new quest
    const exampleQuestData = {
      name: req.body.name,
      live: true,
      client_id: 1,
      slug: Math.random().toString(36).substring(2, 15),
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

//fetch all the quest from the db
router.get('/quests', async (req,res,next)=>{
  try {
 
    const allClients = await Quest.findAll();
    res.json({ data: allClients,message:'success'});
  } catch (error) {
    console.error(error);
  }

})

// fetch a quest by id
router.get('/quests/:id', async (req, res, next) => {
  try {
    const questId = req.params.id;

    const quest = await Quest.findByPk(questId);

    if (!quest) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ data: quest, message: 'Client retrieved successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete a quest using id
router.delete('/quests/:id', async (req, res, next) => {
  try {
    const questId = req.params.id;
    
    const quest = await Quest.findByPk(questId);

    if (!quest) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await quest.destroy();

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


  export default router;