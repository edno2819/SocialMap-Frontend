import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


import CustomIconButton from "../CustomIconButton";

// https://codesandbox.io/s/69583309-how-to-center-search-component-in-app-bar-material-ui-63x1n?file=/src/App.js:1979-2052

interface Props {
    title: string;
}


const CustomAppBar = ({ title }: Props) => {
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" id="header">
            <Toolbar>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{ display: { xs: "none", sm: "block" } }}

                >
                    {title}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <CustomIconButton
                        label="Show Home"
                        onCLickCallback={() => navigate('/home')}
                    >
                        <HomeIcon />
                    </CustomIconButton>
                    <CustomIconButton
                        label="Show Edit"
                        onCLickCallback={() => navigate('/create')}
                    >
                        <EditIcon />
                    </CustomIconButton>
                    <CustomIconButton
                        label="Show Profiles"
                        onCLickCallback={() => navigate('/profiles')}
                    >
                        <GroupIcon />
                    </CustomIconButton>
                    <CustomIconButton
                        label="Show Profile"
                        onCLickCallback={() => navigate('/profile')}
                    >
                        <AccountCircleIcon />
                    </CustomIconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;