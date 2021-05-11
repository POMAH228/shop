window.onload = function(){
    function showDate(){
        var str = '';
        var now = new Date();
        str = now.toLocaleTimeString();
        document.querySelector('.date').innerHTML = str;
        setInterval(showDate, 1000);
    }
    showDate();
    $.getJSON("https://spreadsheets.google.com/feeds/list/1sjtA9tOpOcrodHobqiPJUq19kErOgly4UPUNZoFnsWE/od6/public/values?alt=json",
    function(data){
        data = data['feed']['entry']
        console.log(data);
        show(data);
    }
    )

    function show(data){
        var out = '';
        for(var i = 0; i < data.length; i++)
        {
            out +=`<div class="card">`;
            out +=`<h3 class="title">${data[i]['gsx$name']['$t']}</h3>`;
            out +=`<img src="${data[i]['gsx$image']['$t']}" alt="">`;
            out +=`<p class="price">цена: ${data[i]['gsx$price']['$t']}</p>`;
            out +=`<button name="add_to_card" data="${data[i]['gsx$atricle']['$t']}">КУПИТЬ</button>`;
            out +=`</div>`;
        }
        document.querySelector('.shop_field').innerHTML = out;
    }
    document.onclick = function(e){
        console.log(e.target.attributes.name.nodeValue,e.target.attributes.data.nodeValue)
    }
}