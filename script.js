/* **

LINK TO GITHUB ACCOUNT WHERE ER GET OUR BASE_URL:
https://github.com/fawazahmed0/exchange-api/blob/main/README.md

** */



const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () =>{
    updateExchangeRate();
})


// for(code in countryList)
// {
//     console.log(code,countryList[code]);
// }
for (let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOptions = document.createElement("option");
        newOptions.innerText= currCode;
        newOptions.value= currCode;

        /*  DEFAULT SELETION  */
        if(select.name==="from" &&  currCode ==="USD")
        {
            newOptions.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR")
            {
                newOptions.selected = "selected";
            }
        select.append(newOptions);
    }

    //TO CALL UPDATE FLAG LOGO CHNAGE METHOD ON CHNAGE WITH OPTIONS
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

/*  TO HCNAGE FLAG LOGO */
const updateFlag =(element) => { /*element = select class vala div */

//     // to get which select box is change
//     console.log(element);

//BY THIS WE GET THE PARTICULAR OPTION:
    let currCode = element.value;
    //console.log(currCode);

//to get the country name:
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
 }

 btn.addEventListener("click",  (evt) => {
    //to stop the default behaviour of form like reload etc.
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () =>
{
    let amount =document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal === "" || amtVal < 1)
    {
        //this will auto reset to 1 when their is empty block or input is less then 1
        amtVal = 1;
        amount.value = 1;
    }
    //console.log(fromCurr.value, toCurr.value, amtVal);

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  //console.log(data);

  let allRate = data[fromCurr.value.toLowerCase()];
  //console.log(allRate);

  let rate =allRate[toCurr.value.toLowerCase()];
  console.log(rate);

  let finalAmount = amtVal*rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}