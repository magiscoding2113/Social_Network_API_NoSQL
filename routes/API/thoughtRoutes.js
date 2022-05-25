const router = require('express').Router();

const {
    getThoughts,
    createThoughts,
    updateThoughts,
    removeThoughts,
    createReaction,
    removeReaction,
    getSingleThoughts,
} = require('../../controllers/thoughtController');

// /api/thoughts

router.route('/').get(getThoughts).post(createThoughts);

router
.route('/:thoughtId')
.get(getSingleThoughts)
.put(updateThoughts)
.delete(removeThoughts);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;