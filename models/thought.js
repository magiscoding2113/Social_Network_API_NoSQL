const {Schema, model} = require('mongoose');
const reactionSchema = require('./reaction');

const formatDate = (date) => {
    return date.toLocaleDateString();
};

const thoughtsSchema = new Schema (
    {
        thoughtsText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtsSchema
.virtual('reactionCount')
.get(function totalReactions(){
    return this.reactions.length;
});

const thoughts = model('thoughts', thoughtsSchema)

module.exports = thoughts;
