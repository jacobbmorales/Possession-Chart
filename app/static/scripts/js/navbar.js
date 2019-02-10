import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styles from '../../css/style.css';
import Typography from '@material-ui/core/Typography';
import $ from "jquery";
injectTapEventPlugin();

const theme = createMuiTheme({
    palette: {
         primary: { 500 : '#E9791D' },
         secondary: {main: '#ffffff' }
       },
       root:
       {
        fontFamily: 'kionaregular'
      }
     });

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
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static" color="primary" className={styles.navbar}>
                        <Toolbar>
                            <Button style={theme.root} color={'secondary'} className={styles.navbarbutton} href='/' >Home</Button>
                            <Button style={theme.root} color={'secondary'} className={styles.navbarbutton} href='/newgame'>New Game</Button>
                            <Button style={theme.root} color={'secondary'} className={styles.navbarbutton} href='/addplayer'>Edit Roster</Button>
                            <Button style={theme.root} color={'secondary'} className={styles.navbarbutton} href='/addplay'>Edit Plays</Button>
                            <Button style={theme.root} color={'secondary'} className={styles.navbarbutton} href='/season/None'>Season Statistics</Button>
                            <Button style={theme.root} color={'secondary'} className={styles.navbarbutton} href='/games'>Completed Games</Button>
                            <Typography style={theme.root} variant="display1" color={'secondary'} className={styles.kiona}>{window.username}</Typography>
                            <div className={styles.navbarsignout}>
                            <Button style={theme.root} color={'secondary'} onClick={() => this.handleSignout()}>Signout</Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div >
        )
    }
}

export default withStyles(styles)(Navbar);

ReactDOM.render(
    <Navbar />,
    document.getElementById('navbar')
);