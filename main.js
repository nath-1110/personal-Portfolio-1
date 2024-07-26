
const textElement = document.getElementById('scrolling-text');
const words = ['Student', 'Developer', 'Coder', 'Engineer'];
let wordIndex = 0;

function changeText() {
    wordIndex = (wordIndex + 1) % words.length;
    textElement.textContent = words[wordIndex];
}

textElement.addEventListener('animationiteration', changeText);



const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                window.location.href = 'thankyou.html';
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});


window.addEventListener('load', function () {
    // Ensure the loader is visible for at least 3 seconds
    setTimeout(function () {
        var loaderWrapper = document.querySelector('.loader-wrapper');
        loaderWrapper.style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 2500); // 3000 milliseconds = 3 seconds
});




document.querySelectorAll('.nav-bar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});