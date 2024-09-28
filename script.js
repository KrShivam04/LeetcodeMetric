document.addEventListener('DOMContentLoaded', function () {
    
    const searchButton = document.getElementById('search-button');
    const userNameInput = document.getElementById('user-input');
    const statsContainer = document.getElementsByClassName('stats-container');
    // Reffering to the container of easy - medium - hard
    const easyProgress = document.querySelector('.easy-progress');
    const mediumProgress = document.querySelector('.medium-progress');
    const hardProgress = document.querySelector('.hard-progress');

    // Reffering to the label of the container 
    const easyLabel = document.getElementById('easy-label');
    const mediumLabel = document.getElementById('medium-label');
    const hardLabel = document.getElementById('hard-label');


    // validating the user 

    const validateUser = (username) => {
        if (username.trim() === '') {
            alert('Username should not be empty!');
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    // Update data

    function updateProgress(solved, total, label, circle) {
        console.log("In update Progress function");
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }
    
    
    
    

    // Diplaying the user-data on console

    const displayUserData = (data) => {
        console.log("In display user Data function!!!");
        console.log(data);

        // Total count of solved question 
        const totalEasySolved = data.totalSubmissions[1].count;
        const totalMediumSolved = data.totalSubmissions[2].count;
        const totalHardSolved = data.totalSubmissions[3].count;

        // Total number of question 
        const totalEasyQuestions = data.totalEasy;
        const totalMediumQuestions = data.totalMedium;
        const totalHardQuestions = data.totalHard;
        
        updateProgress(totalEasySolved, totalEasyQuestions, easyLabel, easyProgress);
        updateProgress(totalMediumSolved, totalMediumQuestions, mediumLabel, mediumProgress);
        updateProgress(totalHardSolved, totalHardQuestions, hardLabel, hardProgress);
        
    }

    // Fetching the detail of the user

    async function fetchUserDetail(username) {
        try {

            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`;
            const data = await fetch(url);

            if(!data.ok) {
                throw new Error("Unable to fetch the User details");
            }

            const userData = await data.json();
            displayUserData(userData);

        }
        catch(error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`;
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    // When the button is clicked

    searchButton.addEventListener('click', function () {
        const userName = userNameInput.value;
        console.log(`Logging User =>  ${userName}`);
        if (validateUser(userName)) {
            fetchUserDetail(userName);
        }
    });

    


})