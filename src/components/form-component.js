import React, {useState,useEffect} from 'react';
import CardComponent from './card-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCardType } from '../utils/cardTypes';
import { tSExpressionWithTypeArguments } from '@babel/types';
import CvvComponent from './cvv-component';


export default function FormComponent (props) {
    const years = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
    const [cardNumber, setCardNumber] = useState(["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]);
    const [cardHolder, setCardHolder] = useState("AD SOYAD")
    const [card, setCard] = useState("Visa")
    const [date, setDate] = useState("MM/YY")
    const [Cvv,setCvv] = useState("")
    const [focus, setFocus] = useState("");
    var number = React.createRef();
    var name = React.createRef();
    var month = React.createRef();
    var year = React.createRef();
    var cvv = React.createRef();

    function animateCSS (element, animation, prefix = 'animate__'){
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
}
    
    function changeNumber(event){
        let num = number.current.value;
        num =num.replace(/ /g, "");
        if (((num.length) % 4 == 0 && num.length > 0 ) && num.length !== 16 ){
            number.current.value = String(number.current.value+" ")
        }
        var payCardType = "";
    var regexMap = [
      {regEx: /^4[0-9]{5}/ig,cardType: "VISA"},
      {regEx: /^5[1-5][0-9]{4}/ig,cardType: "MASTERCARD"},
      {regEx: /^3[47][0-9]{3}/ig,cardType: "AMEX"},
      {regEx: /^(5[06-8]\d{4}|6\d{5})/ig,cardType: "MAESTRO"}
    ];
    
    for (var j = 0; j < regexMap.length; j++) {
      if (num.match(regexMap[j].regEx)) {
        payCardType = regexMap[j].cardType;
        break;
      }
    }
    console.log(payCardType)
        if (payCardType){
            setCard(payCardType)
        }else{
            setCard("Visa")
        }
        let def = ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]
        
        num?.split('').map((value,index) => {

            def[index] = value
        })
        setCardNumber(def)
    }
    function changeName(event){
        let currName = name.current.value;
        setCardHolder(currName)
    }
    function changeMonth(event){
        let currMonth = month.current.value.split("");
        let currDate =date.split("");
        currDate[0] = currMonth[0]
        currDate[1]= currMonth[1]
        setDate(currDate.join().replace (/,/g, ""))
    }

    function changeYear(event){
        let currYear = year.current.value.split("");
        let currDate = date.split("");
        currDate[3] = currYear[2]
        currDate[4]= currYear[3]
        setDate(currDate.join().replace (/,/g, ""))
    }
    function changeCvv(){
        let currName = cvv.current.value;
        setCvv(currName)
    }


    function submit(flag,event){
        if (flag){
        toast.success('Submitted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
    }


    return <div className="contatiner" data-component="form-component">
         <div className="credit-card"><div className="shadow" id="cardCvv">{focus === "cvv" ?<CvvComponent cardNumber={cardNumber} cardHolder={cardHolder} card={card} date={date} focus={focus} cvv={Cvv}/> : <CardComponent cardNumber={cardNumber} cardHolder={cardHolder} card={card} date={date} focus={focus}/>}</div></div>
        
        <div className="d-flex justify-content-center form-main ">

            <div className="card w-50">
            <div class="card-body mar-top">
                <div>
                <span className="label">Card Number</span>
                <input class="form-control form-control-lg" type="text" ref={number} onChange={ev => changeNumber(ev)} maxLength="19" onFocus={ev => { 
                                if (focus === "cvv"){
                                   let element = document.getElementById("cardCvv")
                                   animateCSS(element, "flipInY")
                                }
                                setFocus("number")
                                                                                                                                                            }}/>
                </div>
                <div className="mt-4">
                <span className="label">Card Name</span>
                <input class="form-control form-control-lg" type="text" ref={name} onChange={ev => changeName(ev)} onFocus={ev =>{if (focus === "cvv"){
                                   let element = document.getElementById("cardCvv")
                                   animateCSS(element, "flipInY")
                                } setFocus("name")}}/>
                </div>
                <div className="row mt-4">
                    <div className="col-9 ">
                    <span className="label">Expiration Date</span>
                    <div className="d-flex">
                    <div className="form-control form-control-lg months" onClick={ev =>{if (focus === "cvv"){
                                   let element = document.getElementById("cardCvv")
                                   animateCSS(element, "flipInY")
                                } setFocus("date")}}>
                    <select className="select" onChange={ev => changeMonth(ev)} ref={month} onFocus={ev =>{if (focus === "cvv"){
                                   let element = document.getElementById("cardCvv")
                                   animateCSS(element, "flipInY")
                                } setFocus("date")}}>
                    <option disabled>Month</option>
  <option value="01">01</option>
  <option value="02">02</option>
  <option value="03">03</option>
  <option value="04">04</option>
  <option value="05">05</option>
  <option value="06">06</option>
  <option value="07">07</option>
  <option value="08">08</option>
  <option value="09">09</option>
  <option value="10">10</option>
  <option value="11">11</option>
  <option value="12">12</option>
</select>
                    </div>
                    <div className="form-control form-control-lg months" onClick={ev =>{if (focus === "cvv"){
                                   let element = document.getElementById("cardCvv")
                                   animateCSS(element, "flipInY")
                                } setFocus("date")}}>
                    <select className="select" onChange={ev => changeYear(ev)} ref={year} onFocus={ev => {if (focus === "cvv"){
                                   let element = document.getElementById("cardCvv")
                                   animateCSS(element, "flipInY")
                                }setFocus("date")}}>
                        <option disabled>Year</option>
                        {years.map(value => {
                            return <option value={value}>{value}</option>
                        })

                        }
                        </select>
                    </div>
                    </div>
                    </div>
                    <div className="col-3">
                        <div>
                            <span className="lable">CVV</span>
                            <input className="form-control form-control-lg" maxLength="4" type="text" pattern="\d*" ref={cvv} onInput={ev => changeCvv(ev)} onFocus={ev => {if (focus !== "cvv"){
                                   let element = document.getElementById("cardCvv")
                                   animateCSS(element, "flipInY")
                                }setFocus("cvv")}}></input>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary btn-lg w-100 mt-4" onClick={ev => submit(true,ev)}>
                        Submit
                </button>
             </div>
            </div>
        </div>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
    </div>
}

