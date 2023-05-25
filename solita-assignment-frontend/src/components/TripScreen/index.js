import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const TripScreen = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);

    const fetchTrip = async () => {
        try {
            const trip = await fetch(`http://localhost:4000/trips/${id}`);
            const json = await trip.json();
            setTrip(json);
        } catch (e) {
            console.error(`Error fetching trip with ID: ${id}`, e);
            throw e;
        }
    }

    useEffect(() => {
        (async () => {
            fetchTrip();
        })();
    }, [])

    return (
        <div>{trip && trip.duration}</div>
    );
}

export default TripScreen;