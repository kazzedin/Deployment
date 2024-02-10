const express = require('express');
const app=express();
const mongoose=require('mongoose');
const cors =require('cors');
const {employerModel}=require('./db/userDb.js');
const {resModel}=require('./db/resultDb.js');
require('dotenv').config();

app.use(express.json());
app.use(cors());

/* conexion avec la base de donner */ 
mongoose.connect(process.env.MONGO_URL) //PetroMag cest le nom de la base de donner

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


/*get request de la page home de server*/
app.get('/',(req,res)=>{
    res.send("hello world");
})

//get request pour avoir tout les employers dans le cas on clique sur le button (employer)
app.get('/employer',(req,res)=>{
    employerModel.find()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

// get request pour extraire lemployer qui porte un id specefique pour afficher ces infomarion dans les inputs fields
app.get('/employer/:id',(req,res)=>{
    const id=req.params.id;
    employerModel.findById({_id:id})
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})



//Post request pour stocker les resultat de la feullie apres le remplicage
app.post('/Result', (req, res) => {
    const { id, T, R, I, M, A, C, Cr, Indemnité_Route, Kilometrage, Nuisances, CR_Avec_IZCV, CR_Sans_IZCV, Autre_ZONE } = req.body;
    const _1 = req.body['1'];
    const _2 = req.body['2'];
    const _6 = req.body['6'];
    const _7 = req.body['7'];
    const _8 = req.body['8'];
    const _9 = req.body['9'];
    
    employerModel.findById({ _id: id })
        .then(user1 => {
            if (user1) {
                resModel.findById({ _id: id})
                .then(user2=>{
                    if(user2){
                        res.json("Resultat deja Exister")
                    }else{
                        resModel.create({
                            _id: id,
                            T: T,
                            R: R,
                            1: _1,
                            I: I,
                            2: _2,
                            M: M,
                            A: A,
                            6: _6,
                            7: _7,
                            8: _8,
                            9: _9,
                            C: C,
                            Cr: Cr,
                            Indemnité_Route: Indemnité_Route,
                            Kilometrage: Kilometrage,
                            Nuisances: Nuisances,
                            CR_Avec_IZCV: CR_Avec_IZCV,
                            CR_Sans_IZCV: CR_Sans_IZCV,
                            Autre_ZONE: Autre_ZONE,
                        })
                        .then(createdResult => {
                            res.json("Success"); // Envoyer une réponse de succès
                        })
                        .catch(err => {
                            res.status(500).json("Erreur lors de la création du document"); // Gérer l'erreur de création
                        });
                    }
                })
                .catch(err=>res.status.json('Error !!!!'))
                
            } else {
                res.status(404).json("NOT Found!!!!"); // Gérer le cas où l'utilisateur n'est pas trouvé
            }
        })
        .catch(err => {
            res.status(500).json("Erreur lors de la recherche de l'utilisateur"); // Gérer l'erreur de recherche de l'utilisateur
        });
});

 


app.listen(process.env.PORT,()=>{
    console.log(`listening on port http://localhost:${process.env.PORT}`);
})