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
import $ from "jquery";
injectTapEventPlugin();

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
        };
        this.handleUser = this.handleUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleUser(event) {
        this.setState({
            user: event.target.value
        });
    };

    handlePassword(event) {
        this.setState({
            password: event.target.value,
        });
    };

    handleSignIn(user, password) {
        $.ajax({
            url: '/signup',
            data: { 'user': user, 'password': password },
            type: 'POST',
            success: function (response) {
                console.log({ 'user': user, 'password': password });
            }
        });

    };
    render() {
        return (
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
                            value={this.state.user}
                            onChange={this.handleUser}
                        />
                        <TextField
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="filled"
                            value={this.state.password}
                            onChange={this.handlePassword}
                        />
                        <Button variant="outlined" onClick={this.handleSignIn(this.state.user, this.state.password)}>Sign Up</Button>
                    </CardActions>
                </CardContent>
            </Card>
        )
    }
}

export default SignUp;

ReactDOM.render(
    <SignUp />,
    document.getElementById('signup')
);