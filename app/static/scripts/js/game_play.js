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

class Game_Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.updatePlayerSelected = this.updatePlayerSelected.bind(this);

    }

    updatePlayerSelected(game, play, player) {
        console.log(play)
        $.ajax({
            url: '/'+game+'/plays/'+play,
            data: { player: player},
            type: 'POST',
            success: function(response){
                console.log(play)
                document.write(response)
                window.location.href = '/'+game+'/'+play+'/'+player
            }
        });
    }


    render() {
        var players = []
        var players_used = []
        var game = window.game
        var play = window.play
        var player = window.player_names
        var player_pct = window.player_values
        var used_player = window.ind_names
        var used_player_pct = window.ind_values
        var used_player_id = window.used_player_id
        var eff_player_id = window.eff_player_id
        var zone_used = window.zone_used
        var zone_eff= window.zone_eff
        var key
        for (key in player) {
            players.push({
                key: player_pct[key] + '%',
                value: player[key],
                id: eff_player_id[key]
            });
        }
        for (key in used_player) {
            players_used.push({
                key: used_player_pct[key] + '%',
                value: used_player[key],
                id: used_player_id[key]
            });
        }
        return (
            <div>
                <Card className={styles.logoleft}>
                </Card>
                <MenuList subheader={<ListSubheader><center><h6>Most Efficient Player</h6></center></ListSubheader>} className={styles.right}>
                    {players.map((player) => (
                        <div>
                            <MenuItem
                                key={player.key}
                                onClick={() => this.updatePlayerSelected(game, play, player.id)}
                            >
                                <ListItemText primary={player.value} secondary={player.key} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
                <Card className={styles.courtdisplay2}>
                    <Card className={styles.corner} >
                    Used: {zone_used[0]}%
                    Efficiency: {zone_eff[0]}%
                    </Card>
                    <Card className={styles.shortcorner} >
                    Used: {zone_used[1]}%
                    Efficiency: {zone_eff[1]}%
                    </Card>
                    <Card className={styles.paint} >
                    Used: {zone_used[2]}%
                    Efficiency: {zone_eff[2]}%
                    </Card>
                    <Card className={styles.shortcorner2} >
                    Used: {zone_used[3]}%
                    Efficiency: {zone_eff[3]}%
                    </Card>
                    <Card className={styles.corner2} >
                    Used: {zone_used[4]}%
                    Efficiency: {zone_eff[4]}%
                    </Card>
                    <Card className={styles.twowing} >
                    Used: {zone_used[5]}%
                    Efficiency: {zone_eff[5]}%
                    </Card>
                    <Card className={styles.upperpaint} >
                    Used: {zone_used[6]}%
                    Efficiency: {zone_eff[6]}%
                    </Card>
                    <Card className={styles.twowing2} >
                    Used: {zone_used[7]}%
                    Efficiency: {zone_eff[7]}%
                    </Card>
                    <Card className={styles.topkey} >
                    Used: {zone_used[8]}%
                    Efficiency: {zone_eff[8]}%
                    </Card>
                    <Card className={styles.wing} >
                    Used: {zone_used[9]}%
                    Efficiency: {zone_eff[9]}%
                    </Card>
                    <Card className={styles.top} >
                    Used: {zone_used[10]}%
                    Efficiency: {zone_eff[10]}%
                    </Card>
                    <Card className={styles.wing2} >
                    Used: {zone_used[11]}%
                    Efficiency: {zone_eff[11]}%
                    </Card>


                </Card>
                <MenuList subheader={<ListSubheader><center><h6>Most Used Player</h6></center></ListSubheader>} className={styles.right}>
                    {players_used.map((player) => (
                        <div>
                            <MenuItem
                                key={player.key}
                                onClick={() => this.updatePlayerSelected(game, play, player.id)}
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

export default Game_Play;

ReactDOM.render(
    <Game_Play />,
    document.getElementById('game_play')
);