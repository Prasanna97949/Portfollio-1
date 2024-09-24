const express = require('express');
const router = express.Router();
const Plant = require('./models/Plant'); 


router.get('/plants', async (req, res) => {
  try {
    const plants = await Plant.find(); 
    res.json(plants);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.get('/plants/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id); 
    if (!plant) return res.status(404).send('Plant not found');
    res.json(plant);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.post('/plants', async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }

  try {
    const newPlant = new Plant({ name, description }); 
    await newPlant.save(); 
    res.status(201).json(newPlant); 
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.delete('/plants/:id', async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id); 
    if (!plant) return res.status(404).send('Plant not found');
    res.json(plant); 
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.put('/plants/:id', async (req, res) => {
  const { name, description } = req.body;


  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }

  try {
    const plant = await Plant.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true } 
    );

    if (!plant) return res.status(404).send('Plant not found');
    res.json(plant); 
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;