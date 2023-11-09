const { Comment, User, Rate } = require('../../db/models');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    if (req.session.userId) {
      const { user_id, service_id, text, rate } = req.body;
      // console.log(req.body);
      if ((user_id, service_id, text.trim())) {
        const comment = await Comment.create({ user_id, service_id, text });
        const rating = await Rate.create({
          user_id,
          service_id,
          score: rate,
        });
        // console.log(rate);
        const commentRes = await Comment.findOne({
          where: { id: comment.id },
          include: { model: User },
        });
        res.json({ comment: commentRes, rate: rating });
      }
    }
  } catch ({ message }) {
    res.json({ message });
  }
});
router.delete('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findOne({ where: { id: +commentId } });
    const rate = await Rate.findOne({
      where: { user_id: comment.user_id, service_id: comment.service_id },
    });
    // console.log(comment);
    const data = {
      comment_id: comment.id,
      service_id: comment.service_id,
      rate_id: rate.id,
    };
    if (comment.user_id === req.session.userId) {
      const result = await Comment.destroy({ where: { id: +commentId } });
      const result2 = await Rate.destroy({ where: { id: rate.id } });
      if (result > 0 && result2 > 0) {
        res.json(data);
      }
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
