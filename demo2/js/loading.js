var loadingHtml = `<div class="refresh-layer" style="z-index: 100; width: 100%; height: 100%;position: absolute; top:0; left: 0; background: black; opacity: 0.8;">
            <div class="loading-part" style="width: 100px; margin: -50px auto; position: relative; top: 50%;text-align: center">
                <img src="./imgs/loading3.gif" alt="loading" style="width: 50%; margin: 0 auto;">
                <span class="loading" style="font-size: 16px;color: white">loading</span>
            </div>
        </div>`;

document.write(loadingHtml);

window.onload = function(){
    var loadingLayer = document.getElementsByClassName('refresh-layer')[0];
    loadingLayer.parentNode.removeChild(loadingLayer);
}