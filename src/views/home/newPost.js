import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required()
});

const NewPost = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = React.useState('');
    const publish = (form) => {
        axios.post(`/post`, form, {headers:{'x-access-token': localStorage.token}})
            .then(({ data }) => {
                if (data.success) {
                    setSuccess('Your post was published successfully !!')
                    useHistory.push('/');
                } else {
                    setError(data.errorMessage);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    New Post
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(publish)}>
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
                        id="title"
                        label="Title"
                        name="title"
                        autoFocus
                        error={errors.title}
                        helperText={errors.title?.message}
                        inputRef={register}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="content"
                        label="Content"
                        name="content"
                        autoFocus
                        error={errors.content}
                        helperText={errors.content?.message}
                        inputRef={register}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ background: "#ffc107" }}
                        className={classes.submit}
                    >
                        Publish
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default withRouter(NewPost);