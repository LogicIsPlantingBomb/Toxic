// routes/battleRoyale.routes.js
const express = require('express');
const router = express.Router();
const battleRoyaleController = require('../controllers/battleRoyale.controller');
const { authUser } = require('../middlewares/auth.middleware');

router.post('/start', authUser, battleRoyaleController.startBattleRoyale);
router.get('/status', battleRoyaleController.getBattleStatus);

module.exports = router;
