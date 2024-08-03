from flask import Flask
from model import model, X_test
import pandas as pd

app = Flask(__name__)

data = {'hour': [19], 'weekday': [2], 'is_weekend': [0], 'is_public_holiday': [0]}
df_row = pd.DataFrame(data)

@app.get('/test')
def test():
  return f"{model.predict(df_row)}"
