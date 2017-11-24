
import axios from 'axios';

export function getDaily(code, done, error){
    axios.get("https://www.alphavantage.co/query", { params: {
        function: 'TIME_SERIES_DAILY',
        symbol: code,
        apikey: 'IQ13WQ4T5IMTLPHI'
    }}).then(response => {
        if(response.data){
            done(response.data);
        }
        else{
            error("No data found");
        }
    }).catch(function (err) {
        error(err)
    });
}
