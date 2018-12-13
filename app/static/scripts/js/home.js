import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
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
            game: 0
        };
        this.handleSignout = this.handleSignout.bind(this);
        this.handleGame = this.handleGame.bind(this);
    }

    handleSignout() {
        $.ajax({
            url: '/home',
            data: { 'signout': 'true'},
            type: 'POST',
            success: function(response){
                document.write(response)
                window.location.href = '/'
            }
        });

    };

    handleGame(game) {
        $.ajax({
            url: '/home',
            data: { game: game},
            type: 'POST',
            success: function(response){
                document.write(response)
                window.location.href = '/game/'+game
            }
        });

    };

    render() {
        var data = window.data
        var most_used = data[0]
        var efficient = data[1]
        var temp = (window.games)
        var games = [];
        var game_id = (window.game_id)
        var key;
        for (key in temp) {
            games.push({
                key: game_id[key],
                value: temp[key].toString(),
            });
        }
        return (
            <div>
            <Card>
                <CardContent>
                    <CardActions>
                        <Button variant="outlined" href='/addplayer'>Add Player</Button>
                        <Button variant="outlined" href='/addplay'>Add Play</Button>
                        <Button variant="outlined" href='/newgame'>New Game</Button>
                        <Button variant="outlined" href='/plays'>Play Data</Button>
                        <Button variant="outlined" onClick={() => this.handleSignout()}>Signout</Button>
                    </CardActions>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <CardActions>
                        <Typography>
                            Most used play:
                            <br></br>
                                {most_used}
                        </Typography>
                    </CardActions>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <CardActions>
                        <Typography>
                            Most efficient play:
                            <br></br>
                                {efficient}
                        </Typography>
                    </CardActions>
                </CardContent>
            </Card>
            <MenuList subheader={<ListSubheader>Games</ListSubheader>} className={styles.right}>
                    {games.map((name) => (
                        <div>
                            <MenuItem
                                key={name.key}
                                onClick={() => this.handleGame(name.key)}
                            >
                                <ListItemText primary={name.value} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
            </div>
        )
    }
}

export default Home;

ReactDOM.render(
    <Home />,
    document.getElementById('home')
);