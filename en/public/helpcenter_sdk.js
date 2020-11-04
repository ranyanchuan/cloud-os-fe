!(function (win, doc) {

  function Helpcenter_SDK(opt) {
    this.opt = opt;
  }

  Helpcenter_SDK.prototype.goHelpcenter = function (code, callback) {
		const y = "htt";
    let url = y + 'ps://helpcenter-yonbip.diwork.com'
    url = url + code
    let xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.open('GET', y + 'ps://helpcenter-yonsuite.diwork.com/helpManage/help/getHelpUrlByOpen?random=' + Math.random() + '&service=' + url, true)
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          let res = JSON.parse(xmlhttp.responseText)
          if (res.status === 1) {
            window.open(res.data.data)
          }
        } else {
          if (xmlhttp.status === 0) {
						callback();
            return 1
          }
          window.open(url)
        }
      }
    }
    xmlhttp.send()
  }

  win.HelpcentSdk = new Helpcenter_SDK();

})(window, document);
