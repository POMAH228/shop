window.onload = function(){
    var cart = {};
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
        //goods = arrayHelper(data);
        //console.log(goods);
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
            out +=`<button name="add_to_card" data="${data[i]['gsx$article']['$t']}">КУПИТЬ</button>`;
            out +=`</div>`;
        }
        document.querySelector('.shop_field').innerHTML = out;
    }
    document.onclick = function(e){
        console.log(e.target.attributes.name.nodeValue,e.target.attributes.data.nodeValue)
        if(e.target.attributes.name.nodeValue == 'add_to_card'){
            addToCart(e.target.attributes.data.nodeValue);
        }
    }
    function addToCart(elem){
        if(cart[elem] !== undefined){
            cart[elem]++;
        }
        else{
            cart[elem] = 1;
        }
        console.log(cart);
    }
    function arrayHelper(arr){
        var out = {};
        for(var i = 0; i < arr.length; i++){
            var temp = {};
            temp['articul'] = arr[i]['gsx$article']['$t'];
            temp['name'] = arr[i]['gsx$name']['$t'];
            temp['count'] = arr[i]['gsx$count']['$t'];
            temp['price'] = arr[i]['gsx$price']['$t'];
            temp['image'] = arr[i]['gsx$image']['$t'];
            out[arr[i]]['gsx$article']['$t']= temp;
        }
        return out;
    }
}