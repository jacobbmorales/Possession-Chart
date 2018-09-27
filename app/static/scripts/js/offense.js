import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../../css/style.css';
injectTapEventPlugin();


const Offense = () => (
    <div>
        <List subheader={<ListSubheader>Players</ListSubheader>} className={styles.right}>
            <ListItem button className={styles.button}>
                <ListItemText primary="Play 1" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 2" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 3" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 4" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 5" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 6" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 7" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 8" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 9" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 10" />
            </ListItem>
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
        <List subheader={<ListSubheader>Plays</ListSubheader>} className={styles.left}>
            <ListItem button>
                <ListItemText primary="Play 1" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 2" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 3" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 4" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 5" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 6" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 7" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 8" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 9" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Play 10" />
            </ListItem>
        </List>

    </div>
);

export default Offense;

ReactDOM.render(
    <Offense />,
    document.getElementById('offense')
);