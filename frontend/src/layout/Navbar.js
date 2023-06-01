import React, { Fragment } from 'react'
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../themes';
import { ThemeProvider } from '@mui/material';
import { Add, ChevronLeft, Clear, PersonAdd } from '@mui/icons-material';
import { Link as LinkRouter, useLocation } from 'react-router-dom';

// Styles

const Title = styled.h1`
    font-size: 17px;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-align: left;
    margin-right: 30px;

    @media screen and (max-width: 450px) {
        font-size: 16px;
        letter-spacing: 0;
    }
`

const ButtonWrapper = styled.div`
    display: ${props => props.type === "desktop" ? "flex" : "none"};

    @media screen and (max-width: 450px) {
        display: ${props => props.type === "mobile" ? "flex" : "none"};
    }
`

const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: transparent;
    border-radius: 25px;
`

const Link = styled(LinkRouter)`
    text-decoration: none;
    color: #fff;
`

// Navbar

export default function Navbar() {
    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const page = window.location.href;

    const homePage = "http://localhost:3000/";
    const registerPage = "http://localhost:3000/add-user";
    const editPage = `http://localhost:3000/edit-user/${userId}`;
    const viewPage = `http://localhost:3000/view-user/${userId}`;

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={theme}>
                    <AppBar position="relative" color="primary">
                      <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 1 }}
                            >
                                <MenuIcon />
                            </IconButton>

                            {page === homePage && (
                                <>
                                    <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                                        <Title>
                                            Panel de Control
                                        </Title>
                                    </Typography>
                                    <Link to="/add-user">
                                        <ButtonWrapper type="desktop">
                                            <Button variant="outlined" color="inherit" aria-label="add user" size="medium" startIcon={
                                                <Add />
                                            }>
                                                AÑADIR
                                            </Button>
                                        </ButtonWrapper>
                                        <ButtonWrapper type="mobile">
                                            <IconWrapper>
                                                <IconButton color="inherit" aria-label="add user" size="small">
                                                    <PersonAdd />
                                                </IconButton>
                                            </IconWrapper>
                                        </ButtonWrapper>
                                    </Link>
                                </>
                            )}
                            
                            {page === registerPage && (
                                <>
                                <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                                    <Title>
                                        Registrar Cuenta
                                    </Title>
                                </Typography>
                                    <Link to="/">
                                        <ButtonWrapper type="desktop">
                                            <Button variant="outlined" color="inherit" aria-label="return" size="medium" startIcon={
                                                <ChevronLeft />
                                            }>
                                                VOLVER
                                            </Button>
                                        </ButtonWrapper>
                                        <ButtonWrapper type="mobile">
                                            <IconWrapper>
                                                <IconButton color="inherit" aria-label="return" size="small">
                                                    <Clear />
                                                </IconButton>
                                            </IconWrapper>
                                        </ButtonWrapper>
                                    </Link>
                                </>
                            )}

                            {page === editPage && (
                                <>
                                    <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                                        <Title>
                                            Editar Cuenta
                                        </Title>
                                    </Typography>
                                    <Link to="/">
                                        <ButtonWrapper type="desktop">
                                            <Button variant="outlined" color="inherit" aria-label="return" size="medium" startIcon={
                                                <ChevronLeft />
                                            }>
                                                VOLVER
                                            </Button>
                                        </ButtonWrapper>
                                        <ButtonWrapper type="mobile">
                                            <IconWrapper>
                                                <IconButton color="inherit" aria-label="return" size="small">
                                                    <Clear />
                                                </IconButton>
                                            </IconWrapper>
                                        </ButtonWrapper>
                                    </Link>
                                </>
                            )}


                            {page === viewPage && (
                                <>
                                    <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                                        <Title>
                                            Datos del Usuario
                                        </Title>
                                    </Typography>
                                    <Link to="/">
                                        <ButtonWrapper type="desktop">
                                            <Button variant="outlined" color="inherit" aria-label="return" size="medium" startIcon={
                                                <ChevronLeft />
                                            }>
                                                VOLVER
                                            </Button>
                                        </ButtonWrapper>
                                        <ButtonWrapper type="mobile">
                                            <IconWrapper>
                                                <IconButton color="inherit" aria-label="return" size="small">
                                                    <Clear />
                                                </IconButton>
                                            </IconWrapper>
                                        </ButtonWrapper>
                                    </Link>
                                </>
                            )}
                      </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
        </Fragment>
    )
}
