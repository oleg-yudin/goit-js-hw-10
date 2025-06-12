import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




const btn = document.querySelector("button");
const input = document.querySelector("#datetime-picker");

const day = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");


btn.addEventListener("click", clickFunc);

function clickFunc() { 
    btn.disabled = true;
    input.disabled = true;
    const timer = setInterval(() => {
        let i = convertMs(ms);
        day.innerHTML = addLeadingZero(i.days);
        hours.innerHTML = addLeadingZero(i.hours);
        minutes.innerHTML = addLeadingZero(i.minutes);
        seconds.innerHTML = addLeadingZero(i.seconds); 
        //  console.log(ms -= 1000);
    
        ms -= 1000;
         
        // console.log(ms);
        if (ms <= 0) {
            clearInterval(timer);
            input.disabled = false;
        }
        
    }, 1000);
    
};

const userSelectedDate = [];
let ms = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
        if (selectedDates[0].getTime() < new Date()) {
            // window.alert("Please choose a date in the future");
            iziToast.show({
                title: 'Please choose a date in the future',
                color: 'red', // blue, red, green, yellow
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
           
            });
            btn.disabled = true;
           
        }
        else {
            btn.disabled = false;
        }
        userSelectedDate.push(selectedDates); 
        

        ms = selectedDates[0].getTime() - new Date();

        
        
    }
  };


flatpickr("#datetime-picker", options);

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
     ;
    
}

function addLeadingZero(value) {
    let i = value.toString();
    
    if (i.length > 2) {
        return i.padStart(3, "0");
    }
    else if (i.length > 3) {
        return i.padStart(4, "0");
    }
    
    return i.padStart(2, "0");
    
    
  }
