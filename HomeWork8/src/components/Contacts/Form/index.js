
import { useState } from 'react';

const initialFormValues = {fullname: "", phone_number: ""}


function Form( {addContact, contacts } ) {
   // console.log(addContact) // Form( {addContact } ) ile tanımı yapacak olan, o atama işlemini yapacak olan fonksiyonu buraya aldım ve console.log diyerek gördüm.
    
    // const [form, setForm] = useState( {fullname: "", phone_number: ""});
    const [form, setForm] = useState(initialFormValues);

    const onChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (form.fullname === '' || form.phone_number === ''){
            //return false; // yazarsam gönder dediğimde bir şey çıkmaz
            return (//console.log("boş girme")
           alert("Lütfen kutucukları boş bırakmayınız :)"))
        }

        addContact([...contacts, form ])
        // console.log(form);

        setForm(initialFormValues)
        // setForm({fullname: '', phone_number: ''})
// inputlara veri girildikten sonra inputları temizlemek için 


    };

  return ( 
      <form onSubmit={onSubmit}>

            <div className="shadowinputs">
                <input 
                name="fullname" 
                placeholder="Full Name" 
                value={form.fullname}
                onChange={onChangeInput} />   
            </div>

            <div id="inputs" className="shadowinputs">
                <input 
                name="phone_number" 
                placeholder="Phone Number" 
                value={form.phone_number}
                onChange={onChangeInput} />
            </div>

            {/* <div className="btn">
                <button> Add </button>
            </div> */}

            <div>
<input className="butoncuk" type="submit" value="Add"></input>
</div>
        </form>
);
}

export default Form;


// inputlara veri girildikten sonra temizlemek için:

// BİRİNCİ YÖNTEM:
// const [form, setForm] = useState( {fullname: "", phone_number: ""});
// dedikten sonra onSubmit bölümüne gidip şu kodu girebiliriz:
// setForm({fullname: '', phone_number: ''})

// İKİNCİ YÖNTEM İSE:
// function form'un üstüne, yani içine değil, üstte boş bir yere 
// const initialFormValues = {fullname: "", phone_number: ""}
// dedikten sonra bunu const [form, setForm] = useState(initialFormValues)
// şeklinde yazıp setForm bölümüne geldikten sonra 
// setForm(initialFormValues) demem yeterli olacaktır

// ÜÇÜNCÜ YÖNTEM İSE:
// Bu setForm işlemini onSubmit ile yapmak istemiyorsam, bunu yan etkileri kullanarak yapmak istiyorsam:
// import { useState, useEffect } from 'react'; -->Buraya useEffect'i dahil ettikten sonra
// function Form 'un altındaki const'un altına şu kodları girebilirim
// useEffect( () => { }, [])
// Diyorum ki function Form( {addContact, contacts } ) bölümündeki contacts değişmiş ise, input'un içini boşalt diyebilirim
// ve setForm işlemini şuraya taşıyabilirim:
// useEffect( () => {setForm(initialFormValues) }, [contacts])







