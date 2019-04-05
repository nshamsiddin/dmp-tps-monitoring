$('document').ready(() => {
    const url = '/api/requests'
    $.ajax({
        url: url,
        type: 'GET',
        // dataType: 'json', // added data type
        success: (res) => {
            draw(res)
        }
    })

    let data = {}

    function draw(stats) {
        stats = stats.map(element => {
            const date = castdate(element._id)
            const tps = element.cnt
            return { date, tps }
        })
        data = {
            labels: stats.map(element => element.date),
            datasets: [{
                label: 'tps',
                data: stats.map(element => {
                    return {
                        t: element.date,
                        y: element.tps
                    }
                }),

                
                
            }]
        }


        var ctx = document.getElementById('myChart').getContext('2d')
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                fill: false
            }
        })
    }

    function castdate(date) {
        // 1995-12-17T03:24:00
        return `${date.year}-${date.month}-${date.dayOfMonth}T${date.hour}:${date.minute}:${date.second}`
    }



    // var ctx = document.getElementById("examChart").getContext("2d");

    // var myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels: [new Date("2015-3-15 13:3").toLocaleString(), new Date("2015-3-25 13:2").toLocaleString(), new Date("2015-4-25 14:12").toLocaleString()],
    //         datasets: [{
    //             label: 'Demo',
    //             data: [{
    //                 t: new Date("2015-3-15 13:3"),
    //                 y: 12
    //             },
    //             {
    //                 t: new Date("2015-3-25 13:2"),
    //                 y: 21
    //             },
    //             {
    //                 t: new Date("2015-4-25 14:12"),
    //                 y: 32
    //             }
    //             ],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     }
    // })

    // data = {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //         label: 'tps',
    //         data: [12, 19, 3, 51, 20, 3, 51, 20, 3],
    //         backgroundColor: [
    //             'rgba(255, 99, 132, 0.2)',
    //             'rgba(54, 162, 235, 0.2)',
    //             'rgba(153, 102, 255, 0.2)',
    //             'rgba(255, 159, 64, 0.2)'
    //         ],
    //         borderColor: [
    //             'rgba(255, 99, 132, 1)',
    //             'rgba(54, 162, 235, 1)',
    //             'rgba(153, 102, 255, 1)',
    //             'rgba(255, 159, 64, 1)'
    //         ],
    //         borderWidth: 1
    //     }]
    // }



    // var myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // })

})

