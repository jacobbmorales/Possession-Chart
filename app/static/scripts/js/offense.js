import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import red from '@material-ui/core/colors/red';
import styles from '../../css/style.css';
import CardActionArea from '@material-ui/core/CardActionArea';
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
        console.log(zone)
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
                <MenuList subheader={<ListSubheader><center>Players</center></ListSubheader>} className={styles.right}>
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
                <Card className={styles.menu}>
                    <CardContent>
                        <CardActions>
                            <center>
                                <Button variant="outlined" onClick={() => this.handleMake(this.state.playSelected, this.state.playerSelected, this.state.zone)}>Make</Button>
                                <Button variant="outlined" onClick={() => this.handleMiss(this.state.playSelected, this.state.playerSelected, this.state.zone)}>Miss</Button>
                                <Button variant="outlined" onClick={() => this.handleTurnover(this.state.playSelected, this.state.playerSelected, this.state.zone)}>Turnover</Button>
                                <br></br>
                                <Button variant="outlined" href='/'>End Game</Button>
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