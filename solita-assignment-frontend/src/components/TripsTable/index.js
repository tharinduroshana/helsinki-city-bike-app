import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import "./TripsTable.css";

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
            <div className="trip-table">
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 500}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trips
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow onClick={() => handleOnClick(row.id)} hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={trips.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
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