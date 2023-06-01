import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Paper } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import image from '../../images/no_picture.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../layout/Navbar';
import { useSnackbar } from 'notistack';

// Styles

const SectionsWrapper = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Sections = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`

const FormWrapper = styled.div`
    display: flex;
    gap: 10px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`

const Form = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 10px;
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

    @media screen and (max-width: 768px) {
        margin: 20px;
        margin-bottom: 40px;
    }
`

// Add User Form

const AddUser = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const nameReg = new RegExp(/^[A-Za-záãäéëêíîóöúüñç]{3,}\s[A-Za-záãäéëêíîóöúüñç]{3,}\s?$/);
    const usernameReg = new RegExp(/^(?!.*(!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|`|~|'|"|;|:|,|<|\.|>|\/|\?))[a-zA-Z0-9\-_]{6,20}$/);
    const emailReg = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i);
    
    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailReg.test(user.email) || !usernameReg.test(user.username) || !nameReg.test(user.name)) {
            
            if (!nameReg.test(user.name)) {
                setError(true);
                enqueueSnackbar("ERROR | Ingresa tu nombre completo. Por ejemplo: John Wayne", {variant:'error'});
                return;
            }

            if (!usernameReg.test(user.username)) {
                setError(true);
                enqueueSnackbar("ERROR | Ingresa entre 6 y 20 caracteres alfabéticos, numéricos y/o guiones tales como '-' y '_'", {variant:'error'});
                return;
            }

            if (!emailReg.test(user.email)) {
                setError(true);
                enqueueSnackbar("ERROR | Ingresa una dirección de correo válida. Por ejemplo: example@gmail.com", {variant:'error'});
                return;
            }

        } else {
            const res = await axios.post("http://localhost:8080/user", user);
            console.log(res.data);
            setError(false);
            setUser({...user,
                name: res.data.name,
                username: res.data.username,
                email: res.data.email
            });
    
            navigate("/");
        }
    }

    return (
        <Fragment>
            <Navbar />
            <Box component="div" sx={{ width: "100%" }}>
                <Paper elevation={3} sx={{ width: "100%" }}>
                    <Sections>
                        <UserImage>
                            <Img src={image} alt="foto de perfil" />
                        </UserImage>
                        <SectionsWrapper onSubmit={handleSubmit} autoComplete="off">
                            <FormWrapper>
                                <Form>
                                    <FormControl sx={{ width: "100%" }}>
                                        <OutlinedInput
                                            size="small"
                                            placeholder="Nombre y Apellido"
                                            id="name"
                                            name="name"
                                            onChange={handleInput}
                                            error={!nameReg.test(user.name) && error}
                                            required
                                        />
                                    </FormControl>
                                    <FormControl sx={{ width: "100%" }}>
                                        <OutlinedInput
                                            size="small"
                                            placeholder="Nombre de Usuario"
                                            id="username"
                                            name="username"
                                            onChange={handleInput}
                                            error={!usernameReg.test(user.username) && error}
                                            required
                                        />
                                    </FormControl>
                                    <FormControl sx={{ width: "100%" }}>
                                        <OutlinedInput
                                            size="small"
                                            placeholder="Correo Electrónico"
                                            id="email"
                                            name="email"
                                            onChange={handleInput}
                                            required
                                            error={!emailReg.test(user.email) && error}
                                        />
                                    </FormControl>
                                </Form>
                            </FormWrapper>
                            <Button
                                size='large'
                                variant='outlined'
                                color='success'
                                sx={{ mt: "20px" }}
                                type="submit"
                            >
                                AÑADIR USUARIO
                            </Button>
                        </SectionsWrapper>
                    </Sections>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default AddUser