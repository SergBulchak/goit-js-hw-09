import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateFormEl = document.getElementById('datetime-picker');
const getBtnStartEl = document.querySelector('[data-start]');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMin = document.querySelector('[data-minutes]');
const dateSec = document.querySelector('[data-seconds]');



getBtnStartEl.disabled = true;
let selectedDate = 0;
let dateCounter = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    
      if ((selectedDate - Date.now()) > 0) {
        getBtnStartEl.disabled = false;
      } else {
          Notify.failure('Please choose a date in the future');
          return}
  },
};
flatpickr(dateFormEl, options);

getBtnStartEl.addEventListener('click', () => {
  dateCounter = (selectedDate - options.defaultDate);
  getBtnStartEl.disabled = true;
  Notify.success('Відлік пішов!'); 
  const timerId = setInterval(() => {
    
  if (dateCounter - 600 > 0) {
      convertData(convertMs(dateCounter));
      dateCounter = dateCounter - 600;
  } else {
      Notify.warning('Відлік завершено. Оберіть нову дату!');
      clearInterval(timerId);
      getBtnStartEl.disabled = false;
      return
    }        
  }, 600);
  return;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
  return { days, hours, minutes, seconds };
}

function convertData(data) {
  dateDays.textContent = addLeadingZero(`${data.days}`);
  dateHours.textContent = addLeadingZero(`${data.hours}`);
  dateMin.textContent = addLeadingZero(`${data.minutes}`);
  dateSec.textContent = addLeadingZero(`${data.seconds}`);
}

function addLeadingZero(value) {
  return value.padStart(2,'0');
}