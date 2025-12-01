import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector('.form'),
    button: document.querySelector('[type = "submit"]'),
    valueFulfilled: document.querySelector('[value = "fulfilled"]'),
    valuedRejected: document.querySelector('[value="rejected"]'),
    inputNumber: document.querySelector('[type = "number"]')
}


refs.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    
    const delay = Number(formData.get("delay"));
    const state = formData.get("state");



    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay)
    });

    promise
    .then(delay => {
        console.log(`✅ Fulfilled promise in ${delay}ms`);

        iziToast.success({
            title: "",
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight",
            backgroundColor: " #59a10d;"
        });
    })
    .catch (delay=> {
        console.log(`❌ Rejected promise in ${delay}ms`);

        iziToast.error({
            title: "",
            message: `❌ Rejected promise in ${delay}ms`,
            position: "topRight",
            backgroundColor: "#ef4040",
            icon: "false"

        });
    })



    
});


