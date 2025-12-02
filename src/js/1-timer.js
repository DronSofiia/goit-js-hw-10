import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";






const refs = {
    datePicker: document.querySelector('#datetime-picker'),
    timer: document.querySelector('.timer'),
    buttonStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')

};



let userSelectDate = null; 
let intervalId = null;
refs.buttonStart.disabled = true;
refs.buttonStart.classList.add('is-disabled')





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
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds)
};


refs.buttonStart.addEventListener('click', (e) => {
    refs.buttonStart.disabled = true;
    refs.datePicker.disabled = true;

    intervalId = setInterval(() => {
        const currentDate = new Date();
        const diffMS = userSelectDate - currentDate;

        if (diffMS <= 0) {
            clearInterval(intervalId);
            timerMarkup({days: 0, hours: 0, minutes: 0, seconds: 0 });
            refs.datePicker.disabled = false;
            return;
        }
        const result = convertMs(diffMS);
        
        timerMarkup(result);
    


       
    }, 1000);
});




  