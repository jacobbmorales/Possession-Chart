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

class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: 0
        };
        this.handleGame = this.handleGame.bind(this);
    }

    handleGame(game) {
        $.ajax({
            url: '/games',
            data: { game: game },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/game/' + game + '/None'
            }
        });

    };

    render() {
        var temp = (window.games)
        var games = [];
        var game_id = (window.game_id)
        var date = (window.date)
        var key;
        for (key in temp) {
            games.push({
                key: game_id[key],
                value: temp[key].toString(),
                date: date[key].toString(),
            });
        }
        return (
            <div>
                <MenuList subheader={<ListSubheader><center><h3>Games</h3></center></ListSubheader>} className={styles.gamelist}>
                    <MenuItem disabled={true}>
                        <ListItemText className={styles.left200} primary="GAME" />
                        <ListItemText className={styles.left800} primary="DATE" />
                    </MenuItem>
                    {games.map((name) => (
                        <div>
                            <MenuItem
                                key={name.key}
                                onClick={() => this.handleGame(name.key)}
                            >
                                <ListItemText className={styles.left200} primary={name.value} />
                                <ListItemText className={styles.left800} primary={name.date} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
            </div>
        )
    }
}

export default Games;

ReactDOM.render(
    <Games />,
    document.getElementById('games')
);