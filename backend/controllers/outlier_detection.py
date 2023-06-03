import mysql.connector
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import LabelEncoder
import json

# Your MySQL database connection details
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="487215",
    database="bharatmilk",
)

# Create a cursor object
cursor = conn.cursor()

query = "SELECT * FROM purchase_hub"
cursor.execute(query)
result = cursor.fetchall()

dataframe = pd.DataFrame(result, columns=['purchase_serial', 'purchase_date', 'customer_id', 'customer_name', 'purchase_shift', 'milk_type', 'milk_quantity', 'milk_fat', 'milk_clr', 'milk_rate', 'milk_amount', 'purchase_active_or_not', 'purchase_timestamp'])

# Convert 'purchase_shift' column to numerical values using LabelEncoder
label_encoder = LabelEncoder()
dataframe['purchase_shift_encoded'] = label_encoder.fit_transform(dataframe['purchase_shift'])

morning_data = dataframe[dataframe['purchase_shift'] == 'Morning']
evening_data = dataframe[dataframe['purchase_shift'] == 'Evening']

morning_features = morning_data[['customer_id', 'milk_quantity', 'milk_amount', 'purchase_shift_encoded']]
evening_features = evening_data[['customer_id', 'milk_quantity', 'milk_amount', 'purchase_shift_encoded']]


# Perform outlier detection using Isolation Forest
morning_model = IsolationForest(contamination=0.05)
evening_model = IsolationForest(contamination=0.05)

# Fit the morning model
morning_model.fit(morning_features)
morning_outliers = morning_model.predict(morning_features)

# Assign the outliers back to the morning_data DataFrame
morning_data.loc[:, 'morning_outlier'] = morning_outliers

# Fit the evening model
evening_model.fit(evening_features)
evening_outliers = evening_model.predict(evening_features)

# Assign the outliers back to the evening_data DataFrame
evening_data.loc[:, 'evening_outlier'] = evening_outliers


morning_outliers = morning_data[morning_data['morning_outlier'] == -1]
evening_outliers = evening_data[evening_data['evening_outlier'] == -1]

# Prepare the data for insertion into the outliers_table
morning_outliers_data = morning_outliers[['customer_id', 'milk_quantity', 'milk_amount', 'purchase_shift_encoded']].values.tolist()
evening_outliers_data = evening_outliers[['customer_id', 'milk_quantity', 'milk_amount', 'purchase_shift_encoded']].values.tolist()


# Execute the SQL query to insert morning outliers into the outliers_table
for _, row in morning_outliers.iterrows():
    insert_query = """
    INSERT INTO outliers_table (purchase_serial, purchase_date, customer_id, customer_name, purchase_shift, milk_type, milk_quantity, milk_fat, milk_clr, milk_rate, milk_amount, purchase_active_or_not, purchase_timestamp, outlier_label)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (row['purchase_serial'], row['purchase_date'], row['customer_id'], row['customer_name'], row['purchase_shift'], row['milk_type'], row['milk_quantity'], row['milk_fat'], row['milk_clr'], row['milk_rate'], row['milk_amount'], row['purchase_active_or_not'], row['purchase_timestamp'], 1)
    cursor.execute(insert_query, values)

# Execute the SQL query to insert evening outliers into the outliers_table
for _, row in evening_outliers.iterrows():
    insert_query = """
    INSERT INTO outliers_table (purchase_serial, purchase_date, customer_id, customer_name, purchase_shift, milk_type, milk_quantity, milk_fat, milk_clr, milk_rate, milk_amount, purchase_active_or_not, purchase_timestamp, outlier_label)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (row['purchase_serial'], row['purchase_date'], row['customer_id'], row['customer_name'], row['purchase_shift'], row['milk_type'], row['milk_quantity'], row['milk_fat'], row['milk_clr'], row['milk_rate'], row['milk_amount'], row['purchase_active_or_not'], row['purchase_timestamp'], 1)
    cursor.execute(insert_query, values)
