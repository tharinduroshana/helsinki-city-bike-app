import {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import "./TripsTable.css";
import TableComponent from "../../components/Table";

const columns = [
    {id: 'id', label: 'ID'},
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
        label: 'Distance (km)',
        align: 'right',
    },
    {
        id: 'duration',
        label: 'Duration (min)',
        align: 'right',
    },
];

const TripsTable = () => {
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    const fetchTrips = async () => {
        try {
            const response = await fetch(`http://localhost:4000/trips?page=${page + 1}&pageSize=${rowsPerPage}`);
            const json = await response.json();
            const { trips, pageCount } = json;

            console.log(trips);
            const mappedTripps = trips.map(trip => ({ ...trip, covered_distance: (Math.round((trip['covered_distance']/1000) * 100) / 100).toFixed(2), duration: (Math.round((trip['duration']/60) * 100) / 100).toFixed(2) }));
            setTrips(mappedTripps);
            setPageCount(pageCount);
        } catch (e) {
            console.error("Error fetching trips.", e);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
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
                    pageCount={pageCount}
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
            <h1 className="trips-title">Trips</h1>
            {trips.length === 0 ? (renderSpinner()) : (renderTripsTable())}
        </div>
    );
}

export default TripsTable;