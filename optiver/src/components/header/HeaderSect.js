
import logoImage from "../../assets/images/download.jpeg";
import PlotGraph from '../plot/PlotGraph';
import React, { useState,useEffect } from 'react';



  

export default function HeaderSect() {
  const [stockId, setStockId] = useState('');
  const [day, setDay] = useState('');
  const [algorithm, setAlgorithm] = useState(0); // Replace with your actual algorithm
  const [train, setTrain] = useState([])
  const [test, setTest] = useState([])
  const [mae, setMAE] = useState('')
  const [error, setError] = useState(false)
  const handleStockIdChange = (e) => {
    setStockId(e.target.value);
    setAlgorithm(0)
    setDay('')
    setMAE('')
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
    setAlgorithm(0)
    setMAE('')
  };

  const fetchDataFromAl1 = (e)=>{
    setAlgorithm(e);
    
  }
  useEffect(() => {
    if (algorithm !== 0) {
      fetchData();
    }
  }, [ algorithm]);
  const fetchData = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/data?stock_id=${stockId}&day=${day}&algorithm=${algorithm}`);
        if (response.status===200) {
          const result = await response.json();
          
          setTrain(result['training']);
          setTest(result['testing'])
          //console.log('train ', train)
          //console.log('test ', test)
          setMAE(result['mae'])
          setError('')
        } else{
          const result = await response.json();
          setError(result['error'])
          setTrain([])
          setMAE('')
          setTest([])
        }
        
      
    } catch (error) {
      setError('Unexpected error occurred')
      setTrain([])
      setMAE('')
      setTest([])
    }
  };
  
  
  return (
    <div>
      <nav className="relative py-3 custom-nav text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <img
              src={logoImage}
              alt="logo"
              className="w-20"
            />
            <div className="flex-1 max-w-xs custom-title">
              Optiver Stock Price Prediction
            </div>
            <div className="flex space-x-4">
              <a href="https://www.kaggle.com/competitions/optiver-trading-at-the-close"  rel="noopener noreferrer" target="_blank" className="text-blue-300">Dataset</a>
              <a href="https://github.com/UNT-CSCE-Projects/US_stock_market_prediction"  rel="noopener noreferrer" target="_blank" className="text-blue-300">Github</a>
            </div>
          </div>
        </div>
      </nav>
      <div
      className="relative items-center justify-center"
      style={{
        width: '30%',
        marginLeft: '33rem',
        marginTop: '10px'
      }}
    >
        <form  className="flex items-center space-x-2" >
        
          <div className="w-40">Stock Number </div>
                <input
                  type="number"
                  placeholder="Enter Stock ID"
                  value={stockId}
                  onChange={handleStockIdChange}
                  max={29}
                  min={0}
                  required
                  className="px-2 py-1 border border-gray-300 rounded"
                />
              <div className="w-40">Day </div>
              <input
                type="number"
                placeholder="Enter Day"
                value={day}
                onChange={handleDayChange}
                max={480}
                min={1}
                required
                className="px-2 py-1 border border-gray-300 rounded"
              />
            </form>


      
      </div>
     
      <div className="algobar ">
        <button className="section bg-blue-500 text-white " onClick={()=>fetchDataFromAl1(1)}>LSTM</button>
        <button className="section bg-blue-500 text-white" onClick={()=>fetchDataFromAl1(2)}>ARIMA</button>
        <button className="section bg-blue-500 text-white" onClick={()=>fetchDataFromAl1(3)}>SVM</button>
      </div>

      
      <div className='algobar' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
  {mae !== '' && <div style={{ marginBottom: '10px' }}>Mean Absolute Error: <b>{mae}</b></div>}
  
  {algorithm > 0 && train.length > 0 && test.length > 0 && <PlotGraph train={train} test={test} />}

  {error !== '' && <span style={{ color: 'red' }}>{error}</span>}
</div>


      
    </div>
  );
}
