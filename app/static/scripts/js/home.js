import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../../css/style.css';
import $ from "jquery";
import Center from 'react-center';
injectTapEventPlugin();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: 0
        };
        this.handleGame = this.handleGame.bind(this);
    }

    handleGame(game) {
        $.ajax({
            url: '/home',
            data: { game: game },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/game/' + game
            }
        });

    };

    render() {
        var data = window.data
        var most_used = data[0]
        var efficient = data[1]
        var eff_player = data[2]
        var used_player = data[3]
        var temp = (window.games)
        var games = [];
        var game_id = (window.game_id)
        var key;
        for (key in temp) {
            games.push({
                key: game_id[key],
                value: temp[key].toString(),
            });
        }
        return (
            <div>
                <Card className={styles.homeplay}>
                    <CardContent>
                        <CardActions>
                            <Typography>
                                <center>
                                    <h3>Most Used Play:</h3>
                                    <br></br>
                                    {most_used}
                                </center>
                            </Typography>
                        </CardActions>
                    </CardContent>
                </Card>
                <Card className={styles.homeplay2}>
                    <CardContent>
                        <CardActions>
                            <Typography>
                                <center>
                                    <h3>Most Efficient Play:</h3>
                                    <br></br>
                                    {efficient}
                                </center>
                            </Typography>
                        </CardActions>
                    </CardContent>
                </Card>
                <Center>
                <div className={styles.logo}/>
                </Center>
                <Card className={styles.homeplayer}>
                    <CardContent>
                        <CardActions>
                            <Typography>
                                <center>
                                    <h3>Most Used Player:</h3>
                                    <br></br>
                                    {used_player}
                                </center>
                            </Typography>
                        </CardActions>
                    </CardContent>
                </Card>
                <Card className={styles.homeplayer2}>
                    <CardContent>
                        <CardActions>
                            <Typography>
                                <center>
                                    <h3>Most Efficient Player:</h3>
                                    <br></br>
                                    {eff_player}
                                </center>
                            </Typography>
                        </CardActions>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Home;

ReactDOM.render(
    <Home />,
    document.getElementById('home')
);