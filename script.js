// Contact Form Validation

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("formMessage");

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Please fill all fields.";
        formMessage.style.color = "red";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formMessage.textContent = "Please enter a valid email.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.textContent = "Form submitted successfully!";
    formMessage.style.color = "green";

    contactForm.reset();

});


// Dynamic To-Do List

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTask.addEventListener("click", function() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");

    li.textContent = taskText;

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";

});