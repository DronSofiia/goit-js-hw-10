import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";






const refs = {
    datePicker: document.querySelector('#datetime-picker'),
    timer: document.querySelector('.timer'),
    buttonStart: document.querySelector('[data-start]')
};



let userSelectDate = null; 
refs.buttonStart.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];

            if (selectedDate.getTime() > Date.now()) {
                userSelectDate = selectedDate;
                refs.buttonStart.disabled = false;
            } else {
                iziToast.error({
                    title: "Error",
                    message: "Please choose a date in the future",
                    position: "topRight",
                    backgroundColor: " #ef4040",
                    class: "message",
                    icon: "false"
                }); 

                refs.buttonStart.disabled = true;
            }
        

  
   
    },
  };
  
flatpickr(refs.datePicker, options);


function addLeadingZero(value){
    return String(value).padStart(2, '0')
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function timerMarkup({ days, hours, minutes, seconds }) {
    return `
        <div class="timer">
        <div class="field">
        <span class="value" data-days>${addLeadingZero(days)}</span>
        <span class="label">Days</span>
        </div>
        <div class="field">
        <span class="value" data-hours>${addLeadingZero(hours)}</span>
        <span class="label">Hours</span>
        </div>
        <div class="field">
        <span class="value" data-minutes>${addLeadingZero(minutes)}</span>
        <span class="label">Minutes</span>
        </div>
        <div class="field">
        <span class="value" data-seconds>${addLeadingZero(seconds)}</span>
        <span class="label">Seconds</span>
        </div>
        </div>`
};


refs.buttonStart.addEventListener('click', (e) => {
    refs.buttonStart.disabled = true;

    const intervalId = setInterval(() => {
        const currentDate = new Date();
        const diffMS = userSelectDate - currentDate;

        if (diffMS <= 0) {
            return;
        }
        const result = convertMs(diffMS);
        refs.timer.innerHTML = timerMarkup(result);
        
    


       
    }, 1000);
});




  