import React from 'react'
import Quagga from 'quagga'

class Scanner extends React.Component {

    constructor(props){
        super(props)
        this.initReader = this.initReader.bind(this)
        this.onDetected = this.onDetected.bind(this)
    }

    initReader() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment" // or user
                },
            },
            frequency: 10,
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers : [ "code_128_reader"]
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("starting")
            Quagga.start();
        });
        Quagga.onDetected(this.onDetected);
    }

    componentDidMount() {
        setTimeout(this.initReader, 1000)
        console.log("mounting")
    }

    componentWillUnmount(){
        Quagga.offDetected(this.onDetected)
        Quagga.stop()
        console.log("unmounting")
    }

    onDetected(result){
        this.props.onDetected(result)
    }

    render(){
        return (
            <div id="interactive" className="viewport"/>
        )
    }
}

export default Scanner