import mongoose from 'mongoose';

const dilikeSchema = new mongoose.Schema({
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

const dislikeModel = mongoose.model('Dislike', dilikeSchema);

export default dislikeModel;
