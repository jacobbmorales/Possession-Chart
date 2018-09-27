import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const HomePage = () => (
    <Card>
        <CardContent>
            <CardActions>
                <Button variant="outlined" href="/offense">Start a new game</Button>
            </CardActions>
        </CardContent>
    </Card>
);

export default HomePage;

ReactDOM.render(
    <HomePage />,
    document.getElementById('homepage')
);