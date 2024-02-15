import express from 'express';
import { Quest } from '../models/quest';
import { QuestParticipant } from '../models/questparticipant';
import { User } from '../models/user';
import { QuestStep } from '../models/queststep';



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



//quest-paricipants from here -- //



router.post('/quest-participants', async (req, res, next) => {
  try {
    const { quest_id, user_id } = req.body;

    // Check if a QuestParticipant already exists for the user and quest
    const existingQuestParticipant = await QuestParticipant.findOne({
      where: { quest_id, user_id },
    });

    if (existingQuestParticipant) {
      return res.status(400).json({ error: 'user has beeen already participated in these quest' });
    }

    // If no existing QuestParticipant create a new one
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

//fetch all quest participants
router.get('/quest-participants', async (req, res) => {
  try {
    const participants = await QuestParticipant.findAll();
    res.json(participants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//fetch questparticipant by id 
router.get('/quest-participants/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const participant = await QuestParticipant.findByPk(id);
    if (!participant) {
      return res.status(404).json({ error: 'Quest Participant not found' });
    }
    res.json(participant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// quest-step-controllers 

interface StepArgsConfig {
  args: string[];
  verification: string[];
}

interface SubCategoryConfig {
  [key: string]: StepArgsConfig;
}

interface CategoryConfig {
  [key: string]: SubCategoryConfig;
}

const STEPARGS: CategoryConfig = {
  twitter: {
    like: {
      args: ['twitter_id', 'page_url'],
      verification: ['username'],
    },
    retweet: {
      args: ['twitter_id', 'tweet_id'],
      verification: ['username', 'tweet_id'],
    },
    tweet: {
      args: ['verification_text', '#guardian', '#jumptrade'],
      verification: ['username', 'tweet_id'],
    },
    quote: {
      args: ['original_tweet_id', 'verification_text', '#guardian', '#jumptrade'],
      verification: ['username', 'tweet_id'],
    },
    reply: {
      args: ['original_tweet_id', 'verification_text', '#guardian', '#jumptrade'],
      verification: ['username', '*tweet_id'],
    },
  }
};

router.post('/quest-steps', async (req, res) => {
  try {
    const { questId, category, subCategory, args, instruction } = req.body;

    // Check if the provided category exists in the config
    if (STEPARGS[category]) {
      // Check if the provided subCategory exists in the config for the selected category
      if (STEPARGS[category][subCategory]) {
        const expectedArgs: string[] = STEPARGS[category][subCategory].args;

        // Validate if the provided args match the expected structure
        if (expectedArgs.every(arg => args.includes(arg))) {
          // If validation passes, proceed to create the QuestStep
          const questStep = await QuestStep.create({
            questId,
            category,
            subCategory,
            args,
            instruction,
          });

          return res.json(questStep);
        } else {
          const missingArgs = expectedArgs.filter(arg => !args.includes(arg));
          return res.status(400).json({ error: `Missing arguments: ${missingArgs.join(', ')}` });
        }
      } else {
        return res.status(400).json({ error: `Invalid subcategory "${subCategory}" for category "${category}".` });
      }
    } else {
      return res.status(400).json({ error: `Invalid category "${category}".` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;