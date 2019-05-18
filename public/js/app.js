console.log('client js file is loaded');

fetch('http://puzzle.mead.io/puzzle')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('testing');
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch(`http://localhost:3000/weather?address=${location}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    messageOne.textContent = data.forecast;
    messageTwo.textContent = data.location;
  })
  .catch((err) => {
    messageOne.textContent = 'error happened';
  });
});