const t=document.querySelector("button[data-start"),e=document.querySelector("button[data-stop");let o=null;function r(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(()=>{t.disabled=!0,o=setInterval((()=>{document.body.style.backgroundColor=r(),localStorage.setItem("current-color",r())}),1e3)})),e.addEventListener("click",(()=>{clearInterval(o),t.disabled=!1})),document.body.style.backgroundColor=localStorage.getItem("current-color"),localStorage.clear();
//# sourceMappingURL=01-color-switcher.70f5f525.js.map
