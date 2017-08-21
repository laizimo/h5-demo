// (function(doc, win) {
//     console.log(111);
//     var docEl = doc.documentElement;
//     var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

//     var recalc = function recalc() {
//         var clientWidth = document.clientWidth;

//         if(!clientWidth) return;
//         if(clientWidth > 750) {
//             docEl.style.fontSize = '100px';
//             console.log(11);
//         }else{
//             docEl.style.fontSize = clientWidth / 7.5 + 'px';
//             console.log(docEl.style.fontSize);
//         }
//     }

//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);

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
					 docEl.style.fontSize = clientWidth/ 7.5+ 'px';
					 
				  }
				 
				
				  };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
            })(document, window);