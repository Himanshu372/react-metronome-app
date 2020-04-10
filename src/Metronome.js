import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';




class Metronome extends Component{
    constructor(props){
        super(props);
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
        this.state = {
            playing: false,
            bpm: 100,
            count: 0,
            beatsPerMeasure: 4,
        };
    }

    // This type of syntax {function = () or function = event} is known to public class fields syntax,
    // use to bind 'this' to class method, in our example handleBPMchange
    // It is used to bind event handlers with 'this' keyword
    handleBPMchange = event => {
        const bpm = event.target.value;

        //Restarting metronome if its already playing and user changes bpm counter
        if (this.state.playing){
            clearInterval(this.timer);
            this.timer = setInterval(
                this.playClick,
                (60 / this.bpm) * 1000
            );
             this.setState({
                count: 0,
                bpm: bpm,
            });
        }
        else{
            this.setState({bpm: bpm});
        }

    };

    startStop = () => {
        if (!this.state.playing){
            this.timer = setInterval(
                this.playClick,
                // Playing a thousand beats at current bpm
                (60 / this.bpm) * 1000
            );
            this.setState({
                playing: true,
                count: 0,
            },
            this.playClick
            );
        }
        else {
            //Stopping the timer
            clearInterval(this.timer);
            this.setState({
                playing: false,
            });
        }
    };

    playClick = () => {
        const {count, beatsPerMeasure} = this.state;

        //First beat has different sound than others
        if (count % beatsPerMeasure === 0){
            this.click2.play();
        }
        else{
            this.click1.play();
        }

        //Keeping track of the beat we're on
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    };

    render(){
        const {playing, bpm} = this.state;
        return(
            <div className='metronome'>
                <div className='bpm-slider'>
                    <div>{bpm} BPM</div>
                    <input type='range' min="60" max="240" value={bpm} onChange={this.handleBPMchange}/>
                </div>
                <button onClick={this.startStop}>{playing?'Stop': 'Start'}</button>
            </div>
        );
    }
}

export default Metronome;