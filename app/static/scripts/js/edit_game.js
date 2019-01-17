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
import CardActionArea from '@material-ui/core/CardActionArea';
import styles from '../../css/style.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import $ from "jquery";
import { orange } from '@material-ui/core/colors';
injectTapEventPlugin();

class EditGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: 0,
            play: 0,
            possession: 1,
            zone: 1,
            result: '',
            game: '',
            open: false,
            add: 'false'
        };
        this.editPossession = this.editPossession.bind(this);
        this.updatePlayerSelected = this.updatePlayerSelected.bind(this);
        this.updatePlaySelected = this.updatePlaySelected.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.addPossession = this.addPossession.bind(this);
        this.delete = this.delete.bind(this);
    }

    editPossession(possession, player, play, zone, result) {
        this.setState({
            possession: possession,
            player: player,
            play: play,
            zone: zone,
            result: result,
            open: true
        });
    };
    addPossession(next) {
        this.setState({
            add: 'true',
            possession: next,
            open: true
        });
    }
    updatePlayerSelected(selectedIndex) {
        this.setState({ player: selectedIndex });
    }
    updatePlaySelected(selectedIndex) {
        this.setState({ play: selectedIndex });
    }

    updateZone(zone) {
        this.setState({ zone: zone });
        console.log(zone)
    }

    handleResult(result) {
        this.setState({ result: result });

    };
    handleEdit(add, possession, play, player, zone, result, game) {
        $.ajax({
            url: '/edit/game/' + game,
            data: { 'add': add, 'possession': possession, 'play': play, 'player': player, 'zone': zone, 'result': result },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/edit/game/' + game
            }
        });

    };
    delete(game) {
        $.ajax({
            url: '/edit/game/' + game,
            data: { 'delete': 'true', 'game': game },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/games'
            }
        });
    };

    render() {
        var game = window.game
        var possession = window.possession
        var next = possession.length + 1
        var play = window.play
        var player = window.player
        var play_id = window.play_id
        var player_id = window.player_id
        var play_name = window.play_name
        var play_id_list = window.play_id_list
        var player_name = window.player_name
        var player_number = window.player_number
        var player_id_list = window.player_id_list
        var zone = window.zone
        var result = window.result
        var possessions = []
        var players = []
        var plays = []
        var key;
        for (key in possession) {
            possessions.push({
                possession: possession[key],
                play: play[key],
                player: player[key],
                play_id: play_id[key],
                player_id: player_id[key],
                zone: zone[key],
                result: result[key],
            });
        }
        for (key in player_name) {
            players.push({
                value: player_number[key] + ' - ' + player_name[key].toString(),
                number: player_number[key],
                name: player_name[key].toString(),
                id: player_id_list[key]
            });
        }
        for (key in play_name) {
            plays.push({
                name: play_name[key].toString(),
                id: play_id_list[key]
            });
        }
        return (
            <div>
                <MenuList subheader={<ListSubheader><center><h3>Possessions</h3></center></ListSubheader>} className={styles.gamelist}>
                    <MenuItem disabled={true}>
                        <ListItemText primary="POSSESSION" />
                        <ListItemText primary="PLAY" />
                        <ListItemText primary="PLAYER" />
                        <ListItemText primary="ZONE" />
                        <ListItemText primary="RESULT" />
                    </MenuItem>
                    <Divider inset={false} />
                    {possessions.map((possession) => (
                        <div>
                            <MenuItem
                                key={possession.possession}
                                onClick={() => this.editPossession(possession.possession, possession.player_id, possession.play_id, possession.zone, possession.result)}
                            >
                                <ListItemText primary={possession.possession} />
                                <ListItemText primary={possession.play} />
                                <ListItemText primary={possession.player} />
                                <ListItemText primary={possession.zone} />
                                <ListItemText primary={possession.result} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
                <Card className={styles.editgame2}>
                    <CardContent>
                        <Button variant="outlined" className={styles.ten} onClick={() => this.addPossession(next)}>Add a Possession</Button>
                        <Button variant="outlined" className={styles.ten} onClick={() => this.delete(game)}>Delete Game</Button>
                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullScreen={true}
                >
                    <DialogTitle id="form-dialog-title"><center>Edit Possession</center></DialogTitle>
                    <DialogContent>
                        <MenuList subheader={<ListSubheader><center><h3>Player</h3></center></ListSubheader>} className={styles.left}>
                            {players.map((player) => (
                                <div>
                                    <MenuItem
                                        key={player.id}
                                        onClick={() => this.updatePlayerSelected(player.id)}
                                    >
                                        <ListItemText primary={player.value} />
                                    </MenuItem>
                                    <Divider inset={false} />
                                </div>
                            ))}
                        </MenuList>
                        <Card className={styles.court}>
                            <Card className={styles.corner} >
                                <CardActionArea onClick={() => this.updateZone(1)}>
                                    <Button variant="outlined" className={styles.cornershape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.shortcorner} >
                                <CardActionArea onClick={() => this.updateZone(2)}>
                                    <Button variant="outlined" className={styles.shortcornershape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.paint} >
                                <CardActionArea onClick={() => this.updateZone(3)}>
                                    <Button variant="outlined" className={styles.paintshape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.shortcorner2} >
                                <CardActionArea onClick={() => this.updateZone(4)}>
                                    <Button variant="outlined" className={styles.shortcorner2shape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.corner2} >
                                <CardActionArea onClick={() => this.updateZone(5)}>
                                    <Button variant="outlined" className={styles.corner2shape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.twowing} >
                                <CardActionArea onClick={() => this.updateZone(6)}>
                                    <Button variant="outlined" className={styles.twowingshape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.upperpaint} >
                                <CardActionArea onClick={() => this.updateZone(7)}>
                                    <Button variant="outlined" className={styles.upperpaintshape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.twowing2} >
                                <CardActionArea onClick={() => this.updateZone(8)}>
                                    <Button variant="outlined" className={styles.twowing2shape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.topkey} >
                                <CardActionArea onClick={() => this.updateZone(9)}>
                                    <Button variant="outlined" className={styles.topkeyshape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.wing} >
                                <CardActionArea onClick={() => this.updateZone(10)}>
                                    <Button variant="outlined" className={styles.wingshape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.top} >
                                <CardActionArea onClick={() => this.updateZone(11)}>
                                    <Button variant="outlined" className={styles.topshape} ></Button>
                                </CardActionArea>
                            </Card>
                            <Card className={styles.wing2} >
                                <CardActionArea onClick={() => this.updateZone(12)}>
                                    <Button variant="outlined" className={styles.wing2shape} ></Button>
                                </CardActionArea>
                            </Card>


                        </Card>
                        <MenuList subheader={<ListSubheader><center><h3>Play</h3></center></ListSubheader>} className={styles.right}>
                            {plays.map((play) => (
                                <div>
                                    <MenuItem
                                        key={play.id}
                                        onClick={() => this.updatePlaySelected(play.id)}
                                    >
                                        <ListItemText primary={play.name} />
                                    </MenuItem>
                                    <Divider inset={false} />
                                </div>
                            ))}
                        </MenuList>
                        <Card className={styles.menu}>
                            <CardContent>
                                <CardActions>
                                    <div className={styles.ten}>
                                        <Button variant="outlined" onClick={() => this.handleResult('make')}>Make</Button>
                                        <Button variant="outlined" onClick={() => this.handleResult('miss')}>Miss</Button>
                                        <Button variant="outlined" onClick={() => this.handleResult('turnover')}>Turnover</Button>
                                        <br></br>
                                        <center>
                                            <Button variant="outlined" onClick={() => this.handleEdit(this.state.add, this.state.possession, this.state.play, this.state.player, this.state.zone, this.state.result, game)}>Save</Button>
                                        </center>
                                    </div>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default EditGame;

ReactDOM.render(
    <EditGame />,
    document.getElementById('edit_game')
);