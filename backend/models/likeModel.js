import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }

}, { timestamps: true })

const likeModel = mongoose.model('Like', likeSchema);

export default likeModel;
