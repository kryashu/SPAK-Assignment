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

export default function CvvComponent(props) {
    const [card, setCard] = useState("Visa")
    const [cvv, setCvv] = useState("")


    function getCard() {
        switch(card) {
            case "Visa": 
                return visa;
            case "Amex": 
                return amex;
            case "Diners": 
                return dinersclub;
            case "Jcb": 
                return jcb;
            case "Discover": 
                return discover;
            case "Mastercard":
                return mastercard;
            case "Troy":
                return troy;
            case "Unipay":
                return unionpay;
            default:
                return visa;
        }
    }

    useEffect(() => {
        setCvv(props.cvv)
        setCard(props.card)
      });

    return (
        <div className="container d-flex justify-content-center p-0" data-component="card-component">
            <div className="card-main">
                <div className="row d-flex justify-content-center">
                        <div className="background-black">
                        &nbsp;
                        </div>
                    </div>
                <div className="row d-flex justify-content-center">
                   <div className="col-10 background-white ">
                        <span className="cvv">{cvv}</span>
                   </div>
                </div>
               <div className="w-100 mt-5">
               <div className="float-right">
                                    <img src={getCard()} className="img"></img>
                </div>
               </div>
            </div>
        </div>
    )
}