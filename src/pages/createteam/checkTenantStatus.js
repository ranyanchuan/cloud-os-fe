
function loading() {
    var loadingElm = document.getElementById('loading')
    var loadingText = '.'
    function loop() {
        setTimeout(function () {
            if (loadingElm.innerText.length === 3) {
                loadingElm.innerText = loadingText
            } else {
                loadingElm.innerText += loadingText
            }
            loop()
        }, 300)
    }
    loop()
}
export function check(tenantId, loadingFunc, successFunc) {
    var xhr = new XMLHttpRequest()
    xhr.onload = loop;
    xhr.open('get', '/manager/teamEnter/check?tenantId=' + tenantId + '&ts=' + new Date().getTime())
    xhr.send()
    function loop() {
        if (this.status == 200) {
            var result = {
                data: false
            }
            try {
                result = JSON.parse(this.responseText)
            } catch (e) {
                console.log(e)
            }
            if (result.data) {
                successFunc();
            } else {
                clearTimeout(t);
                const t = setTimeout(function () {
                    loadingFunc(tenantId);
                    check(tenantId, loadingFunc, successFunc)
                }, 300)
            }
        } else {
            setTimeout(function () {
                successFunc();
            }, 1000)
        }
    }
}