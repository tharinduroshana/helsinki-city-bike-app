import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import "./StationDetails.css";

const StationDetails = () => {
    const { id } = useParams();
    const [stationInfo, setStationInfo] = useState(null);

    const fetchStationInfo = async () => {
        try {
            const trip = await fetch(`http://localhost:4000/stations/${id}`);
            const json = await trip.json();
            console.log(json)
            setStationInfo(json);
        } catch (e) {
            console.error(`Error fetching trip with ID: ${id}`, e);
            throw e;
        }
    }

    useEffect(() => {
        (async () => {
            fetchStationInfo();
        })();
    }, []);

    return (
        <div>
            <div className="station-details-container">
                <h2>Trip Details</h2>
                <div className="station-details">
                    <div className="detail">
                        <span className="label">Station ID:</span>
                        <span>{stationInfo && stationInfo["details"]["id"]}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Station Name:</span>
                        <span>{stationInfo && stationInfo["details"]["name"]}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Station Address:</span>
                        <span>{stationInfo && stationInfo["details"]["adress"]}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Number of Departures:</span>
                        <span>{stationInfo && stationInfo["departure_count"]}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Number of Returns:</span>
                        <span>{stationInfo && stationInfo["returns_count"]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StationDetails;