const {Schema, model} = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: "You must include a username.",
            unique: "Username is already taken.",
            trim: true
        },
        email: {
            type: String,
            required: "You must include an email.",
            unique: "Email is already taken.",
            trim: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
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