const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Channel, User, Profile, Movie } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateProfile = [
    check('icon')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please select a profile icon.'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 10 })
        .withMessage('Please provide a valid profile name.'),
    handleValidationErrors,
];

// Get all profiles
router.get('/all/:userId',
asyncHandler(async(req, res) => {
    const paramId = req.params.userId * 1;
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
    const profileId = req.params.profileId * 1;
    const profile = await Profile.findByPk(profileId)
    return res.json(profile)
}));

// Add a profile
router.post('/',
requireAuth,
validateProfile,
asyncHandler(async (req, res) => {
    const { userId, icon, name } = req.body;
    const profile = await Profile.create({ userId, icon, name });
    return res.json(profile)
}));

// Delete a profile
router.delete('/',
requireAuth,
asyncHandler(async (req, res) => {
    const { profileId } = req.body;
    const profile = await Profile.findByPk(profileId)
    await profile.destroy()
    return res.json(profileId)
}));

// Edit a profile
router.put('/',
requireAuth,
validateProfile,
asyncHandler(async (req, res) => {
    const { profileId, icon, name } = req.body;
    const selectedProfile = await Profile.findByPk(profileId)
    await selectedProfile.update({ icon, name });
    const profile = await Profile.findByPk(profileId)
    return res.json(profile)
}))

module.exports = router;
