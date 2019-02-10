import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../../css/style.css';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import $ from "jquery";
injectTapEventPlugin();

class AddPlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            play: "",
            open: false,
            editPlay: "",
            editId: "", 
            confirm: false
        };
        this.handlePlay = this.handlePlay.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditPlay = this.handleEditPlay.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.editPlay = this.editPlay.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
    }

    handlePlay(event) {
        this.setState({
            play: event.target.value
        });
    };

    handleEditPlay(event) {
        this.setState({
            editPlay: event.target.value,
        });
    };

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

    handleAdd(play) {
        $.ajax({
            url: '/addplay',
            data: { 'edit': 'false', 'play': play },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/addplay'
            }
        });

    };

    editPlay(play, id) {
        this.setState({
            editId: id,
            editPlay: play,
            open: true
        });
    };

    handleDelete(id) {
        $.ajax({
            url: '/addplay',
            data: { 'delete': 'true', 'id': id },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/addplay'
            }
        });
    };

    handleEdit(play, id) {
        $.ajax({
            url: '/addplay',
            data: { 'edit': 'true', 'play': play, 'id': id },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/addplay'
            }
        });

    };
    render() {
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
                <Card className={styles.addplay}>
                    <CardContent>
                        <CardActions>
                            <div className={styles.ten}>
                                <TextField
                                    label="Name of Play"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    value={this.state.play}
                                    onChange={this.handlePlay}
                                />
                                <br></br>
                                <Button variant="outlined" onClick={() => this.handleAdd(this.state.play)}>Add Play</Button>
                            </div>
                        </CardActions>
                    </CardContent>
                </Card>
                <MenuList subheader={<ListSubheader><center><h3>Plays</h3></center></ListSubheader>} className={styles.playlist}>
                    {plays.map((name) => (
                        <div>
                            <MenuItem
                                key={name.key}
                                onClick={() => this.editPlay(name.value, name.key)}
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
                    open={this.state.confirm}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogActions>
                        <div className={styleMedia.ten}>
                            <Typography>
                                <center>Are you sure you want to delete this play?</center>
                            </Typography>
                            <Button variant="outlined" onClick={() => { this.handleClose() }} color="primary">Do Not Delete</Button>
                            <Button variant="outlined" onClick={() => { this.handleDelete(this.state.editId) }} color="primary">Delete Play</Button>
                        </div>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"><center>Edit Play</center></DialogTitle>
                    <DialogContent>
                        <center>
                            <TextField
                                label="Name of Play"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                value={this.state.editPlay}
                                onChange={this.handleEditPlay}
                            />
                        </center>
                    </DialogContent>
                    <DialogActions>
                        <div className={styleMedia.ten}>
                            <Button variant="outlined" onClick={() => this.handleEdit(this.state.editPlay, this.state.editId)} color="primary">Save</Button>
                            <Button variant="outlined" onClick={() => { this.handleConfirm() }} color="primary">Delete Play</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default AddPlay;

ReactDOM.render(
    <AddPlay />,
    document.getElementById('addplay')
);