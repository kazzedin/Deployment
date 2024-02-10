import React, { useState } from 'react';
import axios from 'axios';


export default function Tab(props) {


  // tableau des mois 
  const mois = [
    { nom: 'Janvier', jours: 31 },
    { nom: 'Février', jours: 31 },
    { nom: 'Mars', jours: 31 },
    { nom: 'Avril', jours: 31 },
    { nom: 'Mai', jours: 31 },
    { nom: 'Juin', jours: 31 },
    { nom: 'Juillet', jours: 31 },
    { nom: 'Août', jours: 31 },
    { nom: 'Septembre', jours: 31 },
    { nom: 'Octobre', jours: 31 },
    { nom: 'Novembre', jours: 31 },
    { nom: 'Décembre', jours: 31 }
  ];

  // tableau des Colonne supplimentaire T,R,M......(on a mit dans un state pour pouvoir changer les valuer des Code plustard)
  const [colonesSupplementaires, setColoneSupp] = useState([
    { 
      char: 'T', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: 'R', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: '1', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: 'I', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: '2', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: 'M', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: 'A', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: '6', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: '7', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: '8', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: '9', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: 'C', 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    },
    { 
      char: "Cr", 
      valeur: Array.from({ length: 12 }, () => ({ ligne: 0, val: 0 }))
    }
  ]);


   // Tableau pour calculer la somme des characetre dans le tableau(on a mit dans un state pour pouvoir fair des changement sur les valeurs)
   const [somme, setSomme] = useState([
    {lettre:'T',nbr:0},
    {lettre:'R',nbr:0},
    {lettre:'1',nbr:0},
    {lettre:'I',nbr:0},
    {lettre:'2',nbr:0},
    {lettre:'M',nbr:0},
    {lettre:'A',nbr:0},
    {lettre:'6',nbr:0},
    {lettre:'7',nbr:0},
    {lettre:'8',nbr:0},
    {lettre:'9',nbr:0},
    {lettre:'C',nbr:0},
    {lettre:'Cr',nbr:0},
   ]);



// manipuler les inputs et stocker dans un state pour pouvoir stocker dans la base de donne
   const [inputs,setInputs]=useState({});
// la fonction de manipulation des Inputs
   const Handelinputs=(e)=>{
      e.preventDefault();
      const name=e.target.name;
      const value=e.target.value;
      setInputs(values=>({...values,[name]:value}))
   }



// la fonction qui vas changer les valuer des colonnes supplimentaire dans le tableau (incrementer , decrementer)
const HandelChange = (e, indice_ligne) => {
  e.preventDefault();
  const col = [...colonesSupplementaires];
  const nvSomme = [...somme];
  const value = e.target.value;

  switch (value) {
      case 'T':
      case 'R':
      case '1':
      case 'I':
      case '2':
      case 'M':
      case 'A':
      case '6':
      case '7':
      case '8':
      case '9':
      case 'C':
      case "Cr":
          const index = col.findIndex(item => item.char === value);
          col[index].valeur[indice_ligne].val++;
          break;
      case '':
          // Pour la ligne des mois
          col.forEach(item => {
              if (item.valeur[indice_ligne].val > 0) {
                  item.valeur[indice_ligne].val--;
              }
          });

         
          nvSomme.forEach(item => {
              if (item.nbr > 0) {
                  item.nbr--;
              }
          });
          break;
      default:
          alert("Vous avez entré un code invalide");
  }

  setColoneSupp(col);

  if (value !== '') {
      let cpt = nvSomme.findIndex(item => item.lettre === value);
      nvSomme[cpt].nbr++;
      setSomme(nvSomme);
  } else {
      setSomme(nvSomme);
  }
}




// la fonction qui vas sauvgarder la resulta de la feullie dans la base de donne
  const HandelSave=(e)=>{
    e.preventDefault()
   axios.post('https://sever-side.onrender.com/Result',{
    id:props.id,
    T:somme[0].nbr,
    R:somme[1].nbr,
    1:somme[2].nbr,
    I:somme[3].nbr,
    2:somme[4].nbr,
    M:somme[5].nbr,
    A:somme[6].nbr,
    6:somme[7].nbr,
    7:somme[8].nbr,
    8:somme[9].nbr,
    9:somme[10].nbr,
    C:somme[11].nbr,
    Cr:somme[12].nbr,
    Indemnité_Route:inputs.Indemnité_Route,
    Kilometrage:inputs.Kilometrage,
    Nuisances:inputs.Nuisances,
    CR_Avec_IZCV:inputs.CR_Avec_IZCV,
    CR_Sans_IZCV:inputs.CR_Sans_IZCV,
    Autre_ZONE:inputs.Autre_ZONE,

   })
   .then(res=>{
    if(res.data=="Success"){
      alert(`Vous avez sauvgarder les informations pour lutilisateur ${props.nom}---${props.prenom}`)
    }
    else{
      alert("error!!!!")
      console.log(res)
    }
   })
   .catch(err=>console.log(err))
    
      }
  



  return (
    <div className='tableau'>
      {/* le tableau principale */}
      <table className="tab">
        <thead>
          <tr>
            <th>Mois</th>
            {[...Array(31).keys()].map(day => (
              <th key={day + 1}>{day + 1}</th>
            ))}
            {colonesSupplementaires.map((col, index) => (
              <th key={index} style={{backgroundColor:'red',color:'white'}}>{col.char}</th>
            ))}
            <th>Observ</th>
          </tr>
        </thead>
        <tbody>
          {mois.map((m, indice_ligne) => (
            <tr key={indice_ligne + 1}>
              <td>{m.nom}</td>
              {[...Array(m.jours).keys()].map((day, indice_colonne) => (
                <td key={indice_colonne + 1}>
                  <input
                    type="text"
                    className='inptab'
                    onChange={(e) => HandelChange(e, indice_ligne)}
                  />
                </td>
              ))}
              {colonesSupplementaires.map((col, index) => (
                <td key={index}>
                  <input 
                    type="text" 
                    className='inptab' 
                    value={col.valeur[indice_ligne].val}  
                  />
                </td>
              ))}
              <td><input type="text" className='inpObserv' /></td>
              
            </tr>
          ))}

         <tr>
        {[...Array(32)].map((_, index) => (
          <td key={index} className='special-td'></td>
        ))}
        {somme.map((item, index) => (
          <td key={index} style={{backgroundColor:'red',color:'white',fontWeight:'bold'}}>
            {item.nbr}
          </td>
        ))}
      </tr>
          
        </tbody>
      </table>
       
       {/* les information supplimentaire  */}
      <div className='info-sup'> 
        <label>
          Indemnité Route :		
          <input type="text" className='inp-sup' name='Indemnité_Route' value={inputs.Indemnité_Route} onChange={Handelinputs}/>
        </label>
        <label>
          Kilometrage :	
          <input type="text" className='inp-sup' name='Kilometrage' value={inputs.Kilometrage} onChange={Handelinputs}/>
        </label>
        <label>
          Nuisances :	
          <input type="text" className='inp-sup' name='Nuisances' value={inputs.Nuisances} onChange={Handelinputs}/>
        </label>
        <label>
          CR Avec IZCV :				
          <input type="text" className='inp-sup' name='CR_Avec_IZCV' value={inputs.CR_Avec_IZCV} onChange={Handelinputs}/>
        </label>
        <label>
          CR Sans IZCV :				
          <input type="text" className='inp-sup' name='CR_Sans_IZCV' value={inputs.CR_Sans_IZCV} onChange={Handelinputs}/>
        </label>
        <label>
          Autre ZONE	:		
          <input type="text" className='inp-sup' name='Autre_ZONE' value={inputs.Autre_ZONE} onChange={Handelinputs}/>
        </label>
      </div>

      {/* le tableau des Dates et Observation */}
      <div className='tab-obs'>
        <table className='tab2'>
          <thead>
            <tr>
              <th className='date'>Dates</th>
              <th className='obs'>OBSERVATION</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5).keys()].map(index => (
              <tr key={index}>
                <td><input type="text" className='inp-dte' /></td>
                <td><input type="text" className='inp-obs' /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* le button pour fair le sauvgarder des information sur les employers */}
      <div className='bt'>
      <button onClick={HandelSave} className='bt_save'>Save</button>
      </div>
    </div>
  );
}
