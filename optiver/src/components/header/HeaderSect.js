
import logoImage from "../../assets/images/download.jpeg";
import PlotGraph from '../plot/PlotGraph';
import React, { useState } from 'react';


  

export default function HeaderSect() {
  const [stockId, setStockId] = useState('');

  const handleStockIdChange = (e) => {
    setStockId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You can handle the search logic here
    console.log('Stock ID submitted:', stockId);
  };

  const fetchDataFromAl1 = (e)=>{
    console.log(e,' loading')
  }
  return (
    <div>
      <nav className="relative py-3 custom-nav bg-blue-500 text-white">
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
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2" >
              <div className="w-40">Stock Number </div>
              <input
                type="number"
                placeholder="Enter Stock ID"
                value={stockId}
                onChange={handleStockIdChange}
                max={200}
                min={0}
                required
                className="px-2 py-1 border border-gray-300 rounded"
              />
              <button type="submit" className="bg-white text-blue-500 px-2 py-1 rounded hover:bg-gray-100 focus:outline-none">
                Set
              </button>
            </form>
      </div>
     
      <div className="algobar ">
        <button className="section bg-blue-500 text-white " onClick={()=>fetchDataFromAl1(stockId)}>Algorithm 1</button>
        <button className="section bg-blue-500 text-white" onClick={()=>fetchDataFromAl1(stockId)}>Algorithm 2</button>
        <button className="section bg-blue-500 text-white" onClick={()=>fetchDataFromAl1(stockId)}>Algorithm 3</button>
      </div>

      <div className='algobar' >
        <PlotGraph/>
      </div>
    </div>
  );
}
