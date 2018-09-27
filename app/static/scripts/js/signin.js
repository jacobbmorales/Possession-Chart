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

class SignIn extends React.Component {
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

    handleSignIn(event) {
        $.ajax({
            url: '/',
            data: $(this.form.user,this.form.password).serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
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
                        <Button variant="outlined" href="/home" onClick={this.handleSignIn}>Sign In</Button>
                        <Button variant="outlined" href="/signup">Create an Account</Button>
                    </CardActions>
                </CardContent>
            </Card>
        )
    }
}

export default SignIn;

ReactDOM.render(
    <SignIn />,
    document.getElementById('signin')
);