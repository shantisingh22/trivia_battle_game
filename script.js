const welcometrivia = document.getElementById('welcometrivia');
const firstPlayerNameInput = document.getElementById('1stplayer1-name');
const secondPlayerNameInput = document.getElementById('2ndplayer2-name');
const submitButton = document.getElementById('SubmitButton');
const textArea = document.getElementById("textArea");
const textArea1 = document.getElementById("textArea1");
const categoryShow = document.querySelector(".catagory-show");
const categoryDropdown = document.getElementById("categoryDropdown");
const confirmCategoryButton = document.getElementById("confirmCategory");
const categoryHeading = document.getElementById('categoryHeading');



submitButton.addEventListener("click", function () {
    const firstPlayerName = firstPlayerNameInput.value;
    const secondPlayerName = secondPlayerNameInput.value;

    if (!firstPlayerName || !secondPlayerName) {
        alert('Please enter both player names!');
        return;
    }

    welcometrivia.innerText = "Welcome To The Trivia Game";
    welcometrivia.classList.remove('hidden');

    textArea.innerText = `1st Player: ${firstPlayerName}`;
    textArea.classList.remove('hidden');

    textArea1.innerText = `2nd Player: ${secondPlayerName}`;
    textArea1.classList.remove('hidden');

    firstPlayerNameInput.classList.add('hidden');
    secondPlayerNameInput.classList.add('hidden');
    submitButton.classList.add('hidden');

    document.querySelector(".title1").style.display = 'none';
    categoryShow.classList.remove("hidden");
});

categoryDropdown.addEventListener("change", function () {
    confirmCategoryButton.classList.remove("hidden");
});

// confirmCategoryButton.addEventListener("click", function () {
//     const selectedCategory = categoryDropdown.value;
//     const difficulties = ["easy", "medium", "hard"];
//     const Easy = "easy";
//     if (selectedCategory) {
//         fetch(`https://the-trivia-api.com/v2/questions?categories=${selectedCategory}&difficulties=${Easy}&limit=2`)

//             .then(response => response.json())
//             .then(data => {
//                 console.log(data)
//             })
//             .catch(() => categoryShow.innerText = "Failed load data.");

//             categoryShow.innerHTML = `${selectedCategory}`;
//             confirmCategoryButton.classList.add("hidden");
//     }
// });


confirmCategoryButton.addEventListener("click", function () {
    const selectedCategory = categoryDropdown.value;
    const difficulties = ["easy", "medium", "hard"];
    
    if (selectedCategory) {
       
        const twoeasyQuestions = [];
        const twomediumQuestions = [];
        const twohardQuestions = [];

      
        const AllcombinedDataList = [];

        difficulties.forEach(difficulty => {
            fetch(`https://the-trivia-api.com/v2/questions?categories=${selectedCategory}&difficulties=${difficulty}&limit=2`)
                .then(response => response.json())
                .then(data => {
                    if (difficulty === "easy") {
                        twoeasyQuestions.push(...data);
                    } else if (difficulty === "medium") {
                        twomediumQuestions.push(...data);
                    } else if (difficulty === "hard") {
                        twohardQuestions.push(...data);
                    }
                    AllcombinedDataList.push(...data);

                    if (AllcombinedDataList.length === 6) {
                        console.log("Easy Questions:", twoeasyQuestions);
                        console.log("Medium Questions:", twomediumQuestions);
                        console.log("Hard Questions:", twohardQuestions);

                        
                        categoryShow.innerHTML = `${selectedCategory}`;
                        confirmCategoryButton.classList.add("hidden");
                    }
                })
                .catch(() => categoryShow.innerText = "Failed to load data.");
        });
    }
});




