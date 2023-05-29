import {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import "./TripsTable.css";
import TableComponent from "../Table";

const columns = [
    {id: 'id', label: 'ID'},
    {id: 'departure_date', label: 'Departure', align: 'right'},
    {id: 'return_date', label: 'Return', align: 'right'},
    {
        id: 'departure_station_name',
        label: 'Departure Station',
        align: 'right',
    },
    {
        id: 'return_station_name',
        label: 'Return Station',
        align: 'right',
    },
    {
        id: 'covered_distance',
        label: 'Distance (m)',
        align: 'right',
    },
    {
        id: 'duration',
        label: 'Duration (s)',
        align: 'right',
    },
];

const TripsTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    const fetchTrips = async () => {
        try {
            const response = await fetch('http://localhost:4000/trips');
            const json = await response.json();
            setTrips(json);
        } catch (e) {
            console.error("Error fetching trips.", e);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOnClick = (key) => {
        navigate(`/trip/${key}`);
    }

    const renderTripsTable = () => {
        return (
            <>
                <TableComponent
                    page={page}
                    changePageHandler={handleChangePage}
                    rowPerPageHandler={handleChangeRowsPerPage}
                    onClickHandler={handleOnClick}
                    rowsPerPage={rowsPerPage}
                    columns={columns}
                    data={trips || []} />
            </>
        )
    }

    const renderSpinner = () => {
        return (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <div className="trips-screen">
            <h1 className="trips-title">Helsinki City Bike App</h1>
            {trips.length === 0 ? (renderSpinner()) : (renderTripsTable())}
        </div>
    );
}

export default TripsTable;