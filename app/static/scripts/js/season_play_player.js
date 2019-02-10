import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import styles from '../../css/style.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Season_Play_Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        var zone_used = window.zone_used
        var zone_eff = window.zone_eff
        return (
            <div>
                <div className={styles.logoleft}/>
                <div className={styles.logoright}/>
                <Card className={styles.courtdisplay3}>
                    <svg id="basketball" x="0px" y="0px" viewBox="0 0 1280 1024">

                        //zone 1
                        <rect x="25" y="31" class="zonedisplay" width="180" height="426" />
                        <text x="65" y="100" font-size="38">
                            Used:
                        </text>
                        <text x="60" y="150" font-size="38">
                            {zone_used[0]}%
                        </text>
                        <text x="30" y="200" font-size="38">
                            Efficiency:
                        </text>
                        <text x="60" y="250" font-size="38">
                            {zone_eff[0]}%
                        </text>

                        //zone 2
                        <rect x="205" y="31" class="zonedisplay" width="234" height="250" />
                        <text x="267" y="90" font-size="38">
                            Used:
                        </text>
                        <text x="272" y="140" font-size="38">
                            {zone_used[1]}%
                        </text>
                        <text x="232" y="190" font-size="38">
                            Efficiency:
                        </text>
                        <text x="272" y="240" font-size="38">
                            {zone_eff[1]}%
                        </text>

                        //zone 3
                        <rect x="439" y="31" class="zonedisplay" width="400" height="250" />
                        <text x="584" y="90" font-size="38">
                            Used:
                        </text>
                        <text x="579" y="140" font-size="38">
                            {zone_used[2]}%
                        </text>
                        <text x="549" y="190" font-size="38">
                            Efficiency:
                        </text>
                        <text x="579" y="240" font-size="38">
                            {zone_eff[2]}%
                        </text>

                        //zone 4 
                        <rect x="839" y="31" class="zonedisplay" width="234" height="250" />
                        <text x="906" y="90" font-size="38">
                            Used:
                        </text>
                        <text x="901" y="140" font-size="38">
                            {zone_used[3]}%
                        </text>
                        <text x="866" y="190" font-size="38">
                            Efficiency:
                        </text>
                        <text x="901" y="240" font-size="38">
                            {zone_eff[3]}%
                        </text>

                        //zone 5
                        <rect x="1073" y="31" class="zonedisplay" width="180" height="426" />
                        <text x="1113" y="100" font-size="38">
                            Used:
                        </text>
                        <text x="1108" y="150" font-size="38">
                            {zone_used[4]}%
                        </text>
                        <text x="1078" y="200" font-size="38">
                            Efficiency:
                        </text>
                        <text x="1108" y="250" font-size="38">
                            {zone_eff[4]}%
                        </text>

                        //zone 10
                        <rect x="25" y="457" class="zonedisplay" width="414" height="345" />
                        <text x="125" y="600" font-size="38">
                            Used:
                        </text>
                        <text x="120" y="650" font-size="38">
                            {zone_used[9]}%
                        </text>
                        <text x="90" y="700" font-size="38">
                            Efficiency:
                        </text>
                        <text x="120" y="750" font-size="38">
                            {zone_eff[9]}%
                        </text>

                        //zone 12
                        <rect x="839" y="457" class="zonedisplay" width="414" height="345" />
                        <text x="1053" y="600" font-size="38">
                            Used:
                        </text>
                        <text x="1048" y="650" font-size="38">
                            {zone_used[11]}%
                        </text>
                        <text x="1018" y="700" font-size="38">
                            Efficiency:
                        </text>
                        <text x="1048" y="750" font-size="38">
                            {zone_eff[11]}%
                        </text>

                        //zone 6
                        <path class="zonedisplay" d="M205,457h0.1c0-0.1-0.1-0.2-0.1-0.3V457z" />
                        <path class="zonedisplay" d="M205,281v175.7c0,0.1,0.1,0.2,0.1,0.3C253.5,558.7,336.5,640.7,439,687.6V531v-74V281H205z" />
                        <text x="267" y="340" font-size="38">
                            Used:
                        </text>
                        <text x="272" y="390" font-size="38">
                            {zone_used[5]}%
                        </text>
                        <text x="232" y="440" font-size="38">
                            Efficiency:
                        </text>
                        <text x="272" y="490" font-size="38">
                            {zone_eff[5]}%
                        </text>

                        //zone 7
                        <rect x="439" y="281" class="zonedisplay" width="400" height="250" />
                        <text x="584" y="340" font-size="38">
                            Used:
                        </text>
                        <text x="579" y="390" font-size="38">
                            {zone_used[6]}%
                        </text>
                        <text x="549" y="440" font-size="38">
                            Efficiency:
                        </text>
                        <text x="579" y="490" font-size="38">
                            {zone_eff[6]}%
                        </text>
                        
                        //zone 8
                        <path class="zonedisplay" d="M839,281v176v74v156.2c102-47,184.7-128.8,232.8-230.2c0.4-0.8,0.8-1.6,1.2-2.4V281H839z" />
                        <text x="906" y="340" font-size="38">
                            Used:
                        </text>
                        <text x="901" y="390" font-size="38">
                            {zone_used[7]}%
                        </text>
                        <text x="866" y="440" font-size="38">
                            Efficiency:
                        </text>
                        <text x="901" y="490" font-size="38">
                            {zone_eff[7]}%
                        </text>

                        //zone 9
                        <path class="zonedisplay" d="M439,531v156.6c60.7,27.8,128.3,43.4,199.5,43.4c71.6,0,139.5-15.7,200.5-43.8V531H439z" />
                        <text x="584" y="580" font-size="38">
                            Used:
                        </text>
                        <text x="579" y="620" font-size="38">
                            {zone_used[8]}%
                        </text>
                        <text x="549" y="660" font-size="38">
                            Efficiency:
                        </text>
                        <text x="579" y="700" font-size="38">
                            {zone_eff[8]}%
                        </text>
                        
                        //zone 11
                        <path class="zonedisplay" d="M439,687.6v114.5h400v-115c-61,28.4-128.9,44.3-200.5,44.3C567.3,731.5,499.7,715.8,439,687.6z" />
                        <text x="444" y="755" font-size="35">
                            Used:
                        </text>
                        <text x="454" y="795" font-size="35">
                            {zone_used[10]}%
                        </text>
                        <text x="650" y="755" font-size="35">
                            Efficiency:
                        </text>
                        <text x="660" y="795" font-size="35">
                            {zone_eff[10]}%
                        </text>
                        
                    </svg>
                </Card>
            </div>
        )
    }
}

export default Season_Play_Player;

ReactDOM.render(
    <Season_Play_Player />,
    document.getElementById('season_play_player')
);