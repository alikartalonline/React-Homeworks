import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Todo from './index'

describe("Todo testleri", () => {
    let button, input;

    beforeEach( () => {
        render(<Todo />);

        button = screen.getByText("Add");
        input = screen.getByLabelText("Text");
    });

test("Varsayilen olarak verilen 3 nesne render edilmelü", () => {
    const items = screen.getAllByText(/Item/i);
    // Item A-B-C'yi nasıl bulabilirim? Item ile başlayanlar diye bulabilirim
    
    expect(items.length).toEqual(3);
    // items'ın length'i eşit olmalı 3'e (çünkü 3 eleman hazır geliyor ya)
});

test("Input ve button dokumanda bulunmali!", () => {
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
});

test("Input'a string girilip, butona basılınca, listeye eklenmeli", () => {
    
    // inputu doldur (ben test aşamasında mehmet yazdırıyorum)
    const name = "Mehmet"; 
    userEvent.type(input, name);
    //type(hangi inputa yazacaksın, ne yazacaksın) şeklinde iki parametre alıyor


    // butona tıkla
    userEvent.click(button); // button = screen.getByText("Add");

    // assertion = kontrol edeceğiz, 
    // bekleyeceğiz, bir şeylerin olmasını bekleyeceğiz, 
    // listede yeni bir eleman daha olmasını bekliyoruz,
    // ayrıca o elemanın da "mehmet" olmasını bekliyoruz
    expect(screen.getByText(name)).toBeInTheDocument();
});


});














