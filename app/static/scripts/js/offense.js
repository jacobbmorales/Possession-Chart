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
            playerSelected: '',
            playSelected: '',
            possession: 0
        };
        this.updatePlayerSelected = this.updatePlayerSelected.bind(this);
        this.updatePlaySelected = this.updatePlaySelected.bind(this);
        this.handleMake = this.handleMake.bind(this);
        this.handleMiss = this.handleMiss.bind(this);
        this.handleTurnover = this.handleTurnover.bind(this);
    };
    updatePlayerSelected(selectedIndex) {
        this.setState({ playerSelected: selectedIndex });
        console.log(this.state.playerSelected)
    }
    updatePlaySelected(selectedIndex) {
        this.setState({ playSelected: selectedIndex });
        console.log(this.state.playSelected)
    }

    handleMake(play, player) {
        var possession = this.state.possesion + 1;
        this.setState({ possession: possession });
        console.log(this.state.possession)
        $.ajax({
            url: '/offense',
            data: { 'play': play, 'player': player, 'zone': '1', 'result': 'make' },
            type: 'POST',
            success: function (response) {
                console.log({ 'play': play, 'player': player, 'zone': '1', 'result': 'make' });
            }
        });

    };
    handleMiss(play, player) {
        var possession = this.state.possesion + 1;
        this.setState({ possession: possession });
        console.log(this.state.possession)
        $.ajax({
            url: '/offense',
            data: { 'play': play, 'player': player, 'zone': '1', 'result': 'miss' },
            type: 'POST',
            success: function (response) {
                console.log({ 'play': play, 'player': player, 'zone': '1', 'result': 'miss' });
            }
        });

    };
    handleTurnover(play, player) {
        var possession = this.state.possesion + 1;
        this.setState({ possession: possession });
        console.log(this.state.possession)
        $.ajax({
            url: '/offense',
            data: { 'play': play, 'player': player, 'zone': '1', 'result': 'turnover' },
            type: 'POST',
            success: function (response) {
                console.log({ 'play': play, 'player': player, 'zone': '1', 'result': 'turnover' });
            }
        });

    };

    render() {
        const playerSelected = String(this.state.playerSelected);
        const playSelected = this.state.playSelected;
        var temp = (window.last)
        var last = [];
        var key;
        for (key in temp) {
            last.push({
                key: key.toString(),
                value: temp[key].toString(),
            });
        }
        var temp = (window.play)
        var plays = [];
        var key;
        for (key in temp) {
            plays.push({
                key: key.toString(),
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
                            <Button variant="outlined">1</Button>
                            <Button variant="outlined">2</Button>
                            <Button variant="outlined">3</Button>
                            <Button variant="outlined">4</Button>
                            <Button variant="outlined">5</Button>
                            <Button variant="outlined">6</Button>
                        </CardActions>
                    </CardContent>
                </Card>
                <Card className={styles.menu}>
                    <center>
                        <CardContent>
                            <CardActions>
                                <Button variant="outlined" onClick={() => this.handleMake(plays[this.state.playSelected].value, last[this.state.playerSelected].value)}>Make</Button>
                                <Button variant="outlined" onClick={() => this.handleMiss(plays[this.state.playSelected].value, last[this.state.playerSelected].value)}>Miss</Button>
                                <Button variant="outlined" onClick={() => this.handleTurnover(plays[this.state.playSelected].value, last[this.state.playerSelected].value)}>Turnover</Button>
                                <Button variant="outlined" href='/home'>End Game</Button>
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