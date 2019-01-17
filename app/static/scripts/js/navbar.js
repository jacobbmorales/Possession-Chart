import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styles from '../../css/style.css';
import $ from "jquery";
injectTapEventPlugin();


class Navbar extends React.Component {
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
            data: { 'signout': 'true' },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/'
            }
        });

    };

    render() {
        return (
            <div>
                    <AppBar position="static" className={styles.navbar}>
                        <Toolbar>
                            <Button variant="outlined" className={styles.navbarbutton} href='/' >Home</Button>
                            <Button variant="outlined" className={styles.navbarbutton} href='/addplayer'>Edit Roster</Button>
                            <Button variant="outlined" className={styles.navbarbutton} href='/addplay'>Edit Plays</Button>
                            <Button variant="outlined" className={styles.navbarbutton} href='/newgame'>New Game</Button>
                            <Button variant="outlined" className={styles.navbarbutton} href='/season'>Season Statistics</Button>
                            <Button variant="outlined" className={styles.navbarbutton} href='/games'>Completed Games</Button>
                            <Button variant="outlined" className={styles.navbarbutton} onClick={() => this.handleSignout()}>Signout</Button>
                        </Toolbar>
                    </AppBar>
            </div >
        )
    }
}

export default Navbar;

ReactDOM.render(
    <Navbar />,
    document.getElementById('navbar')
);