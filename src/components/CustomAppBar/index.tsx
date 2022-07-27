import { useNavigate } from 'react-router-dom';
import {
    styled,
    alpha,
    InputBase,
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Typography,
    Stack,
    CssBaseline
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";



import CustomIconButton from "../CustomIconButton";

// https://codesandbox.io/s/69583309-how-to-center-search-component-in-app-bar-material-ui-63x1n?file=/src/App.js:1979-2052

interface Props {
    title: string;
}


const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
    }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));


const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
}));


const CustomAppBar = ({ title }: Props) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar
                    sx={{
                        justifyContent: "space-between"
                    }}
                >

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: { xs: "none", sm: "block" } }}
                    >
                        {title}
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>

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
        </Box>
    );
}

export default CustomAppBar;