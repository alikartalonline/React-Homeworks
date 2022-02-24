import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// '@testing-library/react' adında bir kütüphane var
// bunun altında da render ve screen tanımları geliyor
// render: Herhangi bir component'i render edebiliyoru
// screen:  Herhangi bir nesneyi yakalayabiliyor
// Örnek: screen.getByText(id'si şu olan şeyi bul gibi)

import Counter from './index'
// Counter component'ini render edeceğimiz için çağıralım

/*
// test() de yazabilirsin it() de yazabilirsin ikisi de aynı 
test("increase btn", () => {

   render(<Counter />); // Counter componentini render ettim

   const count = screen.getByText("0"); // count'un değerini alalım
   // içinde 0 yazan tanımı(elementi) bul dedim (Bunu id ile de yakalayabiliriz)

   const increaseBtn = screen.getByText("Increase"); // Şu an ben increase butonunu seçtim ve üzerinde işlemler yaptıracağım

   userEvent.click(increaseBtn); // increase butonuna tıklattıracağım

   // Şimdi butona bastım ne olmasını bekliyorum, onu belirleyeceğim
   expect(count).toHaveTextContent("1");
   // toHaveTextContent = şu content'e sahip olmalı diyoruz (count'un)

});

// Şimdi bir de Decrease butonu için yapacağım o yüzden üstteki test()'i aynen kopyalayacağım:

test("decrease btn", () => {

    render(<Counter />); // Counter componentini render ettim
 
    const count = screen.getByText("0"); // count'un değerini alalım
    const decreaseBtn = screen.getByText("Decrease"); 
 
    userEvent.click(decreaseBtn); // Decrease butonuna tıklattıracağım
    expect(count).toHaveTextContent("-1");
 
 });
*/


 // test tanımlarını daha derli toplu olarak şöyle yazabilirim:
// mesela const count = screen.getByText("0"); 
// tek tek tanımlanmaya calısılmıs, iki ayrı yerde aynı ifade yazılmıs falan


describe('Counter Tests', () => {

let increaseBtn, decreaseBtn, count;

    beforeEach(() => {
        render(<Counter />);
        increaseBtn = screen.getByText("Increase"); 
        decreaseBtn = screen.getByText("Decrease"); 
        count = screen.getByText("0"); 


    })
// beforeEach: her biri çalışmadan önce bir şeyler yap demek
// aşağıdaki her test kodundan önce yukarıyı çalıştıracak
// Yani önce yukarıyı çalıştırıp sonra increase btn'yi,
// Sonra tekrar yukarıyı çalıştırıp sonra decrease btn'yi çalıştıracak

// beforeAll() = tüm testlerden önce(!) bir defaya mahsus çalışıyor ve sonra çalışmıyor
beforeAll(() => {
    console.log("Bir kere çalışacağım!")
})
//npm test ile görebilirsün

// afterEach() = Her testten sonra çalıştırmak isteyeceğiniz bir şeyler var ise..
afterEach(() => {
    console.log("her testtten sonra çalışacağım!")
})
// Not: beforeEach'de eklediğiniz bir şeyi afterEach'de tekrar kaldırmak istediğimiz durumlarda kullanabiliriz

// afterAll() = her şeyden sonra çalışıyor
afterAll(() => {
    console.log("en son bir kere çalışacağım!")
})

    test("increase btn", () => {
        userEvent.click(increaseBtn);
        expect(count).toHaveTextContent("1");
     });

     test("decrease btn", () => {
        userEvent.click(decreaseBtn); 
        expect(count).toHaveTextContent("-1");
     });

});

