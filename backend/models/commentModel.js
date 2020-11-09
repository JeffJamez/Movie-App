import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {type: String},
        responseTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    { timestamps: true });

const commentModel = mongoose.model('Comment', commentSchema);

export default commentModel;
