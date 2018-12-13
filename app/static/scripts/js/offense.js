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

    increment(){
        var pos = this.state.possession
        pos += 1
        this.setState({possession: pos})
    }

    handleMake(play, player, zone) {
        this.increment()
        $.ajax({
            url: '/offense/' + window.game,
            data: {'play': play, 'player': player, 'zone': zone, 'result': 'make', 'possession' : this.state.possession },
            type: 'POST',
            success: function(response){ document.write(response) }
        });

    };
    handleMiss(play, player, zone) {
        this.increment()
        $.ajax({
            url: '/offense/' + window.game,
            data: {'play': play, 'player': player, 'zone': zone, 'result': 'miss', 'possession' : this.state.possession },
            type: 'POST',
            success: function(response){ document.write(response) }
        });

    };
    handleTurnover(play, player, zone) {
        this.increment()
        $.ajax({
            url: '/offense/' + window.game,
            data: {'play': play, 'player': player, 'zone': zone, 'result': 'turnover', 'possession' : this.state.possession },
            type: 'POST',
            success: function(response){ document.write(response) }
        });

    };

    render() {
        const playerSelected = String(this.state.playerSelected);
        const playSelected = this.state.playSelected;
        var temp = (window.last)
        var last = [];
        var player_id = (window.player_id)
        var key;
        for (key in temp) {
            last.push({
                key: player_id[key],
                value: temp[key].toString(),
            });
        }
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
                <MenuList subheader={<ListSubheader>Players</ListSubheader>} className={styles.right}>
                    {last.map((name) => (
                        <div>
                            <MenuItem
                                key={name.key}
                                onClick={() => this.updatePlayerSelected(name.key)}
                                //selected={playerSelected}
                               // classes={{ selected: mystyle}}
                            >
                                <ListItemText primary={name.value} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
                <Card className={styles.court}>
                    <CardContent>
                        <CardActions>
                            <Button variant="outlined" onClick={() => this.updateZone(1)}>1</Button>
                            <Button variant="outlined" onClick={() => this.updateZone(2)}>2</Button>
                            <Button variant="outlined" onClick={() => this.updateZone(3)}>3</Button>
                            <Button variant="outlined" onClick={() => this.updateZone(4)}>4</Button>
                            <Button variant="outlined" onClick={() => this.updateZone(5)}>5</Button>
                            <Button variant="outlined" onClick={() => this.updateZone(6)}>6</Button>
                        </CardActions>
                    </CardContent>
                </Card>
                <Card className={styles.menu}>
                    <center>
                        <CardContent>
                            <CardActions>
                                <Button variant="outlined" onClick={() => this.handleMake(this.state.playSelected, this.state.playerSelected, this.state.zone)}>Make</Button>
                                <Button variant="outlined" onClick={() => this.handleMiss(this.state.playSelected, this.state.playerSelected, this.state.zone)}>Miss</Button>
                                <Button variant="outlined" onClick={() => this.handleTurnover(this.state.playSelected, this.state.playerSelected, this.state.zone)}>Turnover</Button>
                                <Button variant="outlined" href='/'>End Game</Button>
                            </CardActions>
                        </CardContent>
                    </center>
                </Card>
                <MenuList subheader={<ListSubheader>Plays</ListSubheader>} className={styles.left} >
                    {plays.map((play) => (
                        <div>
                            <MenuItem 
                                key={play.key}
                                onClick={() => this.updatePlaySelected(play.key)}
                                //selected={playSelected === play.key}
                                //classes={{ selected: mystyle}}
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