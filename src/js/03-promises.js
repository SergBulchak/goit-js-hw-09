import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');


form.addEventListener('submit', event => {
  event.preventDefault();
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  console.log(delayValue, stepValue);
  for (let i = 0; i < amount.value; i += 1) {
    createPromise(i + 1, delayValue + i * stepValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}