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
import styles from '../../css/style.css';
injectTapEventPlugin();

const SignIn = () => (
    <Card className={styles.signin}>
        <CardContent>
            <CardActions>
                <TextField
                    id="filled-email-input"
                    label="User Name"
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="filled"
                />
                <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="filled"
                />
                <Button variant="outlined">Sign In</Button>
                <Button variant="outlined" href="/signup">Create Account</Button>
            </CardActions>
        </CardContent>
    </Card>
);

export default SignIn;

ReactDOM.render(
    <SignIn />,
    document.getElementById('signin')
);