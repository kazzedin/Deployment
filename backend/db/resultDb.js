const mongoose = require('mongoose');

// (Schema) de la base de donner des resultat de la feullie de pointage d'un employer

const resSchema=new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
        ref:"employers",
    },
    T:Number,
    R:Number,
    1:Number,
    I:Number,
    2:Number,
    M:Number,
    A:Number,
    6:Number,
    7:Number,
    8:Number,
    9:Number,
    C:Number,
    Cr:Number,
    Indemnité_Route:String,
    Kilometrage:String,
    Nuisances:String,
    CR_Avec_IZCV:String,
    CR_Sans_IZCV:String,
    Autre_ZONE:String,

});

const resModel=mongoose.model('results',resSchema);

module.exports ={resModel}