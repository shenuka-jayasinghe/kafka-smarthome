const { consumeHeating } = require("../consumer/status")

exports.getHeating = (req, res) => {
    console.log("controller reached")
    // consumeHeating().then( result => {
    //     console.log(result)
    //     res.status(200).send(result)
    // })
    result = consumeHeating()
    res.status(200).send(result)
}