import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const feedbackStateKey = 'feedback-form-state';


const saveFormData = throttle(() => {
  const formData = {
    email: feedbackForm.elements.email.value,
    message: feedbackForm.elements.message.value,
  };

  localStorage.setItem(feedbackStateKey, JSON.stringify(formData));
}, 500);

window.addEventListener('load', () => {
  const storedFormData = localStorage.getItem(feedbackStateKey);

  if (storedFormData) {
    const parsedFormData = JSON.parse(storedFormData);
    feedbackForm.elements.email.value = parsedFormData.email || '';
    feedbackForm.elements.message.value = parsedFormData.message || '';
  }
});


feedbackForm.addEventListener('input', saveFormData);


feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = {
    email: feedbackForm.elements.email.value,
    message: feedbackForm.elements.message.value,
  };

  console.log('Form Data:', formData);

  localStorage.removeItem(feedbackStateKey);
});
