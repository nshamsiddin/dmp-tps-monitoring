const moment = require('moment')

exports.getCurrentDatetime = () => new Date()




// var d = new Date()
// var offset = (new Date().getTimezoneOffset() / 60) * -1
// var n = new Date(d.getTime() + offset)

// console.log(d.toLocaleString())
// console.log(new Date(d.toLocaleString()))


// function calcTime(city) {
//     d = new Date()
//     const offset = (d.getTimezoneOffset() / 60) * -1
//     utc = d.getTime() + (d.getTimezoneOffset() * 60000)
//     nd = new Date(utc + (3600000 * offset))
//     return nd
// }


exports.yesterday = () => {
    var yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    // console.log(yesterday)
    return yesterday
}

exports.daysago = (n) => {
    let date = new Date()
    date.setDate(date.getDate() - n)
    return date
}