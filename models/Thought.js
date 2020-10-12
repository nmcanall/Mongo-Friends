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
        // I took this out so the username could be dynamically invoked based on the User's ID in params
        // username: {
        //     type: String,
        //     required: [true, "You must include the username that created the thought."]
        // },
        username: {
            type: Schema.Types.ObjectId,
            ref: "User"
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