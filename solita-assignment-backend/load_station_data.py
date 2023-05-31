import pandas as pd
import mysql.connector
import os

# This python file loads stations detail CSV into stations table in helsinki_city_bike_db database.

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
# Name of the stations table
table_name = "stations"

cnx = mysql.connector.connect(**config)

cursor = cnx.cursor()

# Creates a new database if not already exists
cursor.execute("CREATE DATABASE IF NOT EXISTS `{}`".format(database_name))

cursor.close()
cnx.close()

# Configs needed to establish database connection. Replace root/root with relevant username/password
config = {
    'user': db_username,
    'password': db_password,
    'host': 'localhost',
    'database': database_name
}

cnx = mysql.connector.connect(**config)

cursor = cnx.cursor()

# Creates new stations table if not exists
query = "CREATE TABLE IF NOT EXISTS {} (fid INT(11) NOT NULL PRIMARY KEY, id INT(11) NOT NULL, nimi VARCHAR(50) NOT NULL, namn VARCHAR(50) NOT NULL, name VARCHAR(50) NOT NULL, osoite VARCHAR(50) NOT NULL, adress VARCHAR(50) NOT NULL, kaupunki VARCHAR(50) NOT NULL, stad VARCHAR(50) NOT NULL, operaattor VARCHAR(50) NOT NULL, kapasiteet VARCHAR(50) NOT NULL, x VARCHAR(50) NOT NULL, y VARCHAR(50) NOT NULL)".format(table_name)

cursor.execute(query)

# Finds the files with .csv file extension in the ./station_data directory
file_list = os.listdir('./station_data')
csv_files = [file for file in file_list if file.endswith('.csv')]

csv_files = ['./station_data/' + file for file in csv_files]

# Loops through the .csv files
for csv_file in csv_files:
    df = pd.read_csv(csv_file)
    # Replaces nulls with zeros
    df = df.where(pd.notnull(df), 0)
    data = [tuple(row) for row in df.values]

    print(len(df.values))

    placeholders = ', '.join(['%s'] * len(df.columns))

    columns = 'fid, id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y'

    # Prepares the queries to enter records
    insert_query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"

    cursor.executemany(insert_query, data)
    cnx.commit()

cursor.close()
cnx.close()