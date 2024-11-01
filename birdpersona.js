document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let selectedLanguage = null;
    let weaverScore = 0, pelicanScore = 0, flycatcherScore = 0, owlScore = 0;
    let crowScore = 0, craneScore = 0, parakeetScore = 0, eagleScore = 0, pigeonScore = 0;
    const totalQuestions = 14;

    const englishQuestions = [
        { question: "You start your journey over the seashore...", choices: ["Imma start anyways...", "Nah, no need to mess up..."], weights: [{ flycatcherScore: 1 }, { crowScore: 1 }] },
        { question: "Not long after your departure, a forest full of food appears. What do you do?", choices: ["Gather food and plan ahead - you’ll need it for later", "Enjoy the present - why worry so much about the future?"], weights: [{ weaverScore: 1 }, { parakeetScore: 1 }] },
    ];

    const vietnameseQuestions = [
        { question: "Bạn chuẩn bị xuất phát từ bờ biển...", choices: ["Kệ - dân chơi không sợ...", "Thôi khoải. Tìm đường khác..."], weights: [{ flycatcherScore: 1 }, { crowScore: 1 }] },
    ];

    function displayCurrentQuestion() {
        const questions = selectedLanguage === 'english' ? englishQuestions : vietnameseQuestions;
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById('question');
        const choicesContainer = document.getElementById('choices');
        const questionImage = document.getElementById('question-image');

        document.getElementById('q-current').textContent = `Q${currentQuestionIndex + 1}`;
        questionElement.textContent = currentQuestion.question;
        questionImage.src = `image_q${currentQuestionIndex + 1}.jpg`;

        choicesContainer.innerHTML = '';
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choices');
            if (index === 0) button.classList.add('selected');
            button.addEventListener('click', () => handleChoiceClick(index, button));
            choicesContainer.appendChild(button);
        });

        document.getElementById('done-button').style.display = 'block';
    }

    function handleChoiceClick(choiceIndex, button) {
        document.querySelectorAll('.choices').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    }

    document.getElementById('done-button').addEventListener('click', () => {
        const questions = selectedLanguage === 'english' ? englishQuestions : vietnameseQuestions;
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            displayCurrentQuestion();
        } else {
            showNameEntry();
        }
    });

    function showNameEntry() {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('name-entry').style.display = 'block';
    }

    // Proceed only if a name is entered
    document.getElementById('submit-name').addEventListener('click', () => {
        const testName = document.getElementById('test-taker-name').value.trim();
        if (testName) {
            displayResult(testName);
        } else {
            alert("Please enter your name to proceed.");
        }
    });

    function displayResult(testTakerName) {
        // Example placeholders for results
        const topResult = "weaver"; // This should be dynamic based on quiz scores
        const birdMatch = "parakeet"; // Placeholder for match calculation

        const personaImagePath = `${selectedLanguage === 'english' ? 'eng' : 'vie'}-persona-${topResult}.png`;
        const matchImagePath = `${selectedLanguage === 'english' ? 'eng' : 'vie'}-match-${birdMatch}.png`;

        // Canvas rendering for persona and match images
        const personaCanvas = document.getElementById('persona-canvas').getContext('2d');
        const matchCanvas = document.getElementById('match-canvas').getContext('2d');
        const personaImage = new Image();
        const matchImage = new Image();

        personaImage.src = personaImagePath;
        matchImage.src = matchImagePath;

        personaImage.onload = function () {
            personaCanvas.drawImage(personaImage, 0, 0, 250, 250);
            document.getElementById('persona-download').href = document.getElementById('persona-canvas').toDataURL();
        };

        matchImage.onload = function () {
            matchCanvas.drawImage(matchImage, 0, 0, 250, 250);
            document.getElementById('match-download').href = document.getElementById('match-canvas').toDataURL();
        };

        // Display result container and hide others
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('name-entry').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
    }

    // Language selection handlers
    document.querySelectorAll('.language-button').forEach(button => {
        button.addEventListener('click', (event) => {
            selectedLanguage = event.target.dataset.language;
            document.getElementById('next-button').style.display = 'block';
        });
    });

    document.getElementById('next-button').addEventListener('click', () => {
        if (selectedLanguage) {
            document.getElementById('language-selection').style.display = 'none';
            document.getElementById('question-container').style.display = 'block';
            currentQuestionIndex = 0;
            displayCurrentQuestion();
        }
    });
});
