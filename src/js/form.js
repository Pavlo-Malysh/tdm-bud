import * as Yup from "yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { refs } from "./refs.js";
import { closeModal } from "./handler.js";
import { postLead } from "./projects-api.js";

const Schema = Yup.object().shape({
  username: Yup.string().min(3, "Ім'я має містити щонайменше 3 символи")
    .max(30, "Ім'я занадто довге")
    .required("Ім'я обов'язкове"),
  phone: Yup.string()
    .transform((value) => (value || '').replace(/\D/g, ''))
    .required('Вкажіть номер телефону')
    .matches(/^(380\d{9}|0\d{9})$/, 'Невірний формат номера'),
});



refs.forms.forEach((form) => {
  //Валідація окремого поля
  async function check(name) {
    const data = Object.fromEntries(new FormData(form));
    const errorEl = form.querySelector(`[data-error="${name}"]`);
    const input = form.elements[name];


    try {
      await Schema.validateAt(name, data);
      errorEl.textContent = "";
      input.classList.remove('is-invalid');

      return true;
    } catch (error) {
      errorEl.textContent = error.message;
      input.classList.add('is-invalid');

      return false;
    }
  }

  // Перевірка поля фокус якого перейшов на інший
  form.addEventListener("focusout", (e) => {
    if (e.target.name in Schema.fields) check(e.target.name);
  });

  // Перевірка поля кожного введеного значення
  form.addEventListener("input", (e) => {

    const { name } = e.target;
    const errorEl = form.querySelector(`[data-error="${name}"]`);
    if (errorEl?.textContent) check(name);
  });


  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const results = await Promise.all(Object.keys(Schema.fields).map(check));
    if (results.includes(false)) return;


    const data = Object.fromEntries(new FormData(form));
    const submitBtn = form.querySelector('[type="submit"]');
    const btnLabel = submitBtn.querySelector("p");
    const btnText = btnLabel.textContent;

    submitBtn.disabled = true;
    btnLabel.textContent = "Надсилаємо…";

    try {
      await postLead(data);

      form.reset()
      closeModal()


      iziToast.success({
        title: "Дякуємо!",
        message: "Заявку відправлено, ми скоро зателефонуємо.",
        position: "topRight",
      });

    } catch (error) {
      console.log("ERROR", error.message);

      iziToast.error({
        title: "Помилка",
        message: "Не вдалося надіслати заявку. Спробуйте пізніше.",
        position: "topRight",
      });
    } finally {
      submitBtn.disabled = false;
      btnLabel.textContent = btnText;
    }
  })
})
