const form = document.querySelector('form');
const search = document.querySelector('input');
const resultArea = document.querySelector('#result');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let loadMessageContainer = document.createElement('p');
    let loadMessage = document.createTextNode("Loading...");
    loadMessageContainer.setAttribute('style', 'color: #333333');
    loadMessageContainer.appendChild(loadMessage);
    resultArea.replaceChild(loadMessageContainer, resultArea.firstChild);

    const address = search.value;

     const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(address);

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.Error) {
                let errorMessageContainer = document.createElement('p');
                let errorMessage = document.createTextNode(data.Error);
                errorMessageContainer.setAttribute('style', 'color: red');
                errorMessageContainer.appendChild(errorMessage);
                resultArea.replaceChild(errorMessageContainer, resultArea.firstChild);

            } else {
                let responseContainer = document.createElement('p');
                let response = document.createTextNode("Location: " + data.location + "\n" + "Summary: " + data.summary + "\n" + "Temprature: " + data.temprature + "\n" + "Chance of rain: " + data.precipProbability + "%");
                responseContainer.setAttribute('style', 'color: #333333; white-space: pre');
                responseContainer.appendChild(response);
                resultArea.replaceChild(responseContainer, resultArea.firstChild);
            }
        });
    });
});