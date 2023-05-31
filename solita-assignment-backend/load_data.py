import pandas as pd
import mysql.connector
import os

# This python file loads trips detail CSV into trips table in helsinki_city_bike_db database.

# Configs needed to establish database connection. Replace root/root with relevant username/password
db_username = 'root'
db_password = 'root'

config = {
    'user': db_username,
    'password': db_password,
    'host': 'localhost'
}
# Name of the database
database_name = "helsinki_city_bike_db"
# Name of the trips table
table_name = "trips"

cnx = mysql.connector.connect(**config)

cursor = cnx.cursor()

# Creates a new database if not already exists
cursor.execute("CREATE DATABASE IF NOT EXISTS `{}`".format(database_name))

cursor.close()
cnx.close()

# Configs needed to establish database connection.
config = {
    'user': db_username,
    'password': db_password,
    'host': 'localhost',
    'database': database_name
}

cnx = mysql.connector.connect(**config)

cursor = cnx.cursor()

# Creates new trips table if not exists
query = "CREATE TABLE IF NOT EXISTS {} (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, departure_date VARCHAR(50) NOT NULL, return_date VARCHAR(50) NOT NULL, departure_station_id VARCHAR(50) NOT NULL, departure_station_name VARCHAR(50) NOT NULL, return_station_id VARCHAR(50) NOT NULL, return_station_name VARCHAR(50) NOT NULL, covered_distance INT(50) NOT NULL, duration INT(50) NOT NULL)".format(table_name)

cursor.execute(query)

# Finds the files with .csv file extension in the ./data directory
file_list = os.listdir('./data')
csv_files = [file for file in file_list if file.endswith('.csv')]

csv_files = ['./data/' + file for file in csv_files]

# Loops through the .csv files
for csv_file in csv_files:
    df = pd.read_csv(csv_file)
    # Replaces nulls with zeros
    df = df.where(pd.notnull(df), 0)
    # filters trips which are not shorter than 10 meters and 10 seconds
    df = df[(df['Duration (sec.)'] > 10) & (df['Covered distance (m)'] > 10)]
    data = [tuple(row) for row in df.values]

    print(len(df.values))

    placeholders = ', '.join(['%s'] * len(df.columns))

    columns = 'departure_date, return_date, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration'

    # Prepares the queries to enter records
    insert_query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"

    cursor.executemany(insert_query, data)
    cnx.commit()

cursor.close()
cnx.close()