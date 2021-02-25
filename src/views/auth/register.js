import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import MuiPhoneNumber from "material-ui-phone-number";
import { Config } from '../../config/config';
import PhoneNumber from "awesome-phonenumber";

axios.defaults.baseURL = Config.api_url;

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    error: {
        color: "red"
    },
    formControl: {
        margin: theme.spacing(3),
    }
}));

const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required()
});

const Register = ({

}) => {
    const classes = useStyles();
    const history = useHistory();

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const [phoneNumber, setPhoneNumber] = useState(new PhoneNumber(""));
    const [phoneNumberError, setPhoneNumberError] = useState(null);

    const signUp = (form) => {
        phoneNumberError || axios.post(`/signup`, {...form, phoneNumber: phoneNumber.getNumber()})
            .then(({ data }) => {
                if (data.success) {
                    setSuccess('You were registered successfully !!')
                    useHistory.push('/login');
                } else {
                    setError(data.errorMessage);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Backdrop className={classes.backdrop} open={isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(signUp)}>
                    <input type="hidden" name="userType" value="admin" ref={register} />
                    {
                        error ? <Alert >{error}</Alert> : <></>
                    }
                    {
                        success ? <Alert >{success}</Alert> : <></>
                    }

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="Given Name"
                        name="firstname"
                        autoComplete="given-name"
                        autoFocus
                        error={errors.firstname}
                        helperText={errors.firstname?.message}
                        inputRef={register}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Surname"
                        name="lastname"
                        autoComplete="family-name"
                        autoFocus
                        error={errors.lastname}
                        helperText={errors.lastname?.message}
                        inputRef={register}
                    />

                    <MuiPhoneNumber
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="tel"
                        autoFocus
                        error={phoneNumberError}
                        helperText={phoneNumberError?.message}
                        defaultCountry={'kr'}
                        onChange={(value) => {
                            const pn = new PhoneNumber(value);
                            setPhoneNumber(pn);
                            setPhoneNumberError((() => {
                                switch (pn.a.possibility) {
                                    case 'is-possible':
                                        return null;
                                    case 'invalid-country-code':
                                        return new Error("Enter a valid country code");
                                    case 'too-long':
                                        return new Error("The phone number is too long");
                                    case 'too-short':
                                        return new Error("The phone number is too short");
                                    default:
                                        return new Error("Invalid phone number");
                                }
                            })());
                        }}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={errors.email}
                        helperText={errors.email?.message}
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={errors.password}
                        helperText={errors.password?.message}
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        error={errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        inputRef={register}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ background: "#ffc107" }}
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/login" variant="body2">
                                {"Do you have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default withRouter(Register);