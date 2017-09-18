import BScroll from 'better-scroll';
import Promise from 'es6-promise';


(function ($, win, doc){
    const index = {
        config: {
            base_url: 'http://www.lhbzimo.cn:3001/',
            list_number: 0
        },
        data: {
            page: 1,
            next: false,
            status: 'ready',
        },
        init: function(){
            const _self = this;


            _self._initConfig();
            _self._initScroll();
            _self.operations = _self.createOperations();


            _self.load(_self.initHtml);
            _self.bind();
        },
        _initConfig: function(){
            const _self = this;
            const defaultListWidth = 320;
            const clientWidth = win.innerWidth || doc.documentElement.clientWidth;
            if(defaultListWidth > 750){
                _self.config['list_number'] = Math.floor(clientWidth / defaultListWidth);
            }else{
                _self.config['list_number'] = 2;
            }
        },
        _initScroll: function(){
            const _self = this;
            const wrapper = document.getElementById('wrapper');
            const options = {
                probeType: 1,
                click: true,
                scrollbar: false,
                bounduceTime: 2000
            };
            _self.scroll = new BScroll(wrapper, options);
        },
        bind: function(){
            const _self = this;
            _self.scroll.on('touchEnd', function(position){
                if(position.y < _self.scroll.maxScrollY - 20){
                    _self.more();
                }else if(position.y > 80){
                    _self.update(_self.initHtml);
                }
            });
            _self.scroll.on('scroll', function(position){
                if(position.y > 80){
                    _self.operations.up();
                }else{
                    _self.operations.down();
                }
            });
        },
        fetch: function(url){
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    data: {},
                    success: function(data){
                        resolve(data);
                    },
                    error: function(){
                        reject('request timeout');
                    }
                });
            });
        },
        load: function(fn){
            const _self = this;
            const url = _self.config.base_url + _self.data.page;
            _self.operations.bShow();
            _self.scroll.refresh();
            return _self.fetch(url).then(data => {
                setTimeout(() => {
                    _self.operations.bHide();
                    _self.data.next = data.next;
                    if(!data.next){
                        _self.bottomLine();
                    }
                    _self.data.page++;
                    fn.call(_self, data.data);
                    _self.data.status = 'ready';
                }, 500);
                setTimeout(() => {
                    _self.scroll.refresh();
                }, 600);
            }, err => {
                console.log(err);
            }).catch(e => console.log(e));
        },
        update: function(fn){
            const _self = this;
            const url = _self.config.base_url + 'update/' + (_self.data.page - 1);
            _self.operations.tShow();
            _self.operations.aHide();
            return _self.fetch(url).then(data => {
                setTimeout(() => {
                    _self.operations.tHide();
                    _self.operations.aShow();
                    _self.data.next = data.next;
                    fn.call(_self, data.data);
                }, 500);
                setTimeout(() => {
                    _self.scroll.refresh();
                    _self.data.status = 'ready';
                }, 600);
            }, er => {
                console.log(err);
            }).catch(e => console.log(e));
        },
        templ: function(data){      //div template
            const block = doc.createElement('div');
            block.className = 'list-item';
            const value = `
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
                </div>`;
            block.innerHTML = value;
            return block;
        },
        setHtml: function(data){
            const _self = this;
            const fragments = _self.setFragements(data);
            $('.list-wrapper').each((index, item) => {
                $(item).append(fragments[index]);
            });
        },
        initHtml: function(data){     //initial html template
            const _self = this;
            const fragment = doc.createDocumentFragment();
            const fragments = _self.setFragements(data);
            fragments.forEach((item, index) => {
                const listItem = doc.createElement('li');
                listItem.className = 'list-wrapper';
                listItem.appendChild(item);
                fragment.appendChild(listItem);
            });
            $('.wrapper').html(fragment);
        },
        setFragements: function(data){      //generate some fragement
            const _self = this;
            const count = _self.config['list_number'];
            const fragments = _self.getFragments(count);
            data.forEach((item, index) => {
                const i = index % count;
                const block = _self.templ(item);
                fragments[i].appendChild(block);
            });
            return fragments;
        },
        getFragments: function(num){
            const arr = [];
            for(let i = 0; i < num; i++){
                arr.push(doc.createDocumentFragment());
            }
            return arr;
        },
        more: function(){
            const _self = this;
            let status = _self.data.status;
            if(_self.data.next){
                if(status === 'ready'){
                    _self.data.status = 'pending';
                    _self.load(_self.setHtml);
                }
            }
        },
        refresh: function(){
            const _self = this;
            let status = _self.data.status;
            if(status == 'ready'){
                _self.data.status = 'pending';
                _self.update(_self.initHtml);
            }
        },
        createOperations: function(){
            const _self = this;
            let bottomloading = null;
            let toploading = null;
            let arrow = null;
            
            if(!arrow){
                arrow = document.getElementById('arrow');
            }
            

            if(!toploading){
                toploading = document.getElementById('toploading');
            }

            if(!bottomloading){
                bottomloading = document.getElementById('loading');
            }

            function bShow(){
                bottomloading.style.display = 'block';
            }

            function bHide(){
                bottomloading.style.display = 'none';
            }
            
            function tShow(){
                toploading.style.display = 'block';
            }

            function tHide(){
                toploading.style.display = 'none';
            }

            function up(){
                if(arrow.className.indexOf('arrow_up') == -1){
                    arrow.className += ' arrow_up';
                }
            }

            function down(){
                if(arrow.className.indexOf('arrow_up') !== -1){
                    const arr = arrow.className.split(' ');
                    arr.pop();
                    arrow.className = arr.join('');
                }
            }

            function aShow(){
                arrow.style.display = 'block';
            }

            function aHide(){
                arrow.style.display = 'none';
            }

            return { bShow, bHide, tShow, tHide, up, down, aShow, aHide };
        },
        bottomLine: function(){
            const bottom = document.getElementById('bottom');
            bottom.style.display = 'block';
        }
    };

    index.init();
})(jQuery, window, document)