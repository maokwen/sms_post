function refresh() {
    var url = 'api/';
    const request = new Request(url, {
        method: 'GET',
        mode: 'cors'
    });
    fetch(request)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then((data) => {
            console.log(data);
            let sms_list = document.getElementById('sms-list');

            if (data.length == 0) {
                sms_list.innerHTML = '<p>暂无信息</p>';
            } else {
                sms_list.innerHTML = '';
                const template = document.querySelector('#sms-item-template');

                data.forEach((item) => {
                    console.log(item);
                    const clone = template.content.cloneNode(true);
                    let sms_from = clone.querySelector('.sms-item-from');
                    let sms_date = clone.querySelector('.sms-item-date');
                    let sms_text = clone.querySelector('.sms-item-text');
                    sms_from.textContent = item.sms_from;
                    sms_date.textContent = item.sms_date;
                    sms_text.textContent = item.sms_text;
                    sms_list.appendChild(clone);
                });
            }
        });
}

window.addEventListener('load', refresh, false);
