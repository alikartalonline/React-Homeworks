import React, { useEffect, useState } from 'react';
import axios from "axios"; 
import moment from'moment';


function Result() {

    const [conracts, setConracts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const startDate = "2022-04-03"
    const endDate = "2022-04-03"


    useEffect( () => {
        axios(`https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=${endDate}&startDate=${startDate}`)
        .then((res) => setConracts(res.data.body.intraDayTradeHistoryList))
        .catch(e => console.log("error:",e))
        .finally(() => setIsLoading(false))
    }, []);


  return (
    <div>
        <h2>Örnek sonuç tablosu</h2>

        <table border="1" >
            <tbody>
                <tr className='titles'>
                    <td>Tarih</td>
                    <td>Toplam İşlem Miktarı (MWh)</td>
                    <td>Toplam İşlem Tutarı (TL)</td>
                    <td>Ağırlıklı Ortalama Fiyat (TL/MWh)</td>
                </tr>
                
                {
                isLoading && 
                <tr className='tr' >
                    <td> ... </td>
                    <td> ... </td>
                    <td> ... </td>
                    <td> ... </td>
                </tr>
                }


                {conracts.map((item, key) => (
                    <tr key={key} className='tr'>
                        <td>{moment(item.date).format("DD.MM.YYYY hh:mm")}</td>
                        <td>{item.quantity/10}</td>
                        <td>{(item.price * item.quantity)/10}</td>
                        <td>{((item.price * item.quantity)/10) / (item.quantity/10)}</td>
                    </tr>     
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default Result;