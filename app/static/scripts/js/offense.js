import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import red from '@material-ui/core/colors/red';
import styles from '../../css/style.css';
import $ from "jquery";
injectTapEventPlugin();

const mystyle = {
    backgroundColor: red
}
class Offense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerSelected: 0,
            playSelected: 0,
            possession: 1,
            zone: 1
        };
        this.updatePlayerSelected = this.updatePlayerSelected.bind(this);
        this.updatePlaySelected = this.updatePlaySelected.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.handleMake = this.handleMake.bind(this);
        this.handleMiss = this.handleMiss.bind(this);
        this.handleTurnover = this.handleTurnover.bind(this);
        this.increment = this.increment.bind(this)
    };
    updatePlayerSelected(selectedIndex) {
        this.setState({ playerSelected: selectedIndex });
    }
    updatePlaySelected(selectedIndex) {
        this.setState({ playSelected: selectedIndex });
    }

    updateZone(zone) {
        this.setState({ zone: zone });
    }

    increment() {
        var pos = this.state.possession
        pos += 1
        this.setState({ possession: pos })
    }

    handleMake(play, player, zone) {
        this.increment()
        $.ajax({
            url: '/offense/' + window.game,
            data: { 'play': play, 'player': player, 'zone': zone, 'result': 'make', 'possession': this.state.possession },
            type: 'POST',
            success: function (response) { document.write(response) }
        });

    };
    handleMiss(play, player, zone) {
        this.increment()
        $.ajax({
            url: '/offense/' + window.game,
            data: { 'play': play, 'player': player, 'zone': zone, 'result': 'miss', 'possession': this.state.possession },
            type: 'POST',
            success: function (response) { document.write(response) }
        });

    };
    handleTurnover(play, player, zone) {
        this.increment()
        $.ajax({
            url: '/offense/' + window.game,
            data: { 'play': play, 'player': player, 'zone': zone, 'result': 'turnover', 'possession': this.state.possession },
            type: 'POST',
            success: function (response) { document.write(response) }
        });

    };

    render() {
        const playerSelected = String(this.state.playerSelected);
        const playSelected = this.state.playSelected;
        var temp = (window.last)
        var last = [];
        var player_id = (window.player_id)
        var number = (window.number)
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
        return (
            <div>
                <MenuList subheader={<ListSubheader><center>Players</center></ListSubheader>} className={styles.right}>
                    {last.map((name) => (
                        <div>
                            <MenuItem
                                key={name.key}
                                onClick={() => this.updatePlayerSelected(name.key)}
                                selected={playerSelected === name.key}
                                classes={{ selected: styles.primary}}
                            >
                                <ListItemText primary={name.player} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
                <Card className={styles.court}>
                    <svg id="basketball" x="0px" y="0px" viewBox="0 0 1280 1024">
                        <rect id='one' onClick={() => this.updateZone(1)} x="25" y="31" class="zone" width="180" height="426" />
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
                        <path class="zone" d="M1073,457v-2.4c-0.4,0.8-0.8,1.6-1.2,2.4H1073z" />
                        <path onClick={() => this.updateZone(8)} class="zone" d="M839,281v176v74v156.2c102-47,184.7-128.8,232.8-230.2c0.4-0.8,0.8-1.6,1.2-2.4V281H839z" />
                    </svg>

                </Card>
                <Card className={styles.menu}>
                    <CardContent>
                        <CardActions>
                            <center>
                                <Button variant="outlined" onClick={() => this.handleMake(this.state.playSelected, this.state.playerSelected, this.state.zone)}>Make</Button>
                                <Button variant="outlined" onClick={() => this.handleMiss(this.state.playSelected, this.state.playerSelected, this.state.zone)}>Miss</Button>
                                <Button variant="outlined" onClick={() => this.handleTurnover(this.state.playSelected, this.state.playerSelected, this.state.zone)}>Turnover</Button>
                                <br></br>
                                <Button variant="outlined" href={completed}>End Game</Button>
                            </center>
                        </CardActions>
                    </CardContent>
                </Card>
                <MenuList subheader={<ListSubheader><center>Plays</center></ListSubheader>} className={styles.left} >
                    {plays.map((play) => (
                        <div>
                            <MenuItem
                                key={play.key}
                                onClick={() => this.updatePlaySelected(play.key)}
                                selected={playSelected === play.key}
                                classes={{ selected: styles.primary}}
                            >

                                <ListItemText primary={play.value} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>

            </div >
        )
    }
}

export default Offense;

ReactDOM.render(
    <Offense />,
    document.getElementById('offense')
);