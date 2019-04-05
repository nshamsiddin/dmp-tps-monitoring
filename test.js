$(document).ready(() => {

    let table_elements = []
    populate_table()

    $('.delete-button').click((e) => {
        if (confirm('Are you sure')) {
            const url = 'localhost/' + window.location.pathname + '/delete'
            console.log(url)
            $.ajax({
                type: 'DELETE',
                url: url,
                data: 'id=' + e.target.id,
                success: () => {
                    location.reload();
                }
            })
        }
    })

    function populate_table() {
        const url = window.location.pathname + '/get'

        $.get(url, (payload, status) => {
            if (table_elements != payload.elements) {
                let data = payload.elements
                let visibility = payload.config.info
                // console.log(visibility)
                let table = document.createElement('table')
                $(table).addClass('table')
                let thead = document.createElement('thead')
                $(thead).addClass('thead-dark')
                let tbody = document.createElement('tbody')

                for (let i in data) {
                    if (i == 0) {
                        let tr = document.createElement('tr')
                        let th = document.createElement('th')

                        th.append('#')
                        tr.append(th)

                        for (let j in visibility) {
                            if (visibility[j].show == true) {
                                let th = document.createElement('th')
                                th.append(visibility[j].text)
                                tr.append(th)
                            }
                        }

                        if (data[i]['state']) {
                            let th = document.createElement('th')
                            th.append('Скачать')
                            tr.append(th)
                        }


                        $(thead).append(tr)
                    }
                    let tr = document.createElement('tr')
                    let th = document.createElement('th')
                    th.append(i * 1 + 1)
                    tr.append(th)

                    let tmp_class

                    switch (data[i]['state']) {
                        case -1:
                            tmp_class = 'table-danger'
                            break
                        case 1:
                            tmp_class = 'table-warning'
                            break
                        case 2:
                            tmp_class = 'table-success'
                            break
                        default:
                            break
                    }

                    $(tr).addClass(tmp_class)
                    // $(tr).attr('href', url + '/' + data[i]['_id'])

                    for (let j in visibility) {
                        if (visibility[j].show == true) {
                            let td = document.createElement('td')
                            let tmp
                            if (j == 'state') {

                                switch (data[i][j]) {
                                    case -1:
                                        tmp = 'Ошибка'
                                        break
                                    case 1:
                                        tmp = 'Выполняется'
                                        break
                                    case 2:
                                        tmp = 'Выполнено'
                                        break
                                    default:
                                        break
                                }

                                // tmp = 'success'
                            } else {
                                tmp = data[i][j]
                            }
                            td.append(tmp)
                            tr.append(td)
                        }
                    }

                    let td = document.createElement('td')
                    $(td).attr('align', 'center')
                    let a = document.createElement('a')
                    let image = document.createElement("IMG");

                    switch (data[i]['state']) {
                        case -1:
                            image.src = "https://cdn.onlinewebfonts.com/svg/img_255632.png";

                            $(image).attr('width', 15)
                            image.setAttribute('class', 'photo');
                            a.append(image);
                            td.append(a)
                            break
                        case 1:
                            let loader = document.createElement('div')
                            $(loader).addClass('loader')
                            td.append(loader)
                            break
                        case 2:
                            $(a).attr('href', url + '/' + data[i]['_id'])
                            image.src = "https://www.leica-microsystems.com/uploads/tx_leicaproducts/download-icon.png";

                            $(image).attr('width', 15)
                            image.setAttribute('class', 'photo');
                            a.append(image);
                            td.append(a)
                            break
                    }


                    tr.append(td)

                    // if (data[i]['state'] == '-1') {
                    //     image.src = "https://cdn.onlinewebfonts.com/svg/img_255632.png";
                    // }
                    // if (data[i]['state'] == '1') {
                    //     image.src = "https://cdn.onlinewebfonts.com/svg/img_235526.png";
                    // }
                    // if (data[i]['state'] == '2') {
                    // }





                    //

                    // $(td).addClass('loader')
                    // td.append(a)
                    // tr.append(td)


                    // }

                    tbody.append(tr)
                }
                table.append(thead)
                table.append(tbody)
                $('#table-place').append(table)
                console.log('updated')
            }
            else {
                $('#table-place').empty()
                console.log('not updated')
            }

        })

    }
})