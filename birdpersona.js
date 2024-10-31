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

        // Update question number display
        document.getElementById('q-current').textContent = `Q${currentQuestionIndex + 1}`;

        // Update question text and image
        questionElement.textContent = currentQuestion.question;
        questionImage.src = `image_q${currentQuestionIndex + 1}.jpg`; // Load image for current question

        choicesContainer.innerHTML = ''; // Clear previous choices
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('choices');
            if (index === 0) button.classList.add('selected'); // Auto-select first choice
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

    document.getElementById('submit-name').addEventListener('click', () => {
        const testName = document.getElementById('test-taker-name').value.trim();
        if (testName) {
            displayResult(testName);
        }
    });

    function displayResult(testTakerName) {
        const topResult = "weaver"; // Placeholder for result calculation
        const birdMatch = "parakeet"; // Placeholder for match

        const personaImagePath = `${selectedLanguage === 'english' ? 'eng' : 'vie'}-persona-${topResult}.png`;
        const matchImagePath = `${selectedLanguage === 'english' ? 'eng' : 'vie'}-match-${birdMatch}.png`;

        document.getElementById('bird-persona').src = personaImagePath;
        document.getElementById('bird-match').src = matchImagePath;

        document.getElementById('persona-download').href = personaImagePath;
        document.getElementById('match-download').href = matchImagePath;

        document.getElementById('question-container').style.display = 'none';
        document.getElementById('name-entry').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
    }

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
