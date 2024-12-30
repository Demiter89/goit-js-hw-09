const feedbackFormEl = document.querySelector('.js-feedback-form');

let formData = {
  email: '',
  message: '',
};

(() => {
  try {
    const storageData = JSON.parse(localStorage.getItem('feedback-form-state'));

    if (storageData === null) {
      return;
    }

    formData = storageData;

    for (const key in storageData) {
      if (feedbackFormEl.elements[key]) {
        feedbackFormEl.elements[key].value = storageData[key];
      }
    }
  } catch (error) {
    console.log(error);
  }
})();

const onFormFieldInput = event => {
  const { value, name } = event.target;

  formData[name] = value.trim();

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFormFieldSubmit = event => {
  event.preventDefault();

  const isEmptyFields = Object.values(formData).some(value => value === '');
  if (isEmptyFields) {
    alert('Please, fill in all fields');
  } else {
    console.log(formData);
  }

  feedbackFormEl.reset();
  localStorage.removeItem('feedback-form-state');

  formData = { email: '', message: '' };
};

feedbackFormEl.addEventListener('input', onFormFieldInput);
feedbackFormEl.addEventListener('submit', onFormFieldSubmit);