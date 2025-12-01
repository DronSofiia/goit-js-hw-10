import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as u,i as p}from"./assets/vendor-BbbuE1sJ.js";const e={datePicker:document.querySelector("#datetime-picker"),timer:document.querySelector(".timer"),buttonStart:document.querySelector("[data-start]")};let o=null;e.buttonStart.disabled=!0;const f={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const a=t[0];a.getTime()>Date.now()?(o=a,e.buttonStart.disabled=!1):(p.error({title:"Error",message:"Please choose a date in the future",position:"topRight",backgroundColor:" #ef4040",class:"message",icon:"false"}),e.buttonStart.disabled=!0)}};u(e.datePicker,f);function r(t){return String(t).padStart(2,"0")}function m(t){const i=Math.floor(t/864e5),l=Math.floor(t%864e5/36e5),c=Math.floor(t%864e5%36e5/6e4),d=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:l,minutes:c,seconds:d}}function v({days:t,hours:a,minutes:s,seconds:n}){return`
        <div class="timer">
        <div class="field">
        <span class="value" data-days>${r(t)}</span>
        <span class="label">Days</span>
        </div>
        <div class="field">
        <span class="value" data-hours>${r(a)}</span>
        <span class="label">Hours</span>
        </div>
        <div class="field">
        <span class="value" data-minutes>${r(s)}</span>
        <span class="label">Minutes</span>
        </div>
        <div class="field">
        <span class="value" data-seconds>${r(n)}</span>
        <span class="label">Seconds</span>
        </div>
        </div>`}e.buttonStart.addEventListener("click",t=>{e.buttonStart.disabled=!0,setInterval(()=>{const s=o-new Date;if(s<=0)return;const n=m(s);e.timer.innerHTML=v(n)},1e3)});
//# sourceMappingURL=1-timer.js.map
