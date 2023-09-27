import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

/*
* LoadingSpinner component which shown to the user till the data fetches
* */
const LoadingSpinner = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <CircularProgress/>
        </Box>
    );
}

export default LoadingSpinner;