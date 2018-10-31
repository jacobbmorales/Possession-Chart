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

class AddPlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            play: "",
        };
        this.handlePlay = this.handlePlay.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handlePlay(event) {
        this.setState({
            play: event.target.value
        });
    };

    handleAdd(play) {
        $.ajax({
            url: '/addplay',
            data: { 'play': play},
            type: 'POST',
        });

    };
    render() {
        return (
            <Card className={styles.signin}>
                <CardContent>
                    <CardActions>
                        <TextField
                            id="filled-email-input"
                            label="Name of Play"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="filled"
                            value={this.state.play}
                            onChange={this.handlePlay}
                        />
                        <Button variant="outlined" href='home' onClick={() => this.handleAdd(this.state.play)}>Add Play</Button>
                    </CardActions>
                </CardContent>
            </Card>
        )
    }
}

export default AddPlay;

ReactDOM.render(
    <AddPlay />,
    document.getElementById('addplay')
);