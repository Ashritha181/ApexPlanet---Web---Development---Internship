// ============================
// TO-DO LIST WITH LOCAL STORAGE
// ============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);

    });
}


function addTask() {

    const input = document.getElementById("taskInput");

    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    displayTasks();
}


function deleteTask(index) {

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}


// Display saved tasks when page opens
displayTasks();



// ============================
// PRODUCT LISTING
// ============================

const products = [

    {
        name: "Smartphone",
        category: "electronics",
        price: 15000,
        rating: 4.5
    },

    {
        name: "Headphones",
        category: "electronics",
        price: 2500,
        rating: 4.2
    },

    {
        name: "T-Shirt",
        category: "fashion",
        price: 800,
        rating: 4.0
    },

    {
        name: "Jeans",
        category: "fashion",
        price: 1500,
        rating: 4.3
    },

    {
        name: "JavaScript Book",
        category: "books",
        price: 600,
        rating: 4.7
    },

    {
        name: "HTML Book",
        category: "books",
        price: 450,
        rating: 4.1
    }

];


function displayProducts() {

    const category =
        document.getElementById("categoryFilter").value;

    const sort =
        document.getElementById("sortFilter").value;

    let filteredProducts = [...products];


    // Category filtering

    if (category !== "all") {

        filteredProducts =
            filteredProducts.filter(function(product) {

                return product.category === category;

            });

    }


    // Sorting

    if (sort === "priceLow") {

        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
        });

    }

    else if (sort === "priceHigh") {

        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
        });

    }

    else if (sort === "rating") {

        filteredProducts.sort(function(a, b) {
            return b.rating - a.rating;
        });

    }


    // Display products

    const productList =
        document.getElementById("productList");

    productList.innerHTML = "";


    filteredProducts.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>

            <p>Category: ${product.category}</p>

            <p>Price: ₹${product.price}</p>

            <p>Rating: ⭐ ${product.rating}</p>
        `;

        productList.appendChild(card);

    });

}


// Filter and sort events

document
    .getElementById("categoryFilter")
    .addEventListener("change", displayProducts);

document
    .getElementById("sortFilter")
    .addEventListener("change", displayProducts);


// Display products when page opens

displayProducts();