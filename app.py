import os
import pickle
from flask import Flask, render_template, request, send_from_directory

import pandas as pd
from sklearn.decomposition import PCA

app = Flask(__name__)
#env_config = os.getenv('APP_SETTINGS', 'config.DevelopmentConfig')
#app.config.from_object(env_config)
#secret_key = app.config.get('SECRET_KEY')

@app.get('/')
def home_get():
    return render_template('index.html')



@app.post('/')
def home_post():
    testData = {
        
    }
    return render_template('index.html', response = {run_model(testData)})

def getDataFrame(testData):

    dataFrame = pd.DataFrame(testData)
    return dataFrame

def run_model(testData):
    dataFrame = getDataFrame(testData)
    dataFrameWithPCA = runPCA(dataFrame)
    pickel_file = 'trained_model.pkl'
    with open(pickel_file, 'rb'):
        pickel_model = pickle.load(pickel_file)
        return pickel_model.predict(dataFrameWithPCA)



# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico')

@app.route('/about')
def about():
    return render_template('index.html')

