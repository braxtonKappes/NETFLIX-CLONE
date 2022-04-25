const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Channel, User, Profile, Movie, Channel_Movie } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateChannel = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 250 })
        .withMessage('Please write a note between 1 - 250 characters.'),
    handleValidationErrors,
];

// Get all channels
router.get('/all/:profileId',
asyncHandler(async(req, res) => {
    const profileId = req.params.profileId;
    const channels = await Channel.findAll({
        where: {
            profileId: profileId
        },
        // include: {
        //     model: Movie,
        //     // as: 'movies',
        //     through: {
        //         attributes: []
        //     }
        // }
    })
    // console.log('\n\n\n',channels,'\n\n\n' )
    // const channelMovies = {};
    // channels.forEach( async channel => {
    //     const moviesAndChannels = await Channel_Movie.findAll({
    //         where: {
    //             channelId: channel.id
    //         }
    //     })
    //     const movies = moviesAndChannels.map( async channelMovie => {
    //         const movie = await Movie.findByPk(channelMovie.movieId);
    //         return movie;
    //     })
    //     channelMovies[channel.id] = {channel, movies}
    // })
    return res.json(channels)
}));

// Getting one channel
router.get('/one/:channelId',
asyncHandler(async(req, res) => {
    const channelId = req.params.channelId * 1;
    const channel = await Channel.findByPk(channelId)
    return res.json(channel)
}));

// Add a channel
router.post('/',
requireAuth,
validateChannel,
asyncHandler(async (req, res) => {
    const { profileId, name } = req.body;
    const channel = await Channel.create({ profileId, name });
    return res.json(channel)
}));

// Add a movie to a channel
// router.post('/movieToChannel',
// requireAuth,
// validateChannel,
// asyncHandler(async (req, res) => {
//     const { channelId, movieId } = req.body;
//     const channel = await Channel.create({ userId, icon, name });
//     return res.json(channel)
// }));

// Delete a channel
router.delete('/',
requireAuth,
asyncHandler(async (req, res) => {
    const { channelId } = req.body;
    const channel = await Channel.findByPk(channelId)
    await channel.destroy()
    return res.json(channelId)
}));

// Edit a channel
router.put('/',
requireAuth,
validateChannel,
asyncHandler(async (req, res) => {
    const { channelId, name } = req.body;
    const selectedChannel = await Channel.findByPk(channelId)
    await selectedChannel.update({ name });
    const channel = await Channel.findByPk(channelId)
    return res.json(channel)
}))

module.exports = router;
