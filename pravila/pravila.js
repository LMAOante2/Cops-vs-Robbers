    document.addEventListener("DOMContentLoaded", function () {

        fetch('https://raw.githubusercontent.com/LMAOante2/Cops-vs-Robbers/main/pravila/pravila.json')
            .then(response => response.json())
            .then(data => {
                const rulesContainer = document.getElementById('rules-container');
                data.rules.forEach(ruleCategory => {
                    const categoryDiv = document.createElement('div');
                    categoryDiv.classList.add('rule');
                    
                    const categoryTitle = document.createElement('h2');
                    categoryTitle.textContent = ruleCategory.category;
                    categoryDiv.appendChild(categoryTitle);
                    
                    const ruleList = document.createElement('ul');
                    ruleCategory.items.forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.textContent = item;
                        ruleList.appendChild(listItem);
                    });

                    categoryDiv.appendChild(ruleList);
                    rulesContainer.appendChild(categoryDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    });
            document.addEventListener("DOMContentLoaded", function () {
        const menuToggle = document.querySelector(".menu-toggle");
        const closeMenu = document.querySelector(".close-menu");
        const sideMenu = document.querySelector(".side-menu");

        menuToggle.addEventListener("click", function () {
            sideMenu.classList.add("active");
        });

        closeMenu.addEventListener("click", function () {
            sideMenu.classList.remove("active");
        });

        document.addEventListener("click", function (event) {
            if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                sideMenu.classList.remove("active");
            }
        });
    });