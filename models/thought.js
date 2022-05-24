const {Schema, model} = require('mongoose');
const reactionSchema = require('./reaction');

const formatDate = (date) => {
    return date.toLocaleDateString();
};

const thoughtSchema = new Schema (
    {
        thoughtText: {
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

thoughtSchema
.virtual('reactionCount')
.get(function totalReactions(){
    return this.reactions.length;
});

const thought = model('thought', thoughtSchema)

module.exports = thought;
