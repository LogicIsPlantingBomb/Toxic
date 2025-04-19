// controllers/battleRoyale.controller.js
const Opinion = require('../models/opinionModel');

exports.startBattleRoyale = async (req, res) => {
  try {
    // Reset all opinions for a new battle
    await Opinion.updateMany({}, { isActive: true });
    
    res.status(200).json({
      success: true,
      message: 'Battle Royale started'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getBattleStatus = async (req, res) => {
  try {
    const activeOpinions = await Opinion.find({ isActive: true })
      .sort({ score: -1 })
      .populate('author', 'username');
    
    res.status(200).json({
      success: true,
      count: activeOpinions.length,
      data: activeOpinions
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
