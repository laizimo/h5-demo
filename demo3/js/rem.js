// (function(win, doc){
//     const docEl = doc.documentElement;
//     const resEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
//     const reclac = function(){
//         if(!docEl.clientWidth) return;
//         const width = docEl.clientWidth;

//         if(width > 750) docEl.style.fontSize = '100px';
//         else docEl.style.fontSize = width / 6.4 + 'px';
//     }

//     if(doc.addEventListener){
//         win.addEventListener(resEvt, reclac, false);
//         doc.addEventListener('DOMCententLoaded', reclac, false);
//     }
// })(window, document);

(function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
   
    recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
      if(clientWidth > 750){    //针对移动版的页面控制在750px内
           docEl.style.fontSize = '100px';
      }
        if(clientWidth <750){
          // docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
           docEl.style.fontSize = clientWidth/ 6.4+ 'px';
           
        }
       
      
        };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);