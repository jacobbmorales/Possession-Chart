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
            add: 'false',
            confirm: false
        };
        this.editPossession = this.editPossession.bind(this);
        this.updatePlayerSelected = this.updatePlayerSelected.bind(this);
        this.updatePlaySelected = this.updatePlaySelected.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.addPossession = this.addPossession.bind(this);
        this.delete = this.delete.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleConfirm() {
        this.setState({
            confirm: true,
        });
    };

    handleClose() {
        this.setState({
            confirm: false,
            open: false,
        });
    };

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
        const playerSelected = String(this.state.player);
        const playSelected = this.state.play;
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
        var number = window.number
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
                player: number[key] + ' - ' + player[key],
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
                <Dialog
                    open={this.state.confirm}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogActions>
                        <div className={styleMedia.ten}>
                            <Typography>
                                <center>Are you sure you want to delete this game?</center>
                            </Typography>
                            <Button variant="outlined" onClick={() => { this.handleClose() }} color="primary">Do Not Delete</Button>
                            <Button variant="outlined" onClick={() => { this.delete(game) }} color="primary">Delete Game</Button>
                        </div>
                    </DialogActions>
                </Dialog>
                <Card className={styles.editgame2}>
                    <CardContent>
                        <Button variant="outlined" className={styles.buttonten} onClick={() => this.addPossession(next)}>Add a Possession</Button>
                        <center>
                            <Button variant="outlined" className={styles.buttonten2} onClick={() => this.handleConfirm()}>Delete Game</Button>
                        </center>
                    </CardContent>
                </Card>
                <MenuList subheader={<ListSubheader><center><h3>Possessions</h3></center></ListSubheader>} className={styles.possessionlist}>
                    <MenuItem disabled={true}>
                        <ListItemText primary="POSSESSION" />
                        <ListItemText className={styles.left200} primary="PLAY" />
                        <ListItemText className={styles.left400} primary="PLAYER" />
                        <ListItemText className={styles.left600} primary="ZONE" />
                        <ListItemText className={styles.left800} primary="RESULT" />
                    </MenuItem>
                    <Divider inset={false} />
                    {possessions.map((possession) => (
                        <div>
                            <MenuItem
                                key={possession.possession}
                                onClick={() => this.editPossession(possession.possession, possession.player_id, possession.play_id, possession.zone, possession.result)}
                            >
                                <ListItemText primary={possession.possession} />
                                <ListItemText className={styles.left200} primary={possession.play} />
                                <ListItemText className={styles.left400} primary={possession.player} />
                                <ListItemText className={styles.left600} primary={possession.zone} />
                                <ListItemText className={styles.left800} primary={possession.result} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullScreen={true}
                    className={styles.background}
                >
                    <DialogTitle id="form-dialog-title"><center>Edit Possession</center></DialogTitle>
                    <DialogContent>
                        <MenuList subheader={<ListSubheader><center><h3>Player</h3></center></ListSubheader>} className={styles.right}>
                            {players.map((player) => (
                                <div>
                                    <MenuItem
                                        key={player.id}
                                        onClick={() => this.updatePlayerSelected(player.id)}
                                        selected={playerSelected === player.id}
                                        classes={{ selected: styles.primary }}
                                    >
                                        <ListItemText primary={player.value} />
                                    </MenuItem>
                                    <Divider inset={false} />
                                </div>
                            ))}
                        </MenuList>
                        <Card className={styles.court}>
                            <svg id="basketball" x="0px" y="0px" viewBox="0 0 1280 1024">
                                <rect onClick={() => this.updateZone(1)} x="25" y="31" class="zone" width="180" height="426" />
                                <rect onClick={() => this.updateZone(5)} x="1073" y="31" class="zone" width="180" height="426" />
                                <rect onClick={() => this.updateZone(2)} x="205" y="31" class="zone" width="234" height="250" />
                                <rect onClick={() => this.updateZone(4)} x="839" y="31" class="zone" width="234" height="250" />
                                <rect onClick={() => this.updateZone(3)} x="439" y="31" class="zone" width="400" height="250" />
                                <rect onClick={() => this.updateZone(7)} x="439" y="281" class="zone" width="400" height="250" />
                                <rect onClick={() => this.updateZone(10)} x="25" y="457" class="zone" width="414" height="345" />
                                <rect onClick={() => this.updateZone(12)} x="839" y="457" class="zone" width="414" height="345" />
                                <path onClick={() => this.updateZone(11)} class="zone" d="M439,687.6v114.5h400v-115c-61,28.4-128.9,44.3-200.5,44.3C567.3,731.5,499.7,715.8,439,687.6z" />
                                <path onClick={() => this.updateZone(9)} class="zone" d="M439,531v156.6c60.7,27.8,128.3,43.4,199.5,43.4c71.6,0,139.5-15.7,200.5-43.8V531H439z" />
                                <path onClick={() => this.updateZone(6)} class="zone" d="M205,457h0.1c0-0.1-0.1-0.2-0.1-0.3V457z" />
                                <path onClick={() => this.updateZone(6)} class="zone" d="M205,281v175.7c0,0.1,0.1,0.2,0.1,0.3C253.5,558.7,336.5,640.7,439,687.6V531v-74V281H205z" />
                                <path onClick={() => this.updateZone(1)} class="zone" d="M1073,457v-2.4c-0.4,0.8-0.8,1.6-1.2,2.4H1073z" />
                                <path onClick={() => this.updateZone(8)} class="zone" d="M839,281v176v74v156.2c102-47,184.7-128.8,232.8-230.2c0.4-0.8,0.8-1.6,1.2-2.4V281H839z" />
                            </svg>
                        </Card>
                        <MenuList subheader={<ListSubheader><center><h3>Play</h3></center></ListSubheader>} className={styles.left}>
                            {plays.map((play) => (
                                <div>
                                    <MenuItem
                                        key={play.id}
                                        onClick={() => this.updatePlaySelected(play.id)}
                                        selected={playSelected === play.id}
                                        classes={{ selected: styles.primary }}
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