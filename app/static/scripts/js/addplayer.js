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

class AddPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            number: "",
        };
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleFirst(event) {
        this.setState({
            first: event.target.value
        });
    };

    handleLast(event) {
        this.setState({
            last: event.target.value,
        });
    };

    handleNumber(event) {
        this.setState({
            number: event.target.value,
        });
    };

    handlePlay(event) {
        this.setState({
            number: event.target.value,
        });
    };

    handleAdd(first, last, number) {
        $.ajax({
            url: '/addplayer',
            data: { 'first': first, 'last': last, 'number': number },
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
                            label="First Name"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="filled"
                            value={this.state.first}
                            onChange={this.handleFirst}
                        />
                        <TextField
                            id="filled-email-input"
                            label="Last Name"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="filled"
                            value={this.state.last}
                            onChange={this.handleLast}
                        />
                        <TextField
                            id="filled-email-input"
                            label="Number"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="filled"
                            value={this.state.number}
                            onChange={this.handleNumber}
                        />
                        <Button variant="outlined" href='home' onClick={() => this.handleAdd(this.state.first, this.state.last, this.state.number)}>Add Player</Button>
                    </CardActions>
                </CardContent>
            </Card>
        )
    }
}

export default AddPlayer;

ReactDOM.render(
    <AddPlayer />,
    document.getElementById('addplayer')
);