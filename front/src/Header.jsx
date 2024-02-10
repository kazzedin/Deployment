import React,{useState,createContext} from 'react'
import axios from 'axios';
import Body from './Body.jsx'
require('dotenv').config();

export const EmployerContext=createContext(null) // ici on a utiliser createContext pour pouvoire passer des information utile a d'autre components dans ce cas on a passer pour Body

export default function Header() {

const [employer,setEmployer]=useState([]);// state pour sauvgarder les employers
const [SelectedEmployer,setSelectedEmployer]=useState(true);// jai utiliser sa pour pouvoir manipuler l'pparution de contenaire qui porte les employer 
const [DetailsEmployer,setDetailsEmployer]=useState([]);// state pour sauvgarder les donner specifique a un seul employer


// afficher les employer dans le cas ou on clique sur le button employer
const Handelbt = (e) => {
  e.preventDefault();
  setSelectedEmployer(false);
  axios.get(process.env.BACKEND_URL+'/employer')//get request
  .then((res) => {
    console.log(res)
    setEmployer(res.data);
  })
  .catch((err) => {
    console.log(err)
  });
  };
 
 // dans le cas de choisir un employer parmi la liste des employer  pour choisir un employer specifique 
  const HandelEmployer=(id)=>{
    setSelectedEmployer(true)
    axios.get(process.env.BACKEND_URL+`/employer/${id}`)
    .then(res=>{
      console.log(res)
    setDetailsEmployer(res.data)
    }
    )
    .catch(err=>console.log(err))
  }


  return (
    <div>
        <header>
            <div className='header'>
            <div className='employer'>
    
             <button onClick={Handelbt} className='bt_affichage'>employer</button>
             <div className={SelectedEmployer ? 'dis_container':'container'}>
               {employer ?
                employer.map((employer,id)=>(
                  
                    <div className='selected_emp' key={id} onClick={()=>HandelEmployer(employer._id)} >
                        <p>Nom:{employer.nom}</p>
                        <p>Prenom:{employer.prenom}</p>
                        <br />
                    </div>  
                ))
               : <h3>Loading....</h3> } 
             </div>
    
             </div>
    
            </div>
           
        </header>

        {/* a ce point on transmit les donner de employer choisit parmi les employer vers le component body */}
         <EmployerContext.Provider value={DetailsEmployer}>
          <Body/>
        </EmployerContext.Provider> 
       
       
    </div>

   
    )

 
  
}





