import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Chip, Paper, Stack } from '@mui/material'
import image from '../../images/no_picture.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../layout/Navbar';

// Styles

const Sections = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    
    @media screen and (max-width: 768px) {
        padding: 20px;
        padding-right: 20px;
    }

    @media screen and (max-width: 680px) {
        flex-direction: column;
    }

`

const Info = styled.div`
    display: flex;
    padding: 8px;
    gap: 8px;
    border: 1px solid lightgrey;
    border-radius: 25px;

    @media screen and (max-width: 680px) {
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 400px) {
        flex-direction: column;
        border: none;
        gap: 5px;
    }
`

const UserImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Img = styled.img`
    height: 200px;
    max-width: 200px;
    margin-right: 20px;

    @media screen and (max-width: 680px) {
        margin: 15px;
    }
`

// User Details

const ViewUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUser = async () => {

            try {
                const res = await axios.get(`http://localhost:8080/user/${id}`);
                setUser(res.data);
            } catch (err) {
                console.dir(err);
            }

        };
        getUser();
    }, [id]);

    return (
        <Fragment>
            <Navbar />
            <Box component="div" sx={{ width: "100%" }}>
                <Paper elevation={3} sx={{ width: "100%" }}>
                    <Sections>
                        <UserImage>
                            <Img src={image} alt="foto de perfil" />
                        </UserImage>
                        <Stack spacing={1} sx={{ width: "100%" }}>
                            <Info>
                                <Chip label="nombre" variant='filled' />
                                <Chip label={user.name} variant='outlined' />
                            </Info>
                            <Info>
                                <Chip label="nombre de usuario" variant='filled' />
                                <Chip label={user.username} variant='outlined' />
                            </Info>
                            <Info>
                                <Chip label="correo electrónico" variant='filled' />
                                <Chip label={user.email} variant='outlined' />
                            </Info>
                        </Stack>
                    </Sections>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default ViewUser