import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const button = document.querySelector("button");

form.addEventListener("submit", submitClick);

function submitClick(event) {

    button.disabled = true;

    event.preventDefault();
    const delay = +event.target.elements.delay.value;
    const state = event.target.elements.state.value;

    setTimeout(() => {
        new Promise((resolve, reject) => {
            if (state === "fulfilled") {
              resolve(`✅ Fulfilled promise in ${delay}ms`)
            }
            else {
                reject(`❌ Rejected promise in ${delay}ms`)
            }
        })
            .then(date => {
                iziToast.show({
                    title: `${date}`,
                    color: 'green', // blue, red, green, yellow
                    position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                });
            })
            .catch(date => 
                iziToast.show({
                    title: `${date}`,
                    color: 'red', // blue, red, green, yellow
                        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                })
        )
        
        button.disabled = false;
        form.reset();

    }, delay)
}

