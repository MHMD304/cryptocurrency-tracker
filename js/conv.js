let rate1 = document.querySelector(".convrate1");
let rate2 = document.querySelector(".convrate2");
let resultBtn = document.querySelector(".convres");
let selects = document.querySelectorAll(".convoptions select");
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll(".convinput input");
let inpt1 = inputs[0];
let inpt2 = inputs[1];

let rates = {};

//let requestURL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,ripple,dogecoin,cardano,polkadot,stellar,eos,chainlink&vs_currencies=usd";

fetchRates();

async function fetchRates() {
    try {
        let res = await fetch(requestURL);
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }
        let data = await res.json();
        rates = data;
        populateOptions();
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        rates = { USD: { usd: 1 }, BTC: { usd:  42756.58 }, ETH: { usd: 3123.45 },SOL: {usd: 150.20},USDT: {usd: 1},BNB: {usd: 303.76},ADA:{usd:2.14},XRP:{usd:1.05},DOT:{usd:27.89},LTC:{usd:155.72},BCH:{usd:526.80},LINK:{usd:29.17},XLM:{usd:0.33},MATIC:{usd:1.05}}; // Set default rates as an example
        populateOptions();
    }
}

function populateOptions() {
    let val = "";
    Object.keys(rates).forEach((code) => {
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    });
    selects.forEach((s) => (s.innerHTML = val));
    displayRate();
}

function convert(val, fromCurr, toCurr) {
    const fromCurrToUSD = rates[fromCurr]?.usd;
    const toCurrToUSD = rates[toCurr]?.usd;

    if (fromCurrToUSD && toCurrToUSD) {
        // Convert value to USD first, then from USD to the desired currency
        const valInUSD = val * fromCurrToUSD;
        const convertedVal = valInUSD / toCurrToUSD;
        const roundedVal = convertedVal.toFixed(5);
        return roundedVal;
    } else {
        console.error("Currency rates not available");
        return "N/A";
    }
}


function displayRate() {
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1, v1, v2);

    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;
}

resultBtn.addEventListener("click", () => {
    let fromCurr = sel1.value;
    let fromVal = parseFloat(inpt1.value);
    let toCurr = sel2.value;

    if (isNaN(fromVal)) {
        alert("Enter a Number");
    } else {
        let cVal = convert(fromVal, fromCurr, toCurr);
        inpt2.value = cVal;
    }
});

selects.forEach((s) => s.addEventListener("change", displayRate));

document.querySelector(".swap").addEventListener("click", () => {
    let in1 = inpt1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inpt2.value = in1;
    inpt1.value = in2;

    sel2.value = op1;
    sel1.value = op2;

    displayRate();
});
