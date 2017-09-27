

const table = (function($, win){
  var table = {
    config: {
      url: 'http://www.lhbzimo.cn:3111',
    },
    init: function(){
      const _self = this;
      console.log('exec');
      _self.setData();
    },
    fetch: function(){
      const _self = this;
      console.log(11);
      return new Promise((resolve, reject) => {
        const url = _self.config.url + '/api/person';
        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'json',
          data: {},
          success: function(response){
            const res = JSON.parse(response);
            if(res["code"] == 0){
              resolve(res.data);
            }else{
              reject('code is error');
            }
          },
          error: function(){
            reject('request timeout');
          }
        });
      });
    },
    setData: function(){
      const _self = this;
      _self.fetch().then((data) => {
        _self.tepl(data);
      }, (err) => {
        console.log(err);
      }).catch((err) => {
        console.log(err);
      });
    },
    tepl: function(data){
      const _self = this;
      const { name, hometown, nation, university, degree, title, birthday, ccp_date, work_date, photo } = data.officer;
      const tableContent = `
        <tr>
          <td class="avatar">
            <img src="${photo}" />
          </td>
          <td>
            <p class="name">${name}</p>
            <p class="title">${title}</p>
          </td>
        </tr>
        <tr>
          <td class="thead">籍贯</td>
          <td class="content nation">${nation}</td>
        </tr>
        <tr>
          <td class="thead">民族</td>
          <td class="content hometown">${hometown}</td>
        </tr>
        <tr>
          <td class="thead">出生年月</td>
          <td class="content birthday">${_self.getTime(birthday)}</td>
        </tr>
          <tr>
          <td class="thead">入党时间</td>
          <td class="content ccp_time">${_self.getTime(ccp_date)}</td>
        </tr>
        <tr>
          <td class="thead">毕业院校</td>
          <td class="content university">${university}</td>
        </tr>
        <tr>
          <td class="thead">学历/学位</td>
          <td class="content degree">${degree}</td>
        </tr>
        <tr>
          <td class="thead">参与工作时间</td>
          <td class="content work_time">${_self.getTime(work_date)}</td>
        </tr>
      `;
      const table = document.createElement('table');
      table.innerHTML = tableContent;
      document.getElementsByClassName('container')[0].appendChild(table);
    },
    getTime: function(time){
      const date = new Date(time);
      return date.getFullYear() + '年' + date.getMonth() + '月';
    }
  }
  return table;
})(jQuery, window);

table.init();