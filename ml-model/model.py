import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import matplotlib.pyplot as plt
import pickle


# Load the modle
model = pickle.load(open('./model_pickle', 'rb'))

data = pd.read_csv('power_usage_test.csv')  # replace with your dataset

X = data.drop('power', axis=1)
y = data['power']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

