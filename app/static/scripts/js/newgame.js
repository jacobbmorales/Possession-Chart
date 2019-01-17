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

class NewGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: "",
        };
        this.handleGame = this.handleGame.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleGame(event) {
        this.setState({
            game: event.target.value
        });
    };

    handleAdd(game) {
        $.ajax({
            url: '/newgame',
            data: { 'game': game, click: 'true' },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/offense/' + game
            }
        });

    };
    render() {
        return (
            <div>
                <Card className={styles.logoleft}>
                </Card>
                <Card className={styles.logoright}>
                </Card>
                <Card className={styles.newgame}>
                    <CardContent>
                        <CardActions>
                            <div className={styles.ten}>
                                <TextField
                                    id="filled-email-input"
                                    label="Name of Game"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="filled"
                                    value={this.state.game}
                                    onChange={this.handleGame}
                                />
                                <br></br>
                                <center>
                                    <Button variant="outlined" onClick={() => this.handleAdd(this.state.game)}>Start</Button>
                                </center>
                            </div>
                        </CardActions>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default NewGame;

ReactDOM.render(
    <NewGame />,
    document.getElementById('newgame')
);