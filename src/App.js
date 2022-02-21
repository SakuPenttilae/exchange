import { useState } from 'react';
import './App.css';

const API = "http://api.exchangeratesapi.io/v1/latest?access_key=" 
const API_KEY = "2d7e3429744207acacb5c702df401ea4&format=1"
function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);
  
  async function convert(e) {
    e.preventDefault();

    const ADDRESS = API + API_KEY
    fetch(ADDRESS)
    .then(response => response.json())
    .then(data => {
      console.log(data['rates'])
      let GBP = data['rates']['GBP']
      setRate(GBP)
      
      setGbp(eur * GBP)
      }
    )
    .catch(error => (
      console.log(error)
      )
    );

  /*  try {
      const address = URL + API_KEY
      const response = await fetch(address)
      
      if (response.ok) {
        console.log(response.rates)
        const json = await response.json()
        console.log(json.rates.GBP)
        setRate(json.rates.GBP)

        setGbp(eur * json.rates.GBP)
      } else {
        alert('Error retrieving exchange rate.')
        console.log(response)
      } 
    } catch (err) {
        alert(err)
    }*/
  }

  return (
    <div id="container">
      <h1>Eur to GBP conversion</h1>
      <form onSubmit={convert}>
        <div>
          <label>Eur</label>
          <input type="number" step="0.01" value={eur} onChange= {e => setEur(e.target.value)}/>
          <p>Exchange rate <output>{rate}</output> </p>
        </div>
        <div>
          <label>GBP </label>
          <output>{gbp.toFixed(2)}£</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
      
    </div>
  );
}

export default App;
