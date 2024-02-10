const mongoose = require('mongoose');


// (Schema) de la base de donner des employers

const employerSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    fonction: String,
    adresse: String,
    matricule: Number, 
    date_recrutement: Date,
    date_detache: Date,
    affect_origin: String, 
    situation_familiale: {
      type: String,
      enum: ['marie', 'divorce', 'celibataire'],  
    },
    nbr_enfant: Number,
  });

const employerModel=mongoose.model('employers',employerSchema);

module.exports={employerModel}