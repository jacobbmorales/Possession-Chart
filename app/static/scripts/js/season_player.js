import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from '../../css/style.css';
import $ from "jquery";
injectTapEventPlugin();

class Season_Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.updatePlaySelected = this.updatePlaySelected.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.myfunc = this.myfunc.bind(this);

    }
    updateZone(player, zone) {
        console.log(zone)
        $.ajax({
            url: '/season/player/'+ player + '/' + zone,
            data: {zone: zone },
            type: 'POST',
            success: function (response) {
                document.write(response)
                window.location.href = '/season/player/'+ player + '/' + zone
            }
        });
    }
    updatePlaySelected(play, player, zone) {
        console.log(play, player)
        $.ajax({
            url: '/season/player/'+ player + '/' + zone,
            data: { play: play, zone: 'false'},
            type: 'POST',
            success: function(response){
                console.log(play)
                document.write(response)
                window.location.href = '/season/'+play+'/'+player
            }
        });
    }
    myfunc(zone, player) {
        if (zone == 'None') {
            const MyCard = () => (
                <Card className={styles.courtdisplay2}>
                    <svg id="basketball" x="0px" y="0px" viewBox="0 0 1280 1024">

                        //zone 1
                        <rect onClick={() => this.updateZone(player,1)} x="25" y="31" class="zonedisplay" width="180" height="426" />
                        <text onClick={() => this.updateZone(player,1)} x="65" y="100" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,1)} x="60" y="150" font-size="38">
                            {zone_used[0]}%
                        </text>
                        <text onClick={() => this.updateZone(player,1)} x="30" y="200" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,1)} x="60" y="250" font-size="38">
                            {zone_eff[0]}%
                        </text>

                        //zone 2
                        <rect onClick={() => this.updateZone(player,2)} x="205" y="31" class="zonedisplay" width="234" height="250" />
                        <text onClick={() => this.updateZone(player,2)} x="267" y="90" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,2)} x="272" y="140" font-size="38">
                            {zone_used[1]}%
                        </text>
                        <text onClick={() => this.updateZone(player,2)} x="232" y="190" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,2)} x="272" y="240" font-size="38">
                            {zone_eff[1]}%
                        </text>

                        //zone 3
                        <rect onClick={() => this.updateZone(player,3)} x="439" y="31" class="zonedisplay" width="400" height="250" />
                        <text onClick={() => this.updateZone(player,3)} x="584" y="90" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,3)} x="579" y="140" font-size="38">
                            {zone_used[2]}%
                        </text>
                        <text onClick={() => this.updateZone(player,3)} x="549" y="190" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,3)} x="579" y="240" font-size="38">
                            {zone_eff[2]}%
                        </text>

                        //zone 4 
                        <rect onClick={() => this.updateZone(player,4)} x="839" y="31" class="zonedisplay" width="234" height="250" />
                        <text onClick={() => this.updateZone(player,4)} x="906" y="90" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,4)} x="901" y="140" font-size="38">
                            {zone_used[3]}%
                        </text>
                        <text onClick={() => this.updateZone(player,4)} x="866" y="190" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,4)} x="901" y="240" font-size="38">
                            {zone_eff[3]}%
                        </text>

                        //zone 5
                        <rect onClick={() => this.updateZone(player,5)} x="1073" y="31" class="zonedisplay" width="180" height="426" />
                        <text onClick={() => this.updateZone(player,5)} x="1113" y="100" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,5)} x="1108" y="150" font-size="38">
                            {zone_used[4]}%
                        </text>
                        <text onClick={() => this.updateZone(player,5)} x="1078" y="200" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,5)} x="1108" y="250" font-size="38">
                            {zone_eff[4]}%
                        </text>

                        //zone 10
                        <rect onClick={() => this.updateZone(player,10)} x="25" y="457" class="zonedisplay" width="414" height="345" />
                        <text onClick={() => this.updateZone(player,10)} x="125" y="600" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,10)} x="120" y="650" font-size="38">
                            {zone_used[9]}%
                        </text>
                        <text onClick={() => this.updateZone(player,10)} x="90" y="700" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,10)} x="120" y="750" font-size="38">
                            {zone_eff[9]}%
                        </text>

                        //zone 12
                        <rect onClick={() => this.updateZone(player,12)} x="839" y="457" class="zonedisplay" width="414" height="345" />
                        <text onClick={() => this.updateZone(player,12)} x="1053" y="600" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,12)} x="1048" y="650" font-size="38">
                            {zone_used[11]}%
                        </text>
                        <text onClick={() => this.updateZone(player,12)} x="1018" y="700" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,12)} x="1048" y="750" font-size="38">
                            {zone_eff[11]}%
                        </text>

                        //zone 6
                        <path onClick={() => this.updateZone(player,6)} class="zonedisplay" d="M205,457h0.1c0-0.1-0.1-0.2-0.1-0.3V457z" />
                        <path onClick={() => this.updateZone(player,6)} class="zonedisplay" d="M205,281v175.7c0,0.1,0.1,0.2,0.1,0.3C253.5,558.7,336.5,640.7,439,687.6V531v-74V281H205z" />
                        <text onClick={() => this.updateZone(player,6)} x="267" y="340" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,6)} x="272" y="390" font-size="38">
                            {zone_used[5]}%
                        </text>
                        <text onClick={() => this.updateZone(player,6)} x="232" y="440" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,6)} x="272" y="490" font-size="38">
                            {zone_eff[5]}%
                        </text>

                        //zone 7
                        <rect onClick={() => this.updateZone(player,7)} x="439" y="281" class="zonedisplay" width="400" height="250" />
                        <text onClick={() => this.updateZone(player,7)} x="584" y="340" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,7)} x="579" y="390" font-size="38">
                            {zone_used[6]}%
                        </text>
                        <text onClick={() => this.updateZone(player,7)} x="549" y="440" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,7)} x="579" y="490" font-size="38">
                            {zone_eff[6]}%
                        </text>

                        //zone 8
                        <path onClick={() => this.updateZone(player,8)} class="zonedisplay" d="M839,281v176v74v156.2c102-47,184.7-128.8,232.8-230.2c0.4-0.8,0.8-1.6,1.2-2.4V281H839z" />
                        <text onClick={() => this.updateZone(player,8)} x="906" y="340" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,8)} x="901" y="390" font-size="38">
                            {zone_used[7]}%
                        </text>
                        <text onClick={() => this.updateZone(player,8)} x="866" y="440" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,8)} x="901" y="490" font-size="38">
                            {zone_eff[7]}%
                        </text>

                        //zone 9
                        <path onClick={() => this.updateZone(player,9)} class="zonedisplay" d="M439,531v156.6c60.7,27.8,128.3,43.4,199.5,43.4c71.6,0,139.5-15.7,200.5-43.8V531H439z" />
                        <text onClick={() => this.updateZone(player,9)} x="584" y="580" font-size="38">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,9)} x="579" y="620" font-size="38">
                            {zone_used[8]}%
                        </text>
                        <text onClick={() => this.updateZone(player,9)} x="549" y="660" font-size="38">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,9)} x="579" y="700" font-size="38">
                            {zone_eff[8]}%
                        </text>

                        //zone 11
                        <path onClick={() => this.updateZone(player,11)} class="zonedisplay" d="M439,687.6v114.5h400v-115c-61,28.4-128.9,44.3-200.5,44.3C567.3,731.5,499.7,715.8,439,687.6z" />
                        <text onClick={() => this.updateZone(player,11)} x="444" y="755" font-size="35">
                            Used:
                        </text>
                        <text onClick={() => this.updateZone(player,11)} x="454" y="795" font-size="35">
                            {zone_used[10]}%
                        </text>
                        <text onClick={() => this.updateZone(player,11)} x="650" y="755" font-size="35">
                            Efficiency:
                        </text>
                        <text onClick={() => this.updateZone(player,11)} x="660" y="795" font-size="35">
                            {zone_eff[10]}%
                        </text>

                    </svg>
                </Card>
            )
            return (MyCard)
        }

        else {
            var class1 = 'zonedisplay';
            var class2 = 'zonedisplay';
            var class3 = 'zonedisplay';
            var class4 = 'zonedisplay';
            var class5 = 'zonedisplay';
            var class6 = 'zonedisplay';
            var class7 = 'zonedisplay';
            var class8 = 'zonedisplay';
            var class9 = 'zonedisplay';
            var class10 = 'zonedisplay';
            var class11 = 'zonedisplay';
            var class12 = 'zonedisplay';
            if (zone == '1') {
                class1 = "blackzone"
            }
            if (zone == '2') {
                class2 = "blackzone"
            }
            if (zone == '3') {
                class3 = "blackzone"
            }
            if (zone == '4') {
                class4 = "blackzone"
            }
            if (zone == '5') {
                class5 = "blackzone"
            }
            if (zone == '6') {
                class6 = "blackzone"
            }
            if (zone == '7') {
                class7 = "blackzone"
            }
            if (zone == '8') {
                class8 = "blackzone"
            }
            if (zone == '9') {
                class9 = "blackzone"
            }
            if (zone == '10') {
                class10 = "blackzone"
            }
            if (zone == '11') {
                class11 = "blackzone"
            }
            if (zone == '12') {
                class12 = "blackzone"
            }
            const MyCard = () => (
                <div>
                    <Card className={styles.courtdisplay2reset}>
                        <svg id="basketball" x="0px" y="0px" viewBox="0 0 1280 1024">

                            //zone 1
                            <rect onClick={() => this.updateZone(player,1)} x="25" y="31" class={class1} width="180" height="426" />
                            //zone 2
                            <rect onClick={() => this.updateZone(player,2)} x="205" y="31" class={class2} width="234" height="250" />

                            //zone 3
                            <rect onClick={() => this.updateZone(player,3)} x="439" y="31" class={class3} width="400" height="250" />

                            //zone 4 
                            <rect onClick={() => this.updateZone(player,4)} x="839" y="31" class={class4} width="234" height="250" />

                            //zone 5
                            <rect onClick={() => this.updateZone(player,5)} x="1073" y="31" class={class5} width="180" height="426" />

                            //zone 10
                            <rect onClick={() => this.updateZone(player,10)} x="25" y="457" class={class10} width="414" height="345" />

                            //zone 12
                            <rect onClick={() => this.updateZone(player,12)} x="839" y="457" class={class12} width="414" height="345" />

                            //zone 6
                            <path onClick={() => this.updateZone(player,6)} class={class6} d="M205,457h0.1c0-0.1-0.1-0.2-0.1-0.3V457z" />
                            <path onClick={() => this.updateZone(player,6)} class={class6} d="M205,281v175.7c0,0.1,0.1,0.2,0.1,0.3C253.5,558.7,336.5,640.7,439,687.6V531v-74V281H205z" />

                            //zone 7
                            <rect onClick={() => this.updateZone(player,7)} x="439" y="281" class={class7} width="400" height="250" />

                            //zone 8
                            <path onClick={() => this.updateZone(player,8)} class={class8} d="M839,281v176v74v156.2c102-47,184.7-128.8,232.8-230.2c0.4-0.8,0.8-1.6,1.2-2.4V281H839z" />

                            //zone 9
                            <path onClick={() => this.updateZone(player,9)} class={class9} d="M439,531v156.6c60.7,27.8,128.3,43.4,199.5,43.4c71.6,0,139.5-15.7,200.5-43.8V531H439z" />

                            //zone 11
                            <path onClick={() => this.updateZone(player,11)} class={class11} d="M439,687.6v114.5h400v-115c-61,28.4-128.9,44.3-200.5,44.3C567.3,731.5,499.7,715.8,439,687.6z" />

                        </svg>
                        <Button class={styles.reset} variant="outlined" onClick={() => this.updateZone(player,'None')}>Reset Zone</Button>
                    </Card>
                    

                </div>
            )
            return (MyCard)
        }
    }


    render() {
        var plays = []
        var plays_used = []
        var player = window.player
        var play = window.play_names
        var play_pct = window.play_values
        var used_play = window.ind_names
        var used_play_pct = window.ind_values
        var used_play_id = window.used_play_id
        var eff_play_id = window.eff_play_id
        var zone_used = window.zone_used
        var zone_eff = window.zone_eff
        var key
        var zone = window.zone
        for (key in play) {
            plays.push({
                key: play_pct[key] + '%',
                value: play[key],
                id: eff_play_id[key]
            });
        }
        for (key in used_play) {
            plays_used.push({
                key: used_play_pct[key] + '%',
                value: used_play[key],
                id: used_play_id[key]
            });
        }
        const MyCard = this.myfunc(zone, player)
        return (
            <div>
                <div className={styles.logoright}/>
                <MenuList subheader={<ListSubheader><center><h6>Most Used Play</h6></center></ListSubheader>} className={styles.leftsecond}>
                    {plays_used.map((play) => (
                        <div>
                            <MenuItem
                                key={play.key}
                                onClick={() => this.updatePlaySelected(play.id, player,zone)}
                            >
                                <ListItemText primary={play.value} secondary={play.key} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
                <MenuList subheader={<ListSubheader><center><h6>Most Efficient Play</h6></center></ListSubheader>} className={styles.left2second}>
                    {plays.map((play) => (
                        <div>
                            <MenuItem
                                key={play.key}
                                onClick={() => this.updatePlaySelected(play.id, player,zone)}
                            >
                                <ListItemText primary={play.value} secondary={play.key} />
                            </MenuItem>
                            <Divider inset={false} />
                        </div>
                    ))}
                </MenuList>
                <MyCard></MyCard>
            </div>
        )
    }
}

export default Season_Player;

ReactDOM.render(
    <Season_Player />,
    document.getElementById('season_player')
);