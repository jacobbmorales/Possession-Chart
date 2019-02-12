import React from 'react';
import ReactDOM from 'react-dom';
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
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../../css/style.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import $ from "jquery";
injectTapEventPlugin();

class EditGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerSelected: 'None',
            playSelected: 'None',
            possession: 1,
            zone: 'None',
            result: 'None',
            game: '',
            open: false,
            add: 'false',
            confirm: false,
            class1: 'zonedisplay',
            class2: 'zonedisplay',
            class3: 'zonedisplay',
            class4: 'zonedisplay',
            class5: 'zonedisplay',
            class6: 'zonedisplay',
            class7: 'zonedisplay',
            class8: 'zonedisplay',
            class9: 'zonedisplay',
            class10: 'zonedisplay',
            class11: 'zonedisplay',
            class12: 'zonedisplay',
            result: 'None',
            make: 'offense',
            miss: 'offense',
            turnover: 'offense',
            errormessage: '',
            errordialog: false
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
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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
    handleCloseError() {
        this.setState({
            errordialog: false,
        });
    };
    updateZone(zone) {
        this.setState({
            zone: zone,
            class1: 'zonedisplay',
            class2: 'zonedisplay',
            class3: 'zonedisplay',
            class4: 'zonedisplay',
            class5: 'zonedisplay',
            class6: 'zonedisplay',
            class7: 'zonedisplay',
            class8: 'zonedisplay',
            class9: 'zonedisplay',
            class10: 'zonedisplay',
            class11: 'zonedisplay',
            class12: 'zonedisplay',
        });


        if (zone == '1') {
            this.setState({
                class1: "blackzone"
            });
        }
        if (zone == '2') {
            this.setState({
                class2: "blackzone"
            });
        }
        if (zone == '3') {
            this.setState({
                class3: "blackzone"
            });
        }
        if (zone == '4') {
            this.setState({
                class4: "blackzone"
            });
        }
        if (zone == '5') {
            this.setState({
                class5: "blackzone"
            });
        }
        if (zone == '6') {
            this.setState({
                class6: "blackzone"
            });
        }
        if (zone == '7') {
            this.setState({
                class7: "blackzone"
            });
        }
        if (zone == '8') {
            this.setState({
                class8: "blackzone"
            });
        }
        if (zone == '9') {
            this.setState({
                class9: "blackzone"
            });
        }
        if (zone == '10') {
            this.setState({
                class10: "blackzone"
            });
        }
        if (zone == '11') {
            this.setState({
                class11: "blackzone"
            });
        }
        if (zone == '12') {
            this.setState({
                class12: "blackzone"
            });
        }
    };
    handleResult(result) {
        this.setState({
            result: result,
            make: 'offense',
            miss: 'offense',
            turnover: 'offense'
        })
        if (result == 'make') {
            this.setState({ make: 'offenseclicked' })
        }
        if (result == 'miss') {
            this.setState({ miss: 'offenseclicked' })
        }
        if (result == 'turnover') {
            this.setState({ turnover: 'offenseclicked' })
        }
    };
    editPossession(possession, player, play, zone, result) {
        this.setState({
            possession: possession,
            playerSelected: player,
            playSelected: play,
            zone: zone,
            result: result,
            open: true,
            class1: 'zonedisplay',
            class2: 'zonedisplay',
            class3: 'zonedisplay',
            class4: 'zonedisplay',
            class5: 'zonedisplay',
            class6: 'zonedisplay',
            class7: 'zonedisplay',
            class8: 'zonedisplay',
            class9: 'zonedisplay',
            class10: 'zonedisplay',
            class11: 'zonedisplay',
            class12: 'zonedisplay',
            make: 'offense',
            miss: 'offense',
            turnover: 'offense'
        })
        if (result == 'make') {
            this.setState({ make: 'offenseclicked' })
        }
        if (result == 'miss') {
            this.setState({ miss: 'offenseclicked' })
        }
        if (result == 'turnover') {
            this.setState({ turnover: 'offenseclicked' })
        }


        if (zone == '1') {
            this.setState({
                class1: "blackzone"
            });
        }
        if (zone == '2') {
            this.setState({
                class2: "blackzone"
            });
        }
        if (zone == '3') {
            this.setState({
                class3: "blackzone"
            });
        }
        if (zone == '4') {
            this.setState({
                class4: "blackzone"
            });
        }
        if (zone == '5') {
            this.setState({
                class5: "blackzone"
            });
        }
        if (zone == '6') {
            this.setState({
                class6: "blackzone"
            });
        }
        if (zone == '7') {
            this.setState({
                class7: "blackzone"
            });
        }
        if (zone == '8') {
            this.setState({
                class8: "blackzone"
            });
        }
        if (zone == '9') {
            this.setState({
                class9: "blackzone"
            });
        }
        if (zone == '10') {
            this.setState({
                class10: "blackzone"
            });
        }
        if (zone == '11') {
            this.setState({
                class11: "blackzone"
            });
        }
        if (zone == '12') {
            this.setState({
                class12: "blackzone"
            });
        }
    };
    addPossession(next) {
        this.setState({
            add: 'true',
            possession: next,
            open: true
        });
    }
    updatePlayerSelected(selectedIndex) {
        this.setState({ playerSelected: selectedIndex });
    }
    updatePlaySelected(selectedIndex) {
        this.setState({ playSelected: selectedIndex });
    }

    handleEdit(game) {
        if (this.state.playSelected == 'None') {
            this.setState({
                errormessage: 'You must select a play!',
                errordialog: true,
            })
        }
        else if (this.state.playerSelected == 'None') {
            this.setState({
                errormessage: 'You must select a player!',
                errordialog: true,
            })
        }
        else if (this.state.result == 'None') {
            this.setState({
                errormessage: 'You must select a result!',
                errordialog: true,
            })
        }
        else if (this.state.zone == 'None') {
            this.setState({
                errormessage: 'You must select a zone!',
                errordialog: true,
            })
        }
        else {
            $.ajax({
                url: '/edit/game/' + game,
                data: { 'add': this.state.add, 'possession': this.state.possession, 'play': this.state.playSelected, 'player': this.state.playerSelected, 'zone': this.state.zone, 'result': this.state.result, game: game },
                type: 'POST',
                success: function (response) {
                    document.write(response)
                    window.location.href = '/edit/game/' + game
                }
            });
        }

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
        const playerSelected = String(this.state.playerSelected);
        const playSelected = this.state.playSelected;
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
                            &nbsp;
                            <center>
                                <Button variant="outlined" onClick={() => { this.handleClose() }} >Do Not Delete</Button>
                                &nbsp;
                            <Button variant="outlined" onClick={() => { this.delete(game) }} >Delete Game</Button>
                            </center>
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
                <MenuList subheader={<ListSubheader><center><h3>Edit Possessions</h3></center></ListSubheader>} className={styles.possessionlist}>
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
                    <div className={styles.right0}>
                    <MenuList subheader={<ListSubheader><center>Players</center></ListSubheader>} >
                        {players.map((name) => (
                            <div>
                                <MenuItem
                                    key={name.id}
                                    onClick={() => this.updatePlayerSelected(name.id)}
                                    selected={playerSelected === name.id}
                                    classes={{ selected: styles.primary }}
                                >
                                    <ListItemText primary={name.value} />
                                </MenuItem>
                                <Divider inset={false} />
                            </div>
                        ))}
                    </MenuList>
                    </div>
                    <div className={styles.left0}>
                    <MenuList subheader={<ListSubheader><center>Plays</center></ListSubheader>}  >
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
                    </div>
                    <Card className={styles.court}>
                        <svg id="basketball" x="0px" y="0px" viewBox="0 0 1280 1024">

                            //zone 1
                            <rect onClick={() => this.updateZone(1)} x="25" y="31" class={this.state.class1} width="180" height="426" />
                            //zone 2
                            <rect onClick={() => this.updateZone(2)} x="205" y="31" class={this.state.class2} width="234" height="250" />

                            //zone 3
                            <rect onClick={() => this.updateZone(3)} x="439" y="31" class={this.state.class3} width="400" height="250" />

                            //zone 4 
                            <rect onClick={() => this.updateZone(4)} x="839" y="31" class={this.state.class4} width="234" height="250" />

                            //zone 5
                            <rect onClick={() => this.updateZone(5)} x="1073" y="31" class={this.state.class5} width="180" height="426" />

                            //zone 10
                            <rect onClick={() => this.updateZone(10)} x="25" y="457" class={this.state.class10} width="414" height="345" />

                            //zone 12
                            <rect onClick={() => this.updateZone(12)} x="839" y="457" class={this.state.class12} width="414" height="345" />

                            //zone 6
                            <path onClick={() => this.updateZone(6)} class={this.state.class6} d="M205,457h0.1c0-0.1-0.1-0.2-0.1-0.3V457z" />
                            <path onClick={() => this.updateZone(6)} class={this.state.class6} d="M205,281v175.7c0,0.1,0.1,0.2,0.1,0.3C253.5,558.7,336.5,640.7,439,687.6V531v-74V281H205z" />

                            //zone 7
                            <rect onClick={() => this.updateZone(7)} x="439" y="281" class={this.state.class7} width="400" height="250" />

                            //zone 8
                            <path onClick={() => this.updateZone(8)} class={this.state.class8} d="M839,281v176v74v156.2c102-47,184.7-128.8,232.8-230.2c0.4-0.8,0.8-1.6,1.2-2.4V281H839z" />

                            //zone 9
                            <path onClick={() => this.updateZone(9)} class={this.state.class9} d="M439,531v156.6c60.7,27.8,128.3,43.4,199.5,43.4c71.6,0,139.5-15.7,200.5-43.8V531H439z" />

                            //zone 11
                            <path onClick={() => this.updateZone(11)} class={this.state.class11} d="M439,687.6v114.5h400v-115c-61,28.4-128.9,44.3-200.5,44.3C567.3,731.5,499.7,715.8,439,687.6z" />

                        </svg>
                    </Card>
                    <Card className={styles.menu}>
                        <CardContent>
                            <CardActions>
                                <div className={styles.ten}>
                                    <Button variant="outlined" class={this.state.make} onClick={() => this.handleResult('make')}>Make</Button>
                                    &nbsp;
                                <Button variant="outlined" class={this.state.miss} onClick={() => this.handleResult('miss')}>Miss</Button>
                                    &nbsp;
                                <Button variant="outlined" class={this.state.turnover} onClick={() => this.handleResult('turnover')}>Turnover</Button>
                                </div>
                            </CardActions>
                        </CardContent>
                    </Card>
                    <Card className={styles.resultmenu}>
                        <CardContent>
                            <CardActions>
                                <center>
                                    <Button variant="outlined" onClick={() => this.handleEdit(game)}>Save Possession</Button>
                                </center>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Dialog>
                <Dialog
                    open={this.state.errordialog}
                    onClose={this.handleCloseError}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogActions>
                        <div className={styleMedia.ten}>
                            <Typography>
                                <center> {this.state.errormessage}</center>
                            </Typography>
                            &nbsp;
                        <center>
                                <Button variant="outlined" onClick={() => { this.handleCloseError() }} >OK</Button>
                            </center>
                        </div>
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