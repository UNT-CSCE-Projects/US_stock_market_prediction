# 📈 Optiver - Trading at Close: Predict US Stocks Closing Movements

## 🧭 Overview

Stock exchanges operate in fast-paced, high-stakes environments where every second counts. The intensity peaks in the critical final ten minutes of each trading day on the Nasdaq Stock Exchange, characterized by heightened volatility and rapid price fluctuations. Optiver, a leading global electronic market maker, thrives in this environment, utilizing technological innovation to trade a vast array of financial instruments, offering competitive, two-sided prices on major exchanges worldwide.

In the last ten minutes of the Nasdaq exchange trading session, market makers like Optiver merge traditional order book data with auction book data. This ability to consolidate information from both sources is critical for providing the best prices to all market participants.

## 🎯 The Challenge

In this competition, we developed models to predict the 60-second future movement in stock prices (`target`) based on real-time order book and auction dynamics for NASDAQ-listed stocks. The objective was to identify valuable signals in the last 10 minutes before market close to aid in decision-making and price discovery.

Our focus was to:

* Engineer features from time-based trading data.
* Apply and compare different time series forecasting techniques.
* Build a full-stack solution to serve model predictions via a web interface.

## 📊 Data

| Sl | Feature Name               | Description                                                                               |
| -- | -------------------------- | ----------------------------------------------------------------------------------------- |
| 1  | stock\_id                  | A unique identifier for the stock.                                                        |
| 2  | date\_id                   | A unique identifier for the date.                                                         |
| 3  | seconds\_in\_bucket        | Seconds since the start of the final auction period.                                      |
| 4  | imbalance\_size            | Unmatched order volume at the reference price (USD).                                      |
| 5  | imbalance\_buy\_sell\_flag | 1: Buy imbalance, -1: Sell imbalance, 0: Neutral.                                         |
| 6  | reference\_price           | Auction-derived price minimizing imbalance and spread.                                    |
| 7  | matched\_size              | Order volume matched at the reference price.                                              |
| 8  | far\_price                 | Crossing price from auction interest only.                                                |
| 9  | near\_price                | Crossing price from auction + continuous orders.                                          |
| 10 | bid\_price                 | Best buy level price.                                                                     |
| 11 | bid\_size                  | Volume at best bid.                                                                       |
| 12 | ask\_price                 | Best sell level price.                                                                    |
| 13 | ask\_size                  | Volume at best ask.                                                                       |
| 14 | wap                        | Weighted Average Price = (BidPrice × AskSize + AskPrice × BidSize) / (BidSize + AskSize). |
| 15 | target                     | 60-second future change in WAP minus synthetic index movement.                            |
| 16 | time\_id                   | Unique time reference per stock and day.                                                  |
| 17 | row\_id                    | Unique identifier per row.                                                                |

## 🛠️ Solution Approach

Our pipeline was structured into distinct modules for data preprocessing, modeling, and deployment:

* **Data Preprocessing**: Missing values handled via statistical imputation or zero-fill based on domain logic. Lag features, rolling means, and statistical indicators were extracted for time-series modeling.
* **Model Development**: Built and compared ARIMA, SARIMA, LSTM, and ensemble models (ARIMA + Random Forest) using both statistical learning and deep learning approaches.
* **Full-Stack Deployment**:

  * **Frontend**: Built using Angular 16 to visualize predictions.
  * **Backend**: Flask API serving model outputs.
  * **Hosting**: [Heroku deployment](https://optiver-trading-at-the-close-e231d4080979.herokuapp.com/)

## 🧠 Project Summary

This project tackles the challenge of predicting closing price movements during the final 10 minutes of trading for NASDAQ-listed securities. Built for the Kaggle competition **"Optiver - Trading at the Close"**, the goal was to experiment with time series modeling and ML to assist in high-stakes financial forecasting.

* **Objective**: Predict short-term price movement using order book + auction data.
* **Dataset**: 5.24M records across 200 NASDAQ stocks covering 9-minute auction windows.
* **Stack**: Python, Flask, Angular, ARIMA, SARIMA, LSTM, Random Forest, Google Colab, Heroku.

## 🤖 ML Models

| Model             | Description                                            | Key Metric (MSE) |
| ----------------- | ------------------------------------------------------ | ---------------- |
| ARIMA             | Autoregressive modeling with moving averages           | \~106.6          |
| SARIMA            | Seasonal ARIMA to capture cyclical patterns            | \~87.3           |
| Linear Regression | Lag-based feature model                                | \~25.0           |
| LSTM (PyTorch)    | Deep learning on time sequences (improves with epochs) | \~0.02–0.03      |
| ARIMA + RF        | Ensemble averaging ARIMA + ML predictions              | Best overall fit |

## 🏁 Outcomes

* Learned the complexity of auction-based trading systems and limitations in modeling short-term volatility.
* Developed a robust modular system with reproducible results and real-time visualization.
* Successfully demonstrated forecasting via statistical, machine learning, and hybrid models.
* Deployed a working full-stack web demo integrating backend ML predictions with frontend UI.

## 👥 Contributors

1. **Farhan Ar Rafi** – Developer – [LinkedIn](https://www.linkedin.com/in/farhanarrafi/)
2. **Avijeet Shil** – Developer – [LinkedIn](https://www.linkedin.com/in/avijeetshil/)
3. **Naga Sai Sivani Tutika** – Project Manager & Developer – [LinkedIn](https://www.linkedin.com/in/sivani-tutika/)
4. **Abdul Azeem Mohammed** – Developer – [LinkedIn](https://www.linkedin.com/in/mohammed-abdul-azeem-184084202/)
5. **Mohd Abdul Quavi Latifi** – Developer – [LinkedIn](https://www.linkedin.com/in/mohd-abdul-quavi-latifi-046508188/)
