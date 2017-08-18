$(document).ready(function(){
    console.log('ready');

    const swiper = new Swiper('.swiper-container',{
        onInit: function(swiper){
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper);
        },
        direction: 'vertical',
        nextButton: '.arrow'
    });

    function static(static = null){
        if(!static){
            return;
        }
        const { title, people, data} = static;
        const numberHtml = `<span>${people}</span><span>人次</span>`;
        const titleHtml = `<p>${title}</p>`;
        $('#people').html(numberHtml);
        $('.traffic-static header .title').html(titleHtml);
        const result = [];
        data.forEach((item, index) => {
            const num = Math.floor(item / 5000);
            const last = item / 5000 - num;
            let block = '';
            for(let i = 0; i < num; i++){
                block += `<div class="block ani" swiper-animate-effect="fadeIn" swiper-animate-duration="0.5s" swiper-animate-delay="${0.5+(num - i) * 0.1}s"></div>`;
            }
            block += `<div class="block" width=".76rem" height="${last * 0.05}rem"`;
            const proccess = `<div class="number">${item}</div><div class="proccess">${block}</div>`;
            result.push(proccess);
        });
        $('.proccess-content').each((index, item) => {
            $(item).html(result[index]);
        });
    }

    function home(home = null){
        if(!home){
            return;
        }
        $('.middle-border').text(home.time);
    }

    function popularity(popularity = null){
        if(!popularity){
            return;
        }
        const { title, data } = popularity;
        $('#popularity .title').text(title);
        let html = '';
        data.forEach((item, index) => {
            html += `<li class="activity ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="0.5s">
                <div class="content ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.5s">
                    <p>${item.title}</p>
                    <p>公众号：${item.gongzhonghao}</p>
                </div>
                <div class="line ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.5s"></div>
                <div class="number ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.5s">
                    <p>参与人数</p>
                    <p>${item.number}</p>
                </div>
            </li>`
        });
        $('#popularity .middle-content').html(html);
    }

    function top(top = null){
        if(!top){
            return;
        }
        const { title, data } = top;
        $('#top .title').text(title);
        let html = '';
        data.forEach((item, index) => {
            html += `<li class="activity ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="0.5s">
                <div class="content ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.5s">
                    <p>${item.title}</p>
                    <p>公众号：${item.gongzhonghao}</p>
                </div>
                <div class="line ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.5s"></div>
                <div class="number ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.5s">
                    <p>参与人数</p>
                    <p>${item.number}</p>
                </div>
            </li>`
        });
        $('#top .middle-content').html(html);
    }

    function analysis(analysis = null){
        if(!analysis){
            return;
        }
        const { title, subtitle, imgs, content} = analysis;
        $('.hot-activity .title').text(title);
        $('.hot-activity .activity-title').text(subtitle);
        const defaultImage = '../images/occupy-img.png';
        $('.hot-activity .image').each((index, item) => {
            if(index > imgs.length){
                $(item).html(`<img src="${defaultImage}"/>`);
            }else{
                $(item).html(`<img src="${imgs[index]}"/>`);
            }
        });
        $('.hot-activity .introduction').text(content);
    }

    function rank(rank = null){
        if(!rank) return;
        const { title, data } = rank;
        $('#fans').text(title);
        let serial = '';
        let gongzhonghao = '';
        let increase = '';
        data.forEach((item, index) => {
            serial += `<li class="ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.2s" swiper-animate-delay="${0.7 + 0.1 * index}s">${item.id}</li>`;
            gongzhonghao += `<li class="ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.2s" swiper-animate-delay="${0.7 + 0.1 * index}s">${item.gongzhonghao}</li>`;
            increase += `<li class="ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.2s" swiper-animate-delay="${0.7 + 0.1 * index}s">${item.number}</li>`;
        });
        $('.serial-number').html(serial);
        $('.gongzhonghao-list').html(gongzhonghao);
        $('.increase-number').html(increase);
    }

    function final(final = null){
        if(!final) return;
        const { title, data } = final;
        $('.final-content-title').text(title);
        let html = '';
        data.forEach((item, index) => {
            if(index === 2){
                html += `<div class="content-previous ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="${0.5 + index * 0.1}s">${item}</div>`;
                return;
            }
            html += `<div class="content-previous ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="${0.5 + index * 0.1}s">${item}</div>
            <div class="connect-linear ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.5s" swiper-animate-delay="${0.6 + index * 0.1}s"></div>`;
        });
        $('.final .middle .content').html(html);
    }

    function init(data){
        home(data.home);
        static(data.static);
        popularity(data.popularity);
        top(data.top);
        analysis(data.analysis);
        rank(data.fans); 
        final(data.final);
    }

    $.ajax({
        url: 'http://www.lhbzimo.cn:5000/',
        dataType: 'json',
        type: 'GET',
        data: {},
        success: function(data){
            init(data);
        },
        error: function(err, data){
            console.log('request timeout');
        }
    })
});