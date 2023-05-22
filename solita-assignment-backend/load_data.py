import pandas as pd
import mysql.connector
import os

config = {
    'user': 'root',
    'password': 'root@123',
    'host': 'localhost'
}
database_name = "helsinki_city_bike_db"
table_name = "trips"

cnx = mysql.connector.connect(**config)

cursor = cnx.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS `{}`".format(database_name))

cursor.close()
cnx.close()

config = {
    'user': 'root',
    'password': 'root@123',
    'host': 'localhost',
    'database': database_name
}

cnx = mysql.connector.connect(**config)

cursor = cnx.cursor()

query = "CREATE TABLE IF NOT EXISTS {} (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, departure_date VARCHAR(50) NOT NULL, return_date VARCHAR(50) NOT NULL, departure_station_id VARCHAR(50) NOT NULL, departure_station_name VARCHAR(50) NOT NULL, return_station_id VARCHAR(50) NOT NULL, return_station_name VARCHAR(50) NOT NULL, covered_distance INT(50) NOT NULL, duration INT(50) NOT NULL)".format(table_name)

cursor.execute(query)

file_list = os.listdir('./data')
csv_files = [file for file in file_list if file.endswith('.csv')]

csv_files = ['./data/' + file for file in csv_files]

for csv_file in csv_files:
    df = pd.read_csv(csv_file)
    df = df.where(pd.notnull(df), 0)
    df = df[(df['Duration (sec.)'] > 10) & (df['Covered distance (m)'] > 10)]
    data = [tuple(row) for row in df.values]

    print(len(df.values))

    placeholders = ', '.join(['%s'] * len(df.columns))

    columns = 'departure_date, return_date, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration'

    insert_query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"

    cursor.executemany(insert_query, data)
    cnx.commit()

cursor.close()
cnx.close()