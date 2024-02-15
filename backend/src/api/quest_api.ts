import express from 'express';
const router = express.Router();
const Twit = require('twit');
import axios from 'axios';

router.get('/recommended', async (req, res) => {
  res.send('GET /api/v1/quests/recommended');
});

router.get('/', async (req, res) => {
  console.log("---- root ---");
  const { page = 0, page_size = 10 } = req.query;

  // Parse page and page_size as numbers
  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(page_size as string, 10);

  res.send(`GET /api/v1/quests?page=${pageNumber}&page_size=${pageSize}`);
});




router.post('/check-twitter-user-id', async (req, res) => {
  try {
    const { user_id } = req.body;

    // Check if the provided user ID is a valid Twitter ID
    const isValid = await isValidTwitterId(user_id);

    if (isValid) {
      res.json({ message: `User ID ${user_id} is a valid Twitter ID.` });
    } else {
      console.log(req.body);
      res.status(404).json({ message: `User ID ${user_id} is not a valid Twitter ID.` });
    }
  } catch (error) {
    console.error('Error checking Twitter ID:', error.message);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

async function isValidTwitterId(userId : any) {
  try {
    // Replace 'YOUR_TWITTER_BEARER_TOKEN' with your actual Twitter API Bearer Token
    const response = await axios.get(`https://api.twitter.com/2/users/${userId}`, {
      headers: {
        Authorization: `Bearer YOUR_TWITTER_BEARER_TOKEN`,
      },
    });

    // Check if the response contains user data
    return response.data && response.data.data;
  } catch (error) {
    // Handle API request errors
    console.error('Error checking Twitter ID:', error.message);
    return false;
  }
}
export default router;
