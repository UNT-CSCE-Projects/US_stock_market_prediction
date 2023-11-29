# Optiver - Trading at Close: Predict US stocks closing movements

## Overview

Stock exchanges operate in fast-paced, high-stakes environments where every second counts. The intensity peaks in the critical final ten minutes of each trading day on the Nasdaq Stock Exchange, characterized by heightened volatility and rapid price fluctuations. Optiver, a leading global electronic market maker, thrives in this environment, utilizing technological innovation to trade a vast array of financial instruments, offering competitive, two-sided prices on major exchanges worldwide.

In the last ten minutes of the Nasdaq exchange trading session, market makers like Optiver merge traditional order book data with auction book data. This ability to consolidate information from both sources is critical for providing the best prices to all market participants.

## The Challenge

In this competition, you are challenged to develop a model capable of predicting the closing price movements for hundreds of Nasdaq-listed stocks using data from the order book and the closing auction of the stock. Information from the auction can be used to adjust prices, assess supply and demand dynamics, and identify trading opportunities.

Your model can contribute to the consolidation of signals from the auction and order book, leading to improved market efficiency and accessibility, particularly during the intense final ten minutes of trading. You'll also get firsthand experience in handling real-world data science problems, similar to those faced by traders, quantitative researchers, and engineers at Optiver.

## Data

| Sl | Feature Name           | Description                                                                                                                           |
|----|------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| 1  | stock_id               | A unique identifier for the stock. Not all stock IDs exist in every time bucket.                                                     |
| 2  | date_id                | A unique identifier for the date. Date IDs are sequential & consistent across all stocks.                                            |
| 3  | seconds_in_bucket      | The number of seconds elapsed since the beginning of the day's closing auction, always starting from 0.                                |
| 4  | imbalance_size         | The amount is unmatched at the current reference price (in USD).                                                                    |
| 5  | imbalance_buy_sell_flag| Buy-side imbalance: 1, Sell-side imbalance: -1, No imbalance: 0                                                                      |
| 6  | reference_price        | The price at which paired shares are maximized, the imbalance is minimized, and the distance from the bid-ask midpoint is minimized. Can also be thought of as being equal to the near price bounded between the best bid and ask price. |
| 7  | matched_size           | The amount that can be matched at the current reference price (in USD).                                                               |
| 8  | far_price              | The crossing price that will maximize the number of shares matched based on auction interest only. This calculation excludes continuous market orders.                                                  |
| 9  | near_price             | The crossing price that will maximize the number of shares matched based on auction and continuous market orders.                   |
| 10 | bid_price              | Price of the most competitive buy level in the non-auction book.                                                                     |
| 11 | bid_size               | The dollar notional amount on the most competitive buy level in the non-auction book.                                               |
| 12 | ask_price              | Price of the most competitive sell level in the non-auction book.                                                                    |
| 13 | ask_size               | The dollar notional amount on the most competitive sell level in the non-auction book.                                              |
| 14 | wap                    | The weighted average price in the non-auction book.                                                                                    |
|    |                        | Formula: (BidPrice * AskSize + AskPrice * BidSize) / (BidSize + AskSize)                                                            |
| 15 | target                 | The 60-second future move in the wap of the stock, less the 60-second future move of the synthetic index.                            |
| 16 | time_id                | For a particular stock, time_id maintains continuous value to track time through all days.                                           |
| 17 | row_id                 | Unique id to identify each row.                                                                                                      |


