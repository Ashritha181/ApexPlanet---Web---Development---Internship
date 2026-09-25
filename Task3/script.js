const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", async function() {

    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.textContent = "Please enter a city name.";
        return;
    }

    weatherResult.textContent = "Loading...";

    try {
        // Get city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!locationResponse.ok) {
            throw new Error("Location request failed");
        }

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            weatherResult.textContent = "City not found.";
            return;
        }

        const place = locationData.results[0];

        // Get current weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Weather request failed");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        weatherResult.innerHTML = `
            <h3>${place.name}, ${place.country}</h3>
            <p>🌡️ Temperature: ${current.temperature_2m} °C</p>
            <p>💧 Humidity: ${current.relative_humidity_2m}%</p>
            <p>💨 Wind Speed: ${current.wind_speed_10m} km/h</p>
        `;

    } catch (error) {
        weatherResult.textContent =
            "Unable to fetch weather. Check your internet connection.";
    }

});
// Interactive Quiz

let currentQuestion = 0;

const questions = [
    {
        question: "What does HTML stand for?",
        answers: {
            a: "Hyper Text Markup Language",
            b: "High Text Machine Language",
            c: "Hyperlink Text Management Language"
        },
        correct: "a"
    },
    {
        question: "Which language is used for styling webpages?",
        answers: {
            a: "HTML",
            b: "CSS",
            c: "Python"
        },
        correct: "b"
    },
    {
        question: "Which language adds interactivity to webpages?",
        answers: {
            a: "JavaScript",
            b: "SQL",
            c: "C"
        },
        correct: "a"
    }
];

function checkAnswer(answer) {

    const result = document.getElementById("quizResult");

    if (answer === questions[currentQuestion].correct) {
        result.textContent = "Correct answer! 🎉";
    } else {
        result.textContent = "Wrong answer. Try again!";
    }

}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        currentQuestion = 0;
    }

    document.getElementById("question").textContent =
        questions[currentQuestion].question;

    const buttons = document.querySelectorAll(".quiz-card button");

    buttons[0].textContent =
        "A. " + questions[currentQuestion].answers.a;

    buttons[1].textContent =
        "B. " + questions[currentQuestion].answers.b;

    buttons[2].textContent =
        "C. " + questions[currentQuestion].answers.c;

    document.getElementById("quizResult").textContent = "";

}