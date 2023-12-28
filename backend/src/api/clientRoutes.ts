import express from 'express';
import { Client } from '../models/client';

const router = express.Router();

//find all the users from the db
router.get('/clients', async (req, res, next) => {
  
  try {
 
    const allClients = await Client.findAll();
    res.json({ data: allClients,message:'success'});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// find the user by id
router.get('/clients/:id', async (req, res, next) => {
  try {
    const clientId = req.params.id;

    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ data: client, message: 'Client retrieved successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete a client using id
router.delete('/clients/:id', async (req, res, next) => {
  try {
    const clientId = req.params.id;
    
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // delete the client
    await client.destroy();

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// creating an new user in db
router.post('/clients', async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Name is required in the request body' });
    }

    const newClientData = {
      name: req.body.name,
      slug:req.body.slug,
      updated_at: new Date(),
      created_at: new Date(),
    };

    const newClient = await Client.create(newClientData);

    res.json({ data: newClient, message: 'Client created successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
