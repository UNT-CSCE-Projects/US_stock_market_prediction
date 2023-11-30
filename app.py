import os
import pickle
from flask import Flask, render_template, request, send_from_directory, jsonify
from tensorflow.keras.optimizers.legacy import Adam as LegacyAdam
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
from sklearn.decomposition import PCA
import numpy as np
from keras.models import load_model
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
#env_config = os.getenv('APP_SETTINGS', 'config.DevelopmentConfig')
#app.config.from_object(env_config)
#secret_key = app.config.get('SECRET_KEY')
model = load_model("lstm.h5")
@app.get('/')
def home_get():
    return render_template('index.html')

@app.post('/')
def get_data():
    stock_id = request.args.get('stock_id')
    algorithm = request.args.get('algorithm')

    return render_template('index.html', response = {run_model(stock_id, algorithm)})


# @app.post('/')
# def home_post():
#     testData = {
        
#     }
#     return render_template('index.html', response = {run_model(testData)})

def getDataFrame(stock_id):
    df = pd.read_csv('shortlisted.csv')
    df_updated = df[df['stock_id']==int(stock_id)]
    train = df_updated.filter(['time_id', 'target'])
    
    train = train.set_index('time_id')
    print(df_updated)
    return train

def create_sequences(dataset, look_back=1):
    data_X, data_Y = [], []
    for i in range(len(dataset) - look_back):
        a = dataset[i:(i + look_back), 0]
        data_X.append(a)
        data_Y.append(dataset[i + look_back, 0])
    return np.array(data_X), np.array(data_Y)


def run_model(stock_id, algorithm):
    if stock_id is not None:
        train = getDataFrame(stock_id)
        scaler = MinMaxScaler(feature_range=(0, 1))
        start, end = 0, 55
        scaled_data = scaler.fit_transform(train[start:end].diff().dropna())

        train_data, test_data = scaled_data[start:49, :], scaled_data[45:end, :]

        look_back = 3
        test_X, _ = create_sequences(test_data, look_back)

        test_X_reshaped = np.reshape(test_X, (test_X.shape[0], 1, test_X.shape[1]))

        test_predict = model.predict(test_X_reshaped)


        test_predict = scaler.inverse_transform(test_predict)

        return jsonify({'training': train.to_dict(orient='records'),
                        'testing': test_predict.tolist()}), 200
    else:
        return jsonify({'error': 'Invalid stock_id'}), 400
    # dataFrameWithPCA = runPCA(dataFrame)
    # pickel_file = 'trained_model.pkl'
    # with open(pickel_file, 'rb'):
    #     pickel_model = pickle.load(pickel_file)
    #     return pickel_model.predict(dataFrameWithPCA)



# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico')

@app.route('/about')
def about():
    return render_template('index.html')

