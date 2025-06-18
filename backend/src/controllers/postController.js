const Post = require('../models/postModel');

async function list(req, res, next) {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const post = await Post.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { title, body } = req.body;
    const user_id = req.user.id;
    const newPost = await Post.create({ title, body, user_id });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
}

async function updateOne(req, res, next) {
  try {
    const updated = await Post.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await Post.remove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, updateOne, remove };