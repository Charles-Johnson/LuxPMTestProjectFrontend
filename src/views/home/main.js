import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { FaHeart, FaBars } from 'react-icons/fa';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Layout from '../common/layout'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '30%',
        left: '35%'
    },
}));

const Home = ({
    handleToggleSidebar
}) => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/login');
        }
    });

    return (
        <Layout>
            <main>
                <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                    <FaBars />
                </div>
                <header>
                    <p>Posts</p>
                </header>
                <Container>
                    <Grid container>
                    </Grid>
                </Container>
                <Fab color="primary" aria-label="add" onClick={() => history.push('/new_post')}>
                    <AddIcon />
                </Fab>
                <footer>
                    <small>
                        © 2020 made with <FaHeart style={{ color: 'red' }} /> by -{' '}
                    </small>
                    <br />
                    <div className="social-bagdes">
                    </div>
                </footer>
            </main>
        </Layout >
    );
};

export default withRouter(Home);