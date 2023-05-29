import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
    {id: 'id', label: 'ID'},
    {id: 'name', label: 'Station Name', align: 'right'},
    {id: 'adress', label: 'Address', align: 'right'},
];

const StationsTable = () => {
    const [ stations, setStations ] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const fetchStations = async () => {
        try {
            const response = await fetch('http://localhost:4000/stations');
            const json = await response.json();
            console.log(json)
            setStations(json);
        } catch (e) {
            console.error("Error fetching trips.", e);
        }
    }

    useEffect(() => {
        fetchStations();
    }, []);

    const handleOnClick = () => {

    }

    const renderSpinner = () => {
        return (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        );
    }

    const renderStationsTable = () => {
        return (
            <>
                <TableComponent
                    columns={columns}
                    data={stations || []}
                    onClickHandler={handleOnClick}
                    rowsPerPage={rowsPerPage}
                    rowPerPageHandler={() => {console.log("row clicked!")}}
                    changePageHandler={() => {console.log("page clicked!")}}
                    page={page}
                />
            </>
        )
    }

    return (
        <>
            <div className="trips-screen">
                <h1 className="trips-title">Stations</h1>
                {stations.length === 0 ? (renderSpinner()) : (renderStationsTable())}
            </div>
        </>
    );
}

export default StationsTable;