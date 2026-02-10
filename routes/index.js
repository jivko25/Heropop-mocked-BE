const express = require('express');
const authRouter = require('./auth');
const pinRouter = require('./pin');
const childrenRouter = require('./children');
const codesRouter = require('./codes');
const parentRouter = require('./parent');
const heroesRouter = require('./heroes');
const storiesRouter = require('./stories');

const router = express.Router();

// All /api routes go here

// /api/auth/*
router.use('/auth', authRouter);
router.use('/auth', pinRouter);

// /api/children/*
router.use('/children', childrenRouter);

// /api/codes/*
router.use('/codes', codesRouter);

// /api/parent/*
router.use('/parent', parentRouter);

// /api/heroes/*
router.use('/heroes', heroesRouter);

// /api/stories/*
router.use('/stories', storiesRouter);

module.exports = router;

