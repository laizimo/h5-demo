(function(doc, win){
    const docEl = doc.documentElement;
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    const recale = function(){
        const width = docEl.clientWidth;
        if (!width) return;
        if(width > 750){
            docEl.style.fontSize = '100px';
        }else{
            docEl.style.fontSize = width / 6.4 + 'px';
        }
    };

    if(document.addEventListener){
        win.addEventListener(resizeEvt, recale, false);
        doc.addEventListener('DOMContentLoaded', recale, false);
    }
})(document, window);