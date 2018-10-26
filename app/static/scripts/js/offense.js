import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../../css/style.css';
injectTapEventPlugin();

class Offense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last: [],
        };
    };
    render() {

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
        console.log(temp)
        for (key in temp) {
            plays.push({
                key: key.toString(),
                value: temp[key].toString(),
            });
        }
        return (
            <div>
                <List subheader={<ListSubheader>Players</ListSubheader>} className={styles.right}>
                    {last.map((name) => (
                        <div>
                            <ListItem key={name.key}>

                                <ListItemText primary={name.value} />
                            </ListItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </List>
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
                                <Button variant="outlined">Make</Button>
                                <Button variant="outlined">Miss</Button>
                                <Button variant="outlined">Turnover</Button>
                            </CardActions>
                        </CardContent>
                    </center>
                </Card>
                <List subheader={<ListSubheader>Plays</ListSubheader>} className={styles.left} >
                    {plays.map((play) => (
                        <div>
                            <ListItem key={play.key}>

                                <ListItemText primary={play.value} />
                            </ListItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </List>

            </div >
        )
    }
}

export default Offense;

ReactDOM.render(
    <Offense />,
    document.getElementById('offense')
);