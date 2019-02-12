import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import styles from '../../css/style.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import $ from "jquery";
injectTapEventPlugin();

class Offense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerSelected: 'None',
            playSelected: 'None',
            playName: '',
            playerName: '',
            zone: 'None',
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
            errordialog: false,
            confirmsubmit: false,
            open: false,
            possession: 1,
            end: false
        };
        this.updatePlayerSelected = this.updatePlayerSelected.bind(this);
        this.updatePlaySelected = this.updatePlaySelected.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.confirmSubmit = this.confirmSubmit.bind(this);
        this.editPossession = this.editPossession.bind(this);
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

    handleEdit(possession1) {
        $.ajax({
            url: '/offense/' + window.game + '/' + possession1,
            data: { 'possession': this.state.possession, 'possession1': possession1, 'play': this.state.playSelected, 'player': this.state.playerSelected, 'zone': this.state.zone, 'result': this.state.result, edit: 'true' },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/offense/' + window.game + '/' + possession1
            }
        });

    };
    confirmSubmit(possession) {
        console.log(this.state.playSelected)
        $.ajax({
            url: '/offense/' + window.game + '/' + possession,
            data: { 'play': this.state.playSelected, 'player': this.state.playerSelected, 'zone': this.state.zone, 'result': this.state.result, 'possession': possession, edit: 'false' },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/offense/' + window.game + '/' + (parseInt(possession) + 1)
            }
        });
        this.setState({
            confirmsubmit: false,
        })
    };
    updatePlayerSelected(selectedIndex, name) {
        this.setState({
            playerSelected: selectedIndex,
            playerName: name
        });
    }
    updatePlaySelected(selectedIndex, name) {
        this.setState({
            playSelected: selectedIndex,
            playName: name
        });
    }
    handleClose() {
        this.setState({
            errordialog: false,
            confirmsubmit: false,
            end: false
        });
    };
    handleEnd() {
        this.setState({
            end: true
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
        console.log(this.state.zone)
    }

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

    handleSubmit() {
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
            this.setState({
                confirmsubmit: true,
            })
        }

    };

    render() {
        const playerSelected = this.state.playerSelected;
        const playSelected = this.state.playSelected;
        var temp = (window.last)
        var last = [];
        var player_id = (window.player_id)
        var number = (window.number)
        var possession = (window.possession)
        var key;
        for (key in temp) {
            last.push({
                key: player_id[key],
                value: temp[key].toString(),
                player: number[key] + ' - ' + temp[key].toString()
            });
        }
        var completed = '/game/' + window.game_id + '/None'
        var temp = (window.play)
        var plays = [];
        var play_id = (window.play_id)
        var key;
        for (key in temp) {
            plays.push({
                key: play_id[key],
                value: temp[key].toString(),
            });
        }
        var possession1 = window.possessions
        var plays1 = window.plays
        var players = window.players
        var play_ids = window.play_ids
        var player_ids = window.player_ids
        var numbers = window.numbers
        var zones = window.zones
        var results = window.results
        var possessions = []
        var key;
        for (key in possession1) {
            possessions.push({
                possession: possession1[key],
                play: plays1[key],
                player: numbers[key] + ' - ' + players[key],
                play_id: play_ids[key],
                player_id: player_ids[key],
                zone: zones[key],
                result: results[key],
            });
        }
        return (
            <div>
                <div className={styles.left0}>
                    <MenuList subheader={<ListSubheader><center>Plays</center></ListSubheader>} >
                        {plays.map((play) => (
                            <div>
                                <MenuItem
                                    key={play.key}
                                    onClick={() => this.updatePlaySelected(play.key, play.value)}
                                    selected={playSelected === play.key}
                                    classes={{ selected: styles.primary }}
                                >

                                    <ListItemText primary={play.value} />
                                </MenuItem>
                                <Divider inset={false} />
                            </div>
                        ))}
                    </MenuList>
                </div>
                <div className={styles.right0}>
                    <MenuList subheader={<ListSubheader><center>Players</center></ListSubheader>}>
                        {last.map((name) => (
                            <div>
                                <MenuItem
                                    key={name.key}
                                    onClick={() => this.updatePlayerSelected(name.key, name.player)}
                                    selected={playerSelected === name.key}
                                    classes={{ selected: styles.primary }}
                                >
                                    <ListItemText primary={name.player} />
                                </MenuItem>
                                <Divider inset={false} />
                            </div>
                        ))}
                    </MenuList>
                </div>
                <MenuList subheader={<ListSubheader><center><h3>Edit Possessions</h3></center></ListSubheader>} className={styles.offpossessionlist}>
                    <div>
                        <MenuItem disabled={true}>
                            <ListItemText primary="POSSESSION" />
                            <ListItemText className={styles.left120} primary="PLAY" />
                            <ListItemText className={styles.left240} primary="PLAYER" />
                            <ListItemText className={styles.left360} primary="ZONE" />
                            <ListItemText className={styles.left480} primary="RESULT" />
                        </MenuItem>
                        <Divider inset={false} />
                        {possessions.map((possession) => (
                            <div>
                                <MenuItem
                                    key={possession.possession}
                                    onClick={() => this.editPossession(possession.possession, possession.player_id, possession.play_id, possession.zone, possession.result)}
                                >
                                    <ListItemText primary={possession.possession} />
                                    <ListItemText className={styles.left120} primary={possession.play} />
                                    <ListItemText className={styles.left240} primary={possession.player} />
                                    <ListItemText className={styles.left360} primary={possession.zone} />
                                    <ListItemText className={styles.left480} primary={possession.result} />
                                </MenuItem>
                                <Divider inset={false} />
                            </div>

                        ))}
                    </div>
                </MenuList>
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
                            <div>
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
                                <Button variant="outlined" onClick={() => this.handleSubmit()}>Record Possession</Button>
                            </center>
                        </CardActions>
                    </CardContent>
                </Card>
                <Card className={styles.endmenu}>
                    <CardContent>
                        <CardActions>
                            <center>
                                <Button variant="outlined" onClick={() => this.handleEnd()}>End Game</Button>
                            </center>
                        </CardActions>
                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.end}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogActions>
                        <div className={styles.ten}>
                            <Typography>
                                <center>Are you sure you want to end this game?</center>
                            </Typography>
                            &nbsp;
                        <center>
                                <Button variant="outlined" onClick={() => this.handleClose()}>Cancel</Button>
                                &nbsp;
                        <Button variant="outlined" href={completed}>End Game</Button>
                            </center>
                        </div>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.errordialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogActions>
                        <div className={styles.ten}>
                            <Typography>
                                <center> {this.state.errormessage}</center>
                            </Typography>
                            <br></br>
                            &nbsp;
                        <center>
                                <Button variant="outlined" onClick={() => { this.handleClose() }} >OK</Button>
                            </center>
                        </div>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.confirmsubmit}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"><center> Possession: {possession}</center></DialogTitle>
                    <DialogActions>
                        <div className={styles.ten}>
                            <Typography>
                                <center> Play: {this.state.playName}</center>
                                <br></br>
                                <center> Player: {this.state.playerName}</center>
                                <br></br>
                                <center> Zone: {this.state.zone}</center>
                                <br></br>
                                <center> Result: {this.state.result}</center>
                            </Typography>
                            <br></br>
                            <center>
                                <Button variant="outlined" onClick={() => { this.confirmSubmit(possession) }} >Submit</Button>
                                &nbsp;
                            <Button variant="outlined" onClick={() => { this.handleClose() }} >Cancel</Button>
                            </center>
                        </div>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullScreen={true}
                >
                    <DialogTitle id="form-dialog-title"><center>Edit Possession</center></DialogTitle>
                    <div className={styles.left0}>
                        <MenuList subheader={<ListSubheader><center>Plays</center></ListSubheader>}  >
                            {plays.map((play) => (
                                <div>
                                    <MenuItem
                                        key={play.key}
                                        onClick={() => this.updatePlaySelected(play.key)}
                                        selected={playSelected === play.key}
                                        classes={{ selected: styles.primary }}
                                    >

                                        <ListItemText primary={play.value} />
                                    </MenuItem>
                                    <Divider inset={false} />
                                </div>
                            ))}
                        </MenuList>
                    </div>
                    <div className={styles.right0}>
                        <MenuList subheader={<ListSubheader><center>Players</center></ListSubheader>} >
                            {last.map((name) => (
                                <div>
                                    <MenuItem
                                        key={name.key}
                                        onClick={() => this.updatePlayerSelected(name.key)}
                                        selected={playerSelected === name.key}
                                        classes={{ selected: styles.primary }}
                                    >
                                        <ListItemText primary={name.player} />
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
                                    <Button variant="outlined" onClick={() => this.handleEdit(possession)}>Save Possession</Button>
                                </center>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Dialog>
            </div >
        )
    }
}

export default Offense;

ReactDOM.render(
    <Offense />,
    document.getElementById('offense')
);