import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from '../../css/style.css';
import $ from "jquery";
injectTapEventPlugin();

class AddPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last: "",
            number: "",
            open: false,
            editLast: "",
            editNumber: "",
            editId: ""
        };
        this.handleLast = this.handleLast.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditLast = this.handleEditLast.bind(this);
        this.handleEditNumber = this.handleEditNumber.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.editPlayer = this.editPlayer.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleLast(event) {
        this.setState({
            last: event.target.value,
        });
    };

    handleNumber(event) {
        this.setState({
            number: event.target.value,
        });
    };

    handleEditLast(event) {
        this.setState({
            editLast: event.target.value,
        });
    };

    handleEditNumber(event) {
        this.setState({
            editNumber: event.target.value,
        });
    };

    editPlayer(name, number, id) {
        this.setState({
            editId: id,
            editLast: name,
            editNumber: number,
            open: true
        });
    };

    handleDelete(id) {
        $.ajax({
            url: '/addplayer',
            data: { 'delete': 'true', 'id': id },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/addplayer'
            }
        });
    };

    handleAdd(last, number) {
        $.ajax({
            url: '/addplayer',
            data: { 'edit': 'false', 'last': last, 'number': number },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/addplayer'
            }
        });

    };

    handleEdit(name, number, id) {
        $.ajax({
            url: '/addplayer',
            data: { 'edit': 'true', 'name': name, 'number': number, 'id': id },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/addplayer'
            }
        });

    };

    render() {
        var temp = (window.last)
        var last = [];
        var player_id = (window.player_id)
        var number = (window.number)
        var key;
        for (key in temp) {
            last.push({
                key: player_id[key],
                value: number[key] + ' - ' + temp[key].toString(),
                number: number[key],
                name: temp[key].toString()
            });
        }
        return (
            <div>
                <MenuList subheader={<ListSubheader><center><h3>Players</h3></center></ListSubheader>} className={styles.gamelist}>
                    {last.map((name) => (
                        <div>
                            <MenuItem
                                key={name.key}
                                onClick={() => this.editPlayer(name.name, name.number, name.key)}
                            //selected={playerSelected}
                            // classes={{ selected: mystyle}}
                            >
                                <ListItemText primary={name.value} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"><center>Edit Player</center></DialogTitle>
                    <DialogContent>
                        <TextField
                            id="filled-email-input"
                            label="Last Name"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="filled"
                            value={this.state.editLast}
                            onChange={this.handleEditLast}
                        />
                        <TextField
                            id="filled-email-input"
                            label="Number"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="filled"
                            value={this.state.editNumber}
                            onChange={this.handleEditNumber}
                        />
                    </DialogContent>
                    <DialogActions>
                    <div className={styleMedia.ten}>
                        <Button onClick={() => this.handleEdit(this.state.editLast, this.state.editNumber, this.state.editId)} color="primary">Save</Button>
                        <Button onClick={() => { this.handleDelete(this.state.editId) }} color="primary">Delete Player</Button>
                    </div>
                    </DialogActions>
                </Dialog>
                <Card className={styles.addplayer}>
                    <CardContent>
                        <CardActions>
                            <div className={styleMedia.ten}>
                                <TextField
                                    id="filled-email-input"
                                    label="Last Name"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="filled"
                                    value={this.state.last}
                                    onChange={this.handleLast}
                                />
                                <br></br>
                                <TextField
                                    id="filled-email-input"
                                    label="Number"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="filled"
                                    value={this.state.number}
                                    onChange={this.handleNumber}
                                />
                                <br></br>
                                <Button variant="outlined" onClick={() => this.handleAdd(this.state.last, this.state.number)}>Add Player</Button>
                            </div>
                        </CardActions>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default AddPlayer;

ReactDOM.render(
    <AddPlayer />,
    document.getElementById('addplayer')
);