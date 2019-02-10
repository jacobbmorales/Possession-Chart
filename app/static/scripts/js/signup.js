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

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            password2: "",
            email: "",
            passfail: false,
            userexists: false
        };
        this.handleUser = this.handleUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePassFail = this.handlePassFail.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDuplicate = this.handleDuplicate.bind(this);
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

    handlePassword2(event) {
        this.setState({
            password2: event.target.value,
        });
    };

    handleEmail(event) {
        this.setState({
            email: event.target.value,
        });
    };

    handlePassFail() {
        this.setState({
            passfail: true
        });
    }

    handleDuplicate() {
        this.setState({
            userexists: true
        });
    }

    handleClose() {
        this.setState({
            passfail: false,
            userexists: false
        });
    }

    handleSignUp(user, password, password2, email) {
        if (password != password2) {
            this.setState({
                passfail: true
            });
        }
        else {
            $.ajax({
                url: '/signup',
                data: { 'user': user, 'password': password, 'email': email },
                type: 'POST',
                success: function (response) {
                    window.location.href = '/'
                },
                error: function () {
                    this.handleDuplicate()
                }.bind(this)
            });
        }
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
                                    label="Email"
                                    type="email"
                                    autoComplete="current-password"
                                    margin="normal"
                                    value={this.state.email}
                                    onChange={this.handleEmail}
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
                                <TextField
                                    id="filled-password-input"
                                    label="Confirm Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    value={this.state.password2}
                                    onChange={this.handlePassword2}
                                    className={styles.ten}
                                />
                                <br></br>
                                <Button className={styles.buttonten} variant="outlined" onClick={() => this.handleSignUp(this.state.user, this.state.password, this.state.password2, this.state.email)}>Sign Up</Button>
                                <br></br>
                                <Button className={styles.buttonten2} variant="outlined" href='/'>Home</Button>
                            </div>
                        </CardActions>
                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.passfail}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogContent>
                        <center>
                            <Typography>
                                The passwords you entered do not match.
                            </Typography>
                        </center>
                    </DialogContent>
                    <DialogActions>
                        <div className={styleMedia.ten}>
                            <Button variant="outlined" onClick={() => this.handleClose()} color="primary">OK</Button>
                        </div>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.userexists}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogContent>
                        <center>
                            <Typography>
                                The username you entered already exists.
                            </Typography>
                        </center>
                    </DialogContent>
                    <DialogActions>
                        <div className={styleMedia.ten}>
                            <Button variant="outlined" onClick={() => this.handleClose()} color="primary">OK</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default SignUp;

ReactDOM.render(
    <SignUp />,
    document.getElementById('signup')
);