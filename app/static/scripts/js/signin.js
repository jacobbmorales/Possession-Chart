import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../../css/style.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import $ from "jquery";
injectTapEventPlugin();

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            error: false
        };
        this.handleUser = this.handleUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    handleUser(event) {
        this.setState({
            user: event.target.value
        });
    };

    handleError() {
        this.setState({
            error: true
        });
    }

    handlePassword(event) {
        this.setState({
            password: event.target.value,
        });
    };

    handleClose() {
        this.setState({
            error: false,
        });
    }

    handleSignIn(user, password) {
        $.ajax({
            url: '/',
            data: { 'user': user, 'password': password },
            type: 'POST',
            success: function (response) {
                window.location.href = '/' + user
            },
            error: function () {
                this.handleError()
            }.bind(this)
        });

    };
    render() {
        return (
            <div>
                <div className={styles.logoleft} />
                <div className={styles.logoright} />
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
                <Dialog
                    open={this.state.error}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogContent>
                        <center>
                            <Typography>
                                Incorrect username or password.
                            </Typography>
                        </center>
                        &nbsp;
                        <center>
                            <Button variant="outlined" onClick={() => this.handleClose()} >OK</Button>
                        </center>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default SignIn;

ReactDOM.render(
    <SignIn />,
    document.getElementById('signin')
);