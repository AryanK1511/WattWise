from flask import Flask, request, jsonify
from model import model, X_test
import pandas as pd

app = Flask(__name__)

data = {'hour': [19], 'weekday': [2], 'is_weekend': [0], 'is_public_holiday': [0]}
df_row = pd.DataFrame(data)

@app.get('/test')
def test():
  return f"{model.predict(df_row)}"

@app.get('/fit')
def fit():
  # Parse the incoming JSON data
  input_data = request.get_json()

  X = input_data.drop('timestamp', axis=1)
  y = input_data['power']
  
  # Return the updated DataFrame as a JSON response
  return jsonify(df.to_dict(orient='records'))

@app.post('/predict')
def predict():
  # Parse the incoming JSON data
    input_data = request.get_json()

    # Convert the array of objects into a DataFrame
    df = pd.DataFrame(input_data)
    jsonify(model.predict(df).tolist())
    return jsonify(model.predict(df).tolist())

