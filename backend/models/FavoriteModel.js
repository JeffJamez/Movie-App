import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    // userFrom: {type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    userFrom: {type: String},
    movieId : {type: String},
    movieTitle: {type: String},
    movieImage: {type: String},
    movieRunTime: {type: String}
});

const favoriteModel = mongoose.model('Favorite', favoriteSchema);

export default favoriteModel;
