const router = require('express').Router();
const { Post } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ raw: true });
    res.json(posts);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findOne({
      raw: true,
      where: { id: req.params.postId },
    });
    res.json(post);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { img, text } = req.body;
    const post = await Post.create({
      img: img,
      text: text,
    });
    res.status(200).json(post);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
router.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await Post.destroy({ where: { id: +postId } });
    // console.log('========');
    if (result > 0) {
      res.json(+postId);
      return;
    }
    res.json({ message: 'error' });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { img, text } = req.body;
    const [result] = await Post.update(
      {
        img,
        text,
      },
      { where: { id: postId } }
    );
    if (result > 0) {
      const post = await Post.findOne({ where: { id: +postId } });
      res.json(post);
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
