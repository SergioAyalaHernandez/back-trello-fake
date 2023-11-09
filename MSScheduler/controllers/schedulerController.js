const schedulerService = require('../services/schedulerServices');

const { validateTokenMiddleware } = require("../services/authMiddleware");

exports.getSchedulersById = [validateTokenMiddleware, async (req, res) => {
  try {
    console.log("Start get scheduler by id");
    const schedulerId = req.params.id;
    const scheduler = await schedulerService.getSchedulerById(schedulerId);
    res.status(200).json(scheduler);
  } catch (error) {
    res.status(404).json({ error: "Error obtaining users" });
  }
}];

exports.getSchedulers = [validateTokenMiddleware, async (req, res) => {
  console.log("Start get Scheduler");
  try {
    const scheduler = await schedulerService.getAllSchedulers();
    res.status(200).json(scheduler);
  } catch (error) {
    console.error('Error obtaining scheduler:', error);
    res.status(404).json({ error: 'Error obtaining scheduler' });
  }
}];

exports.createScheduler = [validateTokenMiddleware, async (req, res) => {
  try {
    console.log("Start to create scheduler");
    var schedulerData = req.body;
    var result = await schedulerService.createScheduler(schedulerData);

    if (result === 'process number already exists') {
      console.log(`the mail ${schedulerData.email} or user ${schedulerData.name} already registered`);
      res.status(400).json({
        success: false,
        message: `the email ${schedulerData.email} or user ${schedulerData.name} already registered`,
      });
    } else {
      console.log(`User successfully created with id: ${result}`);
      res.status(201).json({
        success: true,
        message: 'Scheduler successfully created',
        userId: result,
      });
    }
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).json({ error: error.message });
  }
}];

exports.updateScheduler = [validateTokenMiddleware, async (req, res) => {
  console.log("Start update scheduler");
  var schedulerId = req.params.id;
  const updatedSchedulerData = req.body;
  try {
    const updatedScheduler = await schedulerService.updateScheduler(schedulerId, updatedSchedulerData);
    res.json(updatedScheduler);
  } catch (error) {
    console.log(`error: ${error} with user ${schedulerId}`);
    res.status(500).json({ error: 'Error updating user' });
  }
}];


