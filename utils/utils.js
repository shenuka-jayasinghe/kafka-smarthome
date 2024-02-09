exports.timeString = (timeStamp) => {
    return new Date(timeStamp).toLocaleTimeString();
} 

exports.genTemp = (avgTemp) => {
    const randTemp = avgTemp + (Math.random() * 1.8) - 0.9
    return `${randTemp.toFixed(2)}° C`
}