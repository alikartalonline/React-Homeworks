import { useState } from 'react';

function List( {contacts} ) {

    const [filterText, setFilterText] = useState("");

    const filtered = contacts.filter((item) => {
        return Object.keys(item).some((key) => 
            item[key].toString().toLowerCase().includes(filterText.toLocaleLowerCase())
        )
    })

// console.log("filtered:",filtered)
  return ( 
            <div>

                <input 
                placeholder="Search"
                value={filterText}
                onChange={ (e) => setFilterText(e.target.value) } />

                <ul className="list" >
                    {
                    filtered.map( (contact, i)  => (
                        <li key={i}>
                            <span>{contact.fullname}</span>
                            <span>{contact.phone_number}</span>
                        </li>
                     ))}
                </ul>
                <hr />

                <h3 className="total">Total Contacts: {filtered.length}</h3>

            </div>
         );
}

export default List;


// Her map kullandığımızda, her listeleme yaptığımızda buradaki "key" numarasını kullanmak olacak.
// Listeleme elemanının en dışındaki etikete vermek suretiyle!

// contact.filter(item) => item nedir? Array'in her bir elemanı, her döndüğü elemanı bize verecek demek
// filtered içinde bir return işlemi yapıyorum, burada, filtrelemeyi yaparken dikkat etmemiz gereken şey; ismini de yazsa, numarasını da yazmaya başlasa, onu bizim göstermemiz lazım kullanıcıya, dolayısıyla Object.key() 'den yararlanacağız
// Object.keys(item) => item'ın keylerini aldım. 
// Key'leri nedir? fullname ve phone_number
// sonra .some() metodunu kullanıyorum, ne yapıyor bu? Yani herhangi biri demek, herhangi biri eğer şarta uyuyorsa true dönüyor ve biz o kaydı kullanabiliriz anlamına geliyor
// item[key] nedir? => item.fullname gibi düşünebiliriz bunu!
// includes() ile bizim elimizde bir filterText'i vardı ya, işte bu filterText onun içinde var mı, o value'nin içinde var mı, yok mu anlamayaca çalışacağız


