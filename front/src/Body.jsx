import React, { useContext } from 'react';
import { EmployerContext } from './Header';
import Tab from './tab'


// dans ce components on a remplir les informations de l'employer choisir dans le component Header

export default function Body() {
  const DetailsEmployer  = useContext(EmployerContext); // L'utilisation de useContext
  const currentDate=new Date();
  const Year=currentDate.getFullYear();

  
  return (
    <div>  
      
      {DetailsEmployer && (
      
        <div className='cadre'>
            <h1>Feuille de Pointage</h1>
             <h2>Anne:{Year}</h2>
            <div className='Inputs'>
              
    <div className='colone-gauche'>
          <label>
            Nom:
         <input type="text" readOnly value={DetailsEmployer.nom} className='info-input' />
         </label>

          <label >
            Prenom:
         <input type="text" readOnly value={DetailsEmployer.prenom} className='info-input' />
         </label>

          <label >
            Matricule:
         <input type="text" readOnly value={DetailsEmployer.matricule} className='info-input' />
         </label>

          <label >
            address:
         <input type="text" readOnly value={DetailsEmployer.adresse} className='info-input' />
         </label>

          <label >
            Fonction:
         <input type="text" readOnly value={DetailsEmployer.fonction} className='info-input' />
         </label>

         </div>

<div className="colone-droit">
          <label >
            Date-Recrutement:
            <input type="text" readOnly value={DetailsEmployer.date_recrutement} className='info-input' />

         </label>

          <label >
            Date-Detache:
         <input type="text" readOnly value={DetailsEmployer.date_detache} className='info-input' />
         </label>

          <label >
            Sit-Familiale:
         <input type="text" readOnly value={DetailsEmployer.situation_familiale} className='info-input' />
         </label>

          <label >
            Affect-Origin:
         <input type="text" readOnly value={DetailsEmployer.affect_origin} className='info-input' />
         </label>

          <label >
            Nbr-Enf:
         <input type="text" readOnly value={DetailsEmployer.nbr_enfant} className='info-input' />
         </label>

         </div>

         </div> 



         {/* passer des prop pour utiliser dans le component Tab */}

<Tab id={DetailsEmployer._id} nom={DetailsEmployer.nom} prenom={DetailsEmployer.prenom}/>


        </div>
      )}
    </div>
  );
}
