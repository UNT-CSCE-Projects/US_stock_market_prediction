import os
import pickle
from flask import Flask, render_template, request, send_from_directory, jsonify
from tensorflow.keras.optimizers.legacy import Adam as LegacyAdam
from sklearn.preprocessing import MinMaxScaler, StandardScaler
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.decomposition import PCA
import numpy as np # linear algebra
from keras.models import load_model
from sklearn.metrics import mean_absolute_error
from flask_cors import CORS

from statsmodels.tsa.arima.model import ARIMA


app = Flask(__name__)
CORS(app)


#env_config = os.getenv('APP_SETTINGS', 'config.DevelopmentConfig')
#app.config.from_object(env_config)
#secret_key = app.config.get('SECRET_KEY')

@app.get('/')
def home_get():
    return render_template('index.html')

@app.get('/data')
def get_data():
    stock_id = request.args.get('stock_id')
    day = request.args.get('day')
    algorithm = int(request.args.get('algorithm'))
    
    return run_model(stock_id, day, algorithm)


# @app.post('/')
# def home_post():
#     testData = {
        
#     }
#     return render_template('index.html', response = {run_model(testData)})

def getDataFrame(stock_id,day):
    df = pd.read_csv('shortlisted.csv')
    df_updated = df[(df['stock_id']==int(stock_id)) & (df['date_id']==int(day))]
    train = df_updated.filter(['time_id', 'target'])
    train['time_id'] = train['time_id'] - train['time_id'].min()
    train = train.set_index('time_id')

    return train

def getDataFrameForSVR(stock_id,day):
    df = pd.read_csv('shortlisted.csv')
    df_updated = df[(df['stock_id']==int(stock_id)) & (df['date_id']==int(day))]

    # Remove all unrelated columns
    train = df_updated.filter(['time_id', 'target'])
    train['time_id'] = train['time_id'] - train['time_id'].min()
    return train

def create_sequences(dataset, look_back=1):
    data_X, data_Y = [], []
    for i in range(len(dataset) - look_back):
        a = dataset[i:(i + look_back), 0]
        data_X.append(a)
        data_Y.append(dataset[i + look_back, 0])
    return np.array(data_X), np.array(data_Y)


def run_model(stock_id, day, algorithm):
    """
    
    
    """
    if stock_id and day:
        day = int(day) -1
        if day < 0 :
            return jsonify({'error': 'Invalid stock_id or day should be greater than 1'}), 400
        
        
        
        train_target_values = None
        test_values = None
        
        model = None
        if algorithm == 1:
            model = load_model("lstm.h5")

            if not model:
                return jsonify({'error': 'LSTM Model creation failed!'}), 400
            
            train = getDataFrame(stock_id,day)
            if len(train) == 0 :
                return jsonify({'error': 'No stock data found'}), 400

            scaler = MinMaxScaler(feature_range=(0, 1))
            start, end = 0, 55
            scaled_data = scaler.fit_transform(train[start:end].diff().dropna())
            train_data, test_data = scaled_data[start:49, :], scaled_data[45:end, :]
            look_back = 3
            test_X, test_Y = create_sequences(test_data, look_back)

            test_X_reshaped = np.reshape(test_X, (test_X.shape[0], 1, test_X.shape[1]))

            test_predict = model.predict(test_X_reshaped)
            test_predict = scaler.inverse_transform(test_predict)
            test_Y_actual_flat = test_Y.flatten()
            test_predict_actual_flat = test_predict.flatten()

            mae = mean_absolute_error(test_Y_actual_flat, test_predict_actual_flat)
            
            train_target_values = train[start:49].diff().dropna()['target'].tolist()
            test_values = [item[0] for item in test_predict.tolist()]

            response_data = {
                'training': train_target_values,
                'testing': test_values,
                'mae' : mae
            }

            response_json = jsonify(response_data)
            return response_json, 200

        elif algorithm == 3:
            pickel_file_name = 'svr_poly_1.pkl'
            with open(pickel_file_name, 'rb') as pickle_file:
                model = pickle.load(pickle_file)

            if not model:
                return jsonify({'error': 'SVR Model creation failed!'}), 400
            
            train = getDataFrame(stock_id,day)
            if len(train) == 0 :
                return jsonify({'error': 'No stock data found'}), 400

            start, end = 0, 55
            
            scaler = StandardScaler()
            scaled_data = scaler.fit_transform(train[start:end].diff().dropna())
            train_data, test_data = scaled_data[start:45, :], scaled_data[45:end, :]

            test_X_reshaped = test_data.reshape(-1, 1)

            test_predict = model.predict(test_X_reshaped)

            train_target_values = train[start:45].diff().dropna()['target'].tolist()

            test_values = test_predict.tolist()

            mae = mean_absolute_error(y_test, test_predict)

            response_data = {
                'training': train_target_values,
                'testing': test_values,
                'mae' : mae
            }
        
            response_json = jsonify(response_data)
            return response_json, 200
        elif algorithm == 2:
            return run_ARIMA(stock_id,day)
        else:
            return jsonify({'error': 'OOPS!! We do not have this one ready yet!!'}), 400
    else:
        return jsonify({'error': 'Invalid Input!! Stock number or Day should be equal to or greater than 1'}), 400


def run_ARIMA(stock_id :int, day:int):
    """

    """
    if not (stock_id and day):
        return jsonify({'error': 'Invalid Input!! Stock number or Day should be equal to or greater than 1'}), 400
    
    stock_id = int(stock_id)
    day = int(day)

    train = getDataFrame(stock_id,day)
    if len(train) == 0 :
            return jsonify({'error': 'No stock data found'}), 400
    
    #app.logger.info("train data:")
    #app.logger.info(train)

    # try:

    start = 0
    end = len(train)
    split = 45

    train = train.diff().dropna()

    train_data, test_data = train[start:split], train[split:end]

    app.logger.info("train_data length:")
    app.logger.info(len(train_data))
    app.logger.info("test_data length:")
    app.logger.info(len(test_data))

    arma_diff1 = ARIMA(train_data, order=(3, 0, 3)).fit()
    forecast = arma_diff1.predict(split+2, end, dynamic=True)
    #test = train[start:end]
    # mse = ((forecast.to_frame().predicted_mean - test.target) ** 2).mean()
    #mae = (forecast.to_frame().predicted_mean - test.target).abs().mean()

    app.logger.info("forecast length:")
    app.logger.info(len(forecast))

    mae = mean_absolute_error(test_data, forecast)

    
    # app.logger.info("forecast data:")
    # app.logger.info(forecast.to_frame().predicted_mean)

    response_data = {
            'training': train_data['target'].tolist(),
            'testing': forecast.to_frame().predicted_mean.tolist(),
            'mae' : mae
        }
    
    response_json = jsonify(response_data)
    return response_json, 200

    # except:
    #     return jsonify({'error': 'ARIMA is not working!!'}), 400


    

# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico')

@app.route('/about')
def about():
    return render_template('index.html')

