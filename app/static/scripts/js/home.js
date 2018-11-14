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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signout: 'true',
        };
        this.handleSignout = this.handleSignout.bind(this);
    }

    handleSignout() {
        $.ajax({
            url: '/home',
            data: { 'signout': 'true'},
            type: 'POST',
        });

    };

    render() {
        return (
            <Card className={styles.signin}>
                <CardContent>
                    <CardActions>
                        <Button variant="outlined" href='/addplayer'>Add Player</Button>
                        <Button variant="outlined" href='/addplay'>Add Play</Button>
                        <Button variant="outlined" href='/offense'>New Game</Button>
                        <Button variant="outlined" onClick={() => this.handleSignout()}>Signout</Button>
                    </CardActions>
                </CardContent>
            </Card>
        )
    }
}

export default Home;

ReactDOM.render(
    <Home />,
    document.getElementById('home')
);