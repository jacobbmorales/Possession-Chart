import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../../css/style.css';
import $ from "jquery";
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
        this.handleSignIn = this.handleSignIn.bind(this)
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
            url: '/',
            data: { 'user': user, 'password': password },
            type: 'POST',
            success: function (response) {
                window.location.href = '/' + user
            }
        });

    };
    render() {
        return (
            <div>
                <div className={styles.logoleft}/>
                <div className={styles.logoright}/>
                <Card className={styles.signin}>
                    <CardContent>
                        <CardActions>
                            <div>
                                <TextField
                                    label="User Name"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    value={this.state.user}
                                    onChange={this.handleUser}
                                    className={styles.ten}
                                />
                                <br></br>
                                <TextField
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    value={this.state.password}
                                    onChange={this.handlePassword}
                                    className={styles.ten}
                                />
                                <br></br>
                                <Button className={styles.buttonten} type='submit' variant="outlined" onClick={() => { this.handleSignIn(this.state.user, this.state.password) }}>Sign In</Button>
                                <br></br>
                                <Button className={styles.buttonten2} variant="outlined" href="/signup">Create Account</Button>
                            </div>
                        </CardActions>
                    </CardContent>
                </Card>

                <Card className={styles.border}>

                    <CardActions>
                        <center>
                            <Typography>
                                This app is designed to track possessions from your games. With this data we will
                                calculate the efficiency of each of your players and plays. The hope is that you can
                                figure out what your most effective player/play combinations are.
                        </Typography>
                        </center>
                    </CardActions>

                </Card>
            </div>
        )
    }
}

export default SignIn;

ReactDOM.render(
    <SignIn />,
    document.getElementById('signin')
);