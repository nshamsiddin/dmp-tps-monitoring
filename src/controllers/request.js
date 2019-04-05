const logger = require('../utils/logger')
const Model = require('../models/request')
const datetime = require('../utils/datetime')
// const moment = require('moment')
// {"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}}

// exports.get = (from = (2019, 4, 3), to, interval = 1, group = 'seconds') => {
//     from = from ? new Date(from) : new Date()
//     to = to ? new Date(from) : new Date()

//     return Model.Request
//         .find({ 'date': { '$gte': new Date(2019, 2, 3), '$lte': to } })
//         .catch((err) => {
//             logger.error(`Error retrieving roles: ${err}`)
//         })
// }
test()

async function test() {
    console.log(
        await Model.Request
            .aggregate([{
                $match: {
                    date: {
                        $lte: new Date(),
                        $gte: new Date(datetime.daysago(40))
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                        dayOfMonth: { $dayOfMonth: '$date' },
                        hour: { $hour: '$date' },
                        minute: { $minute: '$date' },
                        second: { $second: '$date' }
                    }, cnt: { $sum: 1 }
                }
            }
            ])
    )
}


exports.getAggregated = (n = 1) =>
    Model.Request
        .aggregate([{
            $match: {
                date: {
                    $lte: new Date(),
                    $gte: new Date(datetime.daysago(n))
                }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$date' },
                    month: { $month: '$date' },
                    dayOfMonth: { $dayOfMonth: '$date' },
                    hour: { $hour: '$date' },
                    minute: { $minute: '$date' },
                    second: { $second: '$date' }
                }, cnt: { $sum: 1 }
            }
        }
        ])


exports.get = async (from, to, interval = 1, group = 'seconds') => {
    from = new Date()
    let today = new Date()
    let yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    console.log(yesterday)
    console.log(today)
    console.log(await Model.Request.find({ "date": { $gte: yesterday, $lte: today } }))
}

exports.create = user =>
    new Model.User(user)
        .save()
        .then(() => {
            logger.info(`User created: ${user}`)
        })
        .catch((err) => {
            logger.error(`Error creating a user: ${err}`)
        })

exports.remove = user =>
    Model.User
        .deleteOne({ id: user._id })
        .then(() => {
            logger.info(`User deleted: ${user}`)
        })