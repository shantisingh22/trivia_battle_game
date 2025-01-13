
const welcometrivia = document.getElementById('welcometrivia');
const firstPlayerNameInput = document.getElementById('1stplayer1-name');
const secondPlayerNameInput = document.getElementById('2ndplayer2-name');
const submitButton = document.getElementById('SubmitButton');
const textArea = document.getElementById("textArea");
const textArea1 = document.getElementById("textArea1");
const playerNamesSection = document.getElementById("player-names-section");
const title1 = document.getElementById("title1");
const categoryShow = document.querySelector(".catagory-show");
const categoryDropdown = document.getElementById("categoryDropdown");
const confirmCategoryButton = document.getElementById("confirmCategory");
const categoryHeading = document.getElementById('categoryHeading');



submitButton.addEventListener("click", function () {
    const firstPlayerName = firstPlayerNameInput.value;
    const secondPlayerName = secondPlayerNameInput.value;

    if (!firstPlayerName  &&  !secondPlayerName) {
        console.log("Player 1:", firstPlayerName );
        console.log("Player 2:", secondPlayerName);
    }

    welcometrivia.innerText = "Welcome To The Trivia Game";
    welcometrivia.style.display = "block";

    textArea.innerText = `1st Player: ${firstPlayerName}`;
    textArea.style.display = "block";
    
    textArea1.innerText = `2nd Player: ${secondPlayerName}`;
    textArea1.style.display = "block";
    
    playerNamesSection.style.display = "none";
    
    firstPlayerNameInput.style.display = "none";
    secondPlayerNameInput.style.display = "none";
    submitButton.style.display = 'none';

    document.querySelector(".title1").style.display = "none";
    categoryShow.style.display = "block";
});

categoryDropdown.addEventListener("change", function () {
    confirmCategoryButton.classList.remove("hidden");
});

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
