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
            date: "1892-03-11"
        };
        this.handleGame = this.handleGame.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }

    handleGame(event) {
        this.setState({
            game: event.target.value
        });
    };

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
                window.location.href = '/offense/' + game
            }
        });

    };
    render() {
        return (
            <div>
                <div className={styles.logoleft}/>
                <div className={styles.logoright}/>
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
            </div>
        )
    }
}

export default NewGame;

ReactDOM.render(
    <NewGame />,
    document.getElementById('newgame')
);