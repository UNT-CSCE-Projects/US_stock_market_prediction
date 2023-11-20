# US Stock Market Closing Price Prediction

We will be using the Optiver Competition dataset for this project.

## Approach
In this prediction problem, we are analyzing the data from a time-series viewpoint. For time series prediction we will use only the `target` feature of the data.
Using differencing and test using Augmented Dicky Fuller test we can see that the data becomes stationary after the first differencing.
Using the first differenced data, we can fun PACF and ACF tests and extract P and Q values.
Using the P and Q values we can run an ARMA model and get a close prediction.

## Running the code:
1. Open the Optiver_Trading_at_the_close.ipynb file in Github.
2. Click the "Open in Colab" button.
3. If Kaggle download is not working, go to Kaggle and download a new API token.
4. Copy the `username` and `key` from the downloaded kaggle.json file in the notebook.
5. Run the notebook.
