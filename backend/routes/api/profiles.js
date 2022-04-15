const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Channel, User, Profile, Movie } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/',
asyncHandler(async(req, res) => {
    const profiles = await Profile.findAll()
    return res.json(profiles)
}));
