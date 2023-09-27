import {AppBar, Toolbar, IconButton, Typography, Stack, Button} from "@mui/material";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import {useNavigate} from "react-router-dom";

/*
* NavBar component renders the navigation bar
* */
const NavBar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit'>
                    <DirectionsBikeIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                    Helsinki City Bike App
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button onClick={() => { navigate('/') }} color='inherit'>Trips</Button>
                    <Button onClick={() => { navigate('/stations') }} color='inherit'>Stations</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;