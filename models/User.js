const {Schema, model} = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "You must include a username."],
            unique: [true, "Username is already taken."],
            trim: true
        },
        email: {
            type: String,
            required: [true, "You must include an email."],
            unique: [true, "Email is already taken."],
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'You must enter a valid email.']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            unique: true
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;