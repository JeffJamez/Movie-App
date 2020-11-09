import express from "express";
import Favorite from "../models/FavoriteModel.js";

const router = express.Router();

router.post("/favoritesNumber", (req, res) => {
    // find the favorites information inside the favorite collection by movie's id
    Favorite.find({"movieId": req.body.movieId})
        .exec((err, favorites) =>{
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, NoOfFavorites: favorites.length})
        })
});

router.post("/favorited", (req, res) => {
    // find the favorites information inside the favorite collection by user
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, favorites) =>{
            if(err) return res.status(400).send(err)
            //check if the user already added a movie as one of his favorites
            let result = false
            if(favorites.length != 0){
                result = true
            }

            res.status(200).json({success: true, favorited: result})

        })
});

router.post("/addToFavorites", (req, res) => {
    //save the movie & user info inside the favorites model
    const favorite = new Favorite(req.body)  //creating an instance
    favorite.save((err, doc) =>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true})
    })

});

router.post("/removeFromFavorites", (req, res) => {
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc)=>{
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, doc})
        })

});

router.post('/favoredMovies', (req, res) => {

    Favorite.find({ "userFrom": req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })

})

export default router;