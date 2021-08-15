import React, {useState,useEffect} from 'react';
import chip from '../public/assets/images/chip.png';
import visa from '../public/assets/images/visa.png';
import amex from '../public/assets/images/amex.png';
import dinersclub from '../public/assets/images/dinersclub.png';
import discover from '../public/assets/images/discover.png';
import jcb from '../public/assets/images/jcb.png';
import mastercard from '../public/assets/images/mastercard.png';
import troy from '../public/assets/images/troy.png';
import unionpay from '../public/assets/images/unionpay.png';


export default function CardComponent(props) {
    const [cardNumber, setCardNumber] = useState(["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]);
    const [cardHolder, setCardHolder] = useState("AD SOYAD")
    const [card, setCard] = useState("Visa")
    const [date, setDate] = useState("MM/YY")
    const [focus, setFocus] = useState("");


    function getCard() {
        switch(card.toLowerCase()) {
            case "visa": 
                return visa;
            case "amex": 
                return amex;
            case "diners": 
                return dinersclub;
            case "jcb": 
                return jcb;
            case "discover": 
                return discover;
            case "mastercard":
                return mastercard;
            case "troy":
                return troy;
            case "unipay":
                return unionpay;
            default:
                return visa;
        }
    }

    useEffect(() => {
        setCardNumber(props.cardNumber)
        setCardHolder(props.cardHolder)
        if (props.cardHolder == ""){
            setCardHolder("AD SOYAD")
        }
        setCard(props.card)
        setDate(props.date)
        setFocus(props.focus)
      });

    return (
        <div className="container d-flex justify-content-center p-0" data-component="card-component">
            <div className="card-main">
                <div className="row">
                        <div className="col-6">
                            <div className="float-left">
                                    <img src={chip} className="chip"></img>
                            </div>
                        </div>
                        <div className="col-6">
                                <div className="float-right">
                                    <img src={getCard()} className="card-name"></img>
                                </div>
                        </div>
                    </div>
                <div className="row mt-5 mar2">
                    <div className={focus === "number" ? "d-flex focused wi" : "d-flex"}>
                        {cardNumber.map((value,index) => {
                            if (index === 0){
                                return <div className="card-num mar2">{value}</div>
                            }
                            else if (index % 4 !== 0){
                               return <div className="card-num">{value}</div>
                            }else{
                               return <div className="card-num mar">{value}</div>
                            }
                        })}
                    </div>
                </div>
                <div className="row mt-5 mar2">
                    <div className={focus === "name" ? "col-8 focused" : "col-8"}>
                            <div className="row">
                                <div className="lable mar2">
                                    Card Holder
                                </div>
                            </div>
                            <div className="row">
                                <div className="d-flex mar2">
                                {cardHolder.split('').map(value => {
                                    if (value !== " "){
                                        return <div className="card-holder">{value.toUpperCase()}</div>
                                    }else{
                                        return <div className="mar2">&nbsp;</div>
                                    }
                                })} 
                                </div>    
                            </div>
                        </div>
                    <div className={focus === "date" ? "col-4 focused w" : "col-4"}>
                        <div className="row">
                                <div className="lable mar2">
                                    Expires
                                </div>
                        </div>
                        <div className="row">
                                <div className="d-flex mar2">
                                {date.split('').map(value => {
                                    if (value !== " "){
                                        return <div className="card-holder">{value.toUpperCase()}</div>
                                    }else{
                                        return <div className="mar2">&nbsp;</div>
                                    }
                                })} 
                                </div>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    )
}