
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getDaily } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";


class ChartComponent extends React.Component {

	componentDidMount() {
		var app = this;
        getDaily("NVDA", function(response){
        	//console.log(data);
			var data = response["Time Series (Daily)"];

            var result = Object.keys(data).map(function(key) {
                var obj = data[key];
                obj = {
                    open: obj["1. open"],
                    close: obj["4. close"],
                    high: obj["2. high"],
                    low: obj["3. low"],
                    volume: obj["5. volume"],
                    date: new Date(key)
                }
                return obj;
            });
            //console.log(result);
            result.sort(function(a, b){
                //console.log(a.date)
                //console.log(a.date + " " + b.date + " " + moment(a.date).isBefore(moment(b.date)));
                return a.date - b.date
            });
            //console.log(result);
            app.setState({ data: result });
		}, function(error){
            console.log(error);
		});
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<TypeChooser>
				{type => <Chart type={type} data={this.state.data} />}
			</TypeChooser>
		)
	}
}

render(
	<ChartComponent />,
	document.getElementById("root")
);
