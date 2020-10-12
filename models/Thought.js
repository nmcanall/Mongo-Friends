const {Schema, model, Types} = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema(

);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, "You must include thought text."],
            minlength: 1,
            maxlength: 280
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            // Reformat date with Moment.js
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
        },
        username: {
            type: String,
            required: [true, "You must include the username that created the thought."]
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;