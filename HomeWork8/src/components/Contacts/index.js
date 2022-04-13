
import { useState, useEffect } from 'react';

import './style.css'

import List from "./List";
import Form from "./Form";

function  Contacts() {
// KUllanıcıların ekleneceği state'i Contacts component'inde tutacağım
// Kayıtlarımın ekelenceği state burada duracak 
    const [contacts, setContacts] = useState([
        {
            fullname: "Ali Kartal",
            phone_number: "123 456 7890"
        },{
            fullname: "Dean Winchester",
            phone_number: "555 555 5555"
        }
        ,{
            fullname: "Lucifer Morningstar",
            phone_number: "666 666 6666"
        }
        ,{
            fullname: "Aleister Crowley",
            phone_number: "888 888 8888"
        }
    ]);
    // array [] olacak çünkü ben birden fazla elemanı burada tutak istiyorum

    useEffect(() => {
        console.log(contacts);
    }, [contacts])

  return (
      
       <div id='container'>
<p className="p"><a className="ref" href="https://github.com/alikartalonline" target="_blank">GitHub</a></p>
           <h1 className="head">Contacts App</h1>
      <List contacts={contacts} />
      <Form addContact={setContacts} contacts={contacts}/>


      </div>
  )
}
//<Form addContact={setContacts} /> deki parametre addContact olabilir, setContacts olabilir tamamen bana kalmış

export default Contacts;

//<List contacts={contacts} /> => yani   const [contacts, setContacts] = useState([]);'e eklenen kayıtları, list'e prop olarak göndermek için yazdık



