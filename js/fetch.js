const CRYPTO_IDS = 'bitcoin,ethereum,tether,bnb';
const apiUrl = `https://api.coincap.io/v2/assets?ids=${CRYPTO_IDS}`;

async function fetchCryptoPrices() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        const formatNumber = (number, decimals = 2) => `$${parseFloat(number).toFixed(decimals)}`;

        const updateElement = (id, value, decimals = 2) => {
            document.getElementById(id).textContent = formatNumber(value, decimals);
        };

        const bitcoin = data.data[0];
        updateElement('BNBprice', bitcoin.priceUsd, 3);
        updateElement('onehourchangebnb', bitcoin.changePercent24Hr / 24);
        updateElement('24hourchangebnb', bitcoin.changePercent24Hr);
        updateElement('marketcapbnb', bitcoin.marketCapUsd, 1);
        updateElement('volume24hbnb', bitcoin.volumeUsd24Hr, 1);
        updateElement('supplybnb', bitcoin.supply, 1);

        const ethereum = data.data[1];
        updateElement('ethereumPrice', ethereum.priceUsd, 3);
        updateElement('ethereum24h', ethereum.changePercent24Hr);
        updateElement('ethereum1h', ethereum.changePercent24Hr / 24);
        updateElement('marketcapeth', ethereum.marketCapUsd, 1);
        updateElement('volume24heth', ethereum.volumeUsd24Hr, 1);
        updateElement('supplyeth', ethereum.supply, 1);

        const tether = data.data[2];
        updateElement('tetherprice', tether.priceUsd, 3);
        updateElement('tether24h', tether.changePercent24Hr);
        updateElement('tether1h', tether.changePercent24Hr / 24);
        updateElement('marketcapth', tether.marketCapUsd, 1);
        updateElement('volume24hth', tether.volumeUsd24Hr, 1);
        updateElement('supplyth', tether.supply, 1);

        const bnb = data.data[3];
        updateElement('bitcoinPrice', bnb.priceUsd, 3);
        updateElement('onehourchange', bnb.changePercent24Hr / 24);
        updateElement('marketcapbtc', bnb.marketCapUsd, 1);
        updateElement('24hourchange', bnb.changePercent24Hr);
        updateElement('volume24hrbtc', bnb.volumeUsd24Hr, 1);
        updateElement('supplybtc', bnb.supply, 1);

    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
}


setTimeout(async function updateCryptoPrices() {
    await fetchCryptoPrices();
    setTimeout(updateCryptoPrices, 5000);
}, 0);


fetchCryptoPrices();
