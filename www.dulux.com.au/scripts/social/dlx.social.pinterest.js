function pinIt() {
    var e = document.createElement('script');
    e.setAttribute('type', 'text/javascript');
    e.setAttribute('charset', 'UTF-8');
    e.setAttribute('src', '../assets.pinterest.com/js/pinmarklet2a3b.js?r=' + Math.random() * 99999999);
    document.body.appendChild(e);
}