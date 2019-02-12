import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import styles from '../../css/style.css';
import $ from "jquery";
injectTapEventPlugin();

class NewGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: "",
            date: "1892-03-11",
            error: false
        };
        this.handleGame = this.handleGame.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    handleGame(event) {
        this.setState({
            game: event.target.value
        });
    };

    handleError() {
        this.setState({
            error: true
        });
    }

    handleClose() {
        this.setState({
            error: false,
        });
    }

    handleDate(event) {
        this.setState({
            date: event.target.value
        });
    };

    handleAdd(game, date) {
        console.log(date)
        $.ajax({
            url: '/newgame',
            data: { 'game': game, 'date': date },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/offense/' + game + '/1'
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
                <Card className={styles.newgame}>
                    <CardContent>
                        <CardActions>
                            <div className={styles.ten}>
                                <TextField
                                    label="Name of Game"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    value={this.state.game}
                                    onChange={this.handleGame}
                                />
                                <center>
                                    <TextField
                                        id="date"
                                        label="Date of Game"
                                        type="date"
                                        value={this.state.date}
                                        onChange={this.handleDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </center>
                                <br></br>
                                <center>
                                    <Button className={styles.buttonten2} variant="outlined" onClick={() => this.handleAdd(this.state.game, this.state.date)}>Start</Button>
                                </center>
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
                                You already have a game with this name. You must enter a unique name for your game.
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

export default NewGame;

ReactDOM.render(
    <NewGame />,
    document.getElementById('newgame')
);