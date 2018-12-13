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

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.updatePlayerSelected = this.updatePlayerSelected.bind(this);
        
    }

    updatePlayerSelected(selectedIndex) {
        console.log(selectedIndex)
    }
    

    render() {
        var players = []
        var players_used = []
        var player = window.player_names
        var player_pct = window.player_values
        var used_player = window.ind_names
        var used_player_pct = window.ind_values
        var used_player_id = window.used_player_id
        var eff_player_id = window.eff_player_id
        var key
        for (key in player) {
            players.push({
                key: player_pct[key],
                value: player[key],
                id: eff_player_id[key]
            });
        }
        for (key in used_player) {
            players_used.push({
                key: used_player_pct[key],
                value: used_player[key],
                id: used_player_id[key]
            });
        }
        return (
            <div>
                <MenuList subheader={<ListSubheader>Most Efficient Player</ListSubheader>} className={styles.right}>
                    {players.map((player) => (
                        <div>
                            <MenuItem
                                key={player.key}
                                onClick={() => this.updatePlayerSelected(player.id)}
                            >
                                <ListItemText primary={player.value} secondary={player.key} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
                <MenuList subheader={<ListSubheader>Most Used Player</ListSubheader>} className={styles.right}>
                    {players_used.map((player) => (
                        <div>
                            <MenuItem
                                key={player.key}
                                onClick={() => this.updatePlayerSelected(player.id)}
                            >
                                <ListItemText primary={player.value} secondary={player.key} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
            </div>
        )
    }
}

export default Play;

ReactDOM.render(
    <Play />,
    document.getElementById('play')
);