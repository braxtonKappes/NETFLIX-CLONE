const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Channel, User, Profile, Movie } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Get all profiles
router.get('/all/:userId',
asyncHandler(async(req, res) => {
    const paramId = req.params.userId * 1;
    console.log('HELLOOOOO', res)
    console.log('HELLOOOOO', paramId)
    const profiles = await Profile.findAll({
        where: {
            userId: paramId
        }
    })
    return res.json(profiles)
}));

// Getting one profile
router.get('/one/:profileId',
asyncHandler(async(req, res) => {
    const profileId = req.params.id * 1;
    const spot = await Profile.findByPk(profileId)
    return res.json(profile)
}));

// Add a profile
router.post('/',
requireAuth,
asyncHandler(async (req, res) => {
    const { userId, icon, name } = req.body;
    const profile = await Profile.create({ userId, icon, name });
    return res.json({ profile })
}));

// Delete a profile
router.delete('/:profileId',
requireAuth,
asyncHandler(async (req, res) => {
    const profileId  = req.params.profileId * 1;
    const profile = await Profile.findByPk(profileId)
    await profile.destroy()
    return res.json(profileId)
}));

// Edit a profile
router.put('/',
requireAuth,
asyncHandler(async (req, res) => {
    const profileId = req.body.profileId
    const { icon, name } = req.body;
    const selectedProfile = await Profile.findByPk(profileId)
    await selectedProfile.update({ icon, name });
    const profile = await Spot.findByPk(profileId)
    return res.json(profile)
}))

module.exports = router;
