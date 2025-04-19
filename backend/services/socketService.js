// services/socketService.js
const Opinion = require('../models/opinionModel');
const Comment = require('../models/commentModel');
const socketAuthMiddleware = require('../middlewares/socketAuth.middleware');

const setupSocketIO = (io) => {
  // Apply auth middleware
  io.use(socketAuthMiddleware);
  
  io.on('connection', async (socket) => {
    // Now socket.user contains the authenticated user
    console.log('User connected:', socket.user.username);
    
    // Send active opinions to newly connected user
    const activeOpinions = await Opinion.find({ isActive: true })
      .sort({ score: -1, createdAt: -1 })
      .populate('author', 'username');
    
    socket.emit('initial_opinions', activeOpinions);
    
    // Handle opinion submission
    socket.on('submit_opinion', async (data) => {
      try {
        const { content } = data;
        
        const newOpinion = new Opinion({
          content,
          author: socket.user._id
        });
        
        await newOpinion.save();
        
        // Populate author info before broadcasting
        const populatedOpinion = await Opinion.findById(newOpinion._id)
          .populate('author', 'username');
        
        io.emit('new_opinion', populatedOpinion);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });
    
    // Handle opinion votes
    socket.on('vote_opinion', async (data) => {
      try {
        const { opinionId, voteType } = data;
        const opinion = await Opinion.findById(opinionId);
        
        if (!opinion) {
          return socket.emit('error', { message: 'Opinion not found' });
        }
        
        // Process vote using authenticated user
        const userId = socket.user._id;
        const hasUpvoted = opinion.upvotes.includes(userId);
        const hasDownvoted = opinion.downvotes.includes(userId);
        
        if (voteType === 'upvote') {
          if (hasUpvoted) {
            opinion.upvotes.pull(userId);
          } else {
            opinion.upvotes.push(userId);
            if (hasDownvoted) {
              opinion.downvotes.pull(userId);
            }
          }
        } else if (voteType === 'downvote') {
          if (hasDownvoted) {
            opinion.downvotes.pull(userId);
          } else {
            opinion.downvotes.push(userId);
            if (hasUpvoted) {
              opinion.upvotes.pull(userId);
            }
          }
        }
        
        await opinion.save();
        
        // Check if opinion should be eliminated
        if (opinion.score <= -10) {
          opinion.isActive = false;
          await opinion.save();
          io.emit('opinion_eliminated', { opinionId: opinion._id });
        } else {
          // Populate author info before broadcasting
          const populatedOpinion = await Opinion.findById(opinion._id)
            .populate('author', 'username');
          
          io.emit('opinion_updated', populatedOpinion);
        }
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });
    
    // Handle comment submission
    socket.on('submit_comment', async (data) => {
      try {
        const { content, opinionId } = data;
        
        const newComment = new Comment({
          content,
          author: socket.user._id,
          opinion: opinionId
        });
        
        await newComment.save();
        
        // Populate author info before broadcasting
        const populatedComment = await Comment.findById(newComment._id)
          .populate('author', 'username');
        
        io.emit('new_comment', populatedComment);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });
    
    // Rest of your socket handlers...
    
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupSocketIO;
