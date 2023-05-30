import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const columns = [
    {id: 'id', label: 'ID'},
    {id: 'name', label: 'Station Name', align: 'right'},
    {id: 'adress', label: 'Address', align: 'right'},
];

const StationsTable = () => {
    const [ stations, setStations ] = useState([]);
    const [ pageCount, setPageCount ] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const navigate = useNavigate();
    const fetchStations = async () => {
        try {
            const response = await fetch(`http://localhost:4000/stations?page=${page + 1}&pageSize=${rowsPerPage}`);
            const json = await response.json();
            const { stations, pageCount } = json;
            setStations(stations);
            setPageCount(pageCount);
        } catch (e) {
            console.error("Error fetching trips.", e);
        }
    }

    useEffect(() => {
        fetchStations();
    }, [page, rowsPerPage]);

    const handleOnClick = (key) => {
        navigate(`/stations/${key}`);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const renderStationsTable = () => {
        return (
            <>
                <TableComponent
                    columns={columns}
                    pageCount={pageCount}
                    data={stations || []}
                    onClickHandler={handleOnClick}
                    rowsPerPage={rowsPerPage}
                    rowPerPageHandler={handleChangeRowsPerPage}
                    changePageHandler={handleChangePage}
                    page={page}
                />
            </>
        )
    }

    return (
        <>
            <div className="trips-screen">
                <h1 className="trips-title">Stations</h1>
                {stations.length === 0 ? (<LoadingSpinner />) : (renderStationsTable())}
            </div>
        </>
    );
}

export default StationsTable;