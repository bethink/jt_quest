import express from 'express';
const router = express.Router();

router.get('/recommended', async (req, res) => {
  res.send('GET /api/v1/quests/recommended');
});

router.get('/', async (req,res) => {
  console.log("---- root ---")
  const { page = 0, page_size = 10 } = req.query;

  // Parse page and page_size as numbers
  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(page_size as string, 10);

  res.send(`GET /api/v1/quests?page=${pageNumber}&page_size=${pageSize}`);
});


export default router;
