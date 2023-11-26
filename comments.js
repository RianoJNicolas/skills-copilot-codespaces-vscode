// Create web server to the start of your comments.js file
const express = require('express');
const router = express.Router();
const data = require('../data');
const commentData = data.comments;
const postData = data.posts;

router.get('/:id', async (req, res) => {
  try {
    const post = await postData.getPostById(req.params.id);
    const comments = post.comments;
    res.json(comments);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
  }
});

router.get('/comment/:id', async (req, res) => {
  try {
    const comment = await commentData.getCommentById(req.params.id);
    res.json(comment);
  } catch (e) {
    res.status(404).json({ error: 'Comment not found' });
  }
});

router.post('/:id', async (req, res) => {
  const commentInfo = req.body;
  try {
    const newComment = await commentData.addComment(
      commentInfo.name,
      commentInfo.comment,
      req.params.id
    );
    res.json(newComment);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await commentData.getCommentById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Comment not found' });
    return;
  }
  try {
    const post = await postData.getPostByCommentId(req.params.id);
    const comment = await commentData.getCommentById(req.params.id);
    await commentData.removeComment(req.params.id);
    await postData.removeCommentFromPost(post._id, comment._id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;