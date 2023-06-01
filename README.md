# Solita Assignment

## Data Import

### Trip details

- Before running data loading scripts, you have to make sure that you have updated MYSQL credentials in the script.
- Replace `db_username` and `db_username` properties with your MYSQL user credentials inside `solita-latest/solita-assignment-backend/load_data.py`
- Copy trip details CSV files to the `solita-latest/solita-assignment-backend/data` folder.
- Execute following python script.

> python3 load_data.py

### Station details

- Before running data loading scripts, you have to make sure that you have updated MYSQL credentials in the script.
- Replace `db_username` and `db_username` properties with your MYSQL user credentials inside `solita-latest/solita-assignment-backend/load_station_data.py`
- Copy station details CSV files to the `solita-latest/solita-assignment-backend/station_data` folder.
- Execute following python script.

> python3 load_station_data.py
<hr>

## Running the backend

- Make sure you updated the `db_username` and `db_password` properties in `solita-latest/solita-assignment-backend/index.js`.
- inside `solita-latest/solita-assignment-backend/` open up a terminal and run the following commands to start up the express server.

> npm install

> node index.js

The backend server should be started in `http://localhost:4000`
<hr>

## Running the frontend

- inside `solita-latest/solita-assignment-frontend/` open up a terminal and run the following commands to start up the express server.

> npm install

> npm start

This will start up the React server inside `http://localhost:3000`