const feedbackFormEl = document.querySelector('.js-feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

(() => {
  try {
    const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!storageData) return;

    formData = storageData;

    Object.keys(storageData).forEach(key => {
      if (feedbackFormEl.elements[key]) {
        feedbackFormEl.elements[key].value = storageData[key];
      }
    });
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
})();

const onFormFieldInput = event => {
  const { value, name } = event.target;

  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
};

const onFormFieldSubmit = event => {
  event.preventDefault();

  // Перевірка, чи всі поля заповнені
  const isEmptyFields = Object.values(formData).some(value => value === '');
  if (isEmptyFields) {
    alert('Please, fill in all fields');
    return;
  }

  // Виведення даних у консоль
  console.log(formData);

  // Очищення локального сховища, форми та об'єкта formData
  feedbackFormEl.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
};

feedbackFormEl.addEventListener('input', onFormFieldInput);
feedbackFormEl.addEventListener('submit', onFormFieldSubmit);