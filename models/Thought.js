const {Schema, model, Types} = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema(
    {
        // Set a custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String, 
            required: true,
            maxlength: 280
        },
        // Username is not validated, so a guest is authorized to leave a reaction
        username: {
            type: String, 
            required: [true, "You must include the username that created the thought."],
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Reformat date on backend using Moment.js
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
        }
    },
    // Allow the use of getters (allows Moment.js functionality)
    {
        toJSON: {
            getters: true
        }
    }
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
            required: [true, "You must include the username that created the thought."],
            trim: true
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