$(document).ready(function(){
    let page = 1;
    let next = true;
    getMoreData(1, next);
    console.log(next);
    $('.wrapper').on('touchend', function(){
        // console.log(isScrollPageBottom());
        if(next){
            if(isScrollPageBottom()){
                page++;
                next = getMoreData(page);
            }
        }
    })
});

function getMoreData(page, next){
    const url = 'http://localhost:3000/'+page;
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'GET',
        data: {},
        success: function(data){
            setData(data);
            // console.log(data);
            next = data.next;
        },
        error: function(){
            console.log('request timeout');
        }
    });
}

function getViewPortSize(){
    const w = window;

    if(w.innerWidth != null){
        return {w: w.innerWidth, h: w.innerHeight};
    }

    const d = w.document;
    if(document.compatMode == 'CSS1Compat'){
        return {w: document.documentElement.clientWidth, h: document.documentElement.clientHeight};
    }

    return {w: document.body.clientWidth, h: document.body.clientHeight};
}

function isScrollPageBottom(){
    var documentHeight = document.documentElement.offsetHeight;
    const viewPortHeight = getViewPortSize().h;
    const scrollHeight = window.pageYOffset || document.documentElement.scrollY || document.body.scrollTop || 0;
    return documentHeight - viewPortHeight - scrollHeight < 20;
}

function setData(data){
    const arr = data.data;
    let liwrapper = ['', ''];
    for(let index in arr){
        if(index % 2 === 0){
            liwrapper[1] += setHtml(arr[index]);
        }else{
            liwrapper[0] += setHtml(arr[index]);
        }
    }
    $('.list-wrapper').each(function(index, item){
        $(item).append(liwrapper[index]);
    });
}

function setHtml(data){
    const li = `<div class="list-item">
    <img src="${data.image}" alt="person-image">
    <div class="name">${data.name}</div>
    <div class="info">
        <span class="id">编号： ${data.id}</span>
        <span class="vote"><span class="count">${data.vote}</span>票</span>
    </div>
    <div class="desc">
            ${data.desc}
    </div>
    <div class="btn-group">
        <button class="btn detail" data-value="${data.id}">候选详情</button>
        <button class="btn vote" data-value="${data.id}">为TA投票</button>
    </div>
</div>`;
    return li;
}