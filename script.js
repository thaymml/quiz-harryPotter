let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let selectedHouse = '';
let selectedDifficulty = '';
let currentQuestionsSet = [];

const questions = {
    easy: [
        { question: "Qual é o nome do padrinho de Harry Potter?", answers: ["Remo Lupin", "Sirius Black", "Severo Snape", "Alvo Dumbledore"], correct: 1 },
        { question: "Qual o nome do elfo doméstico que ajudou Harry Potter?", answers: ["Winky", "Dobby", "Kreacher", "Hokey"], correct: 1 },
        { question: "Qual é o nome do dragão de Hagrid?", answers: ["Norberto", "Bicuço", "Fofo", "Sparky"], correct: 1 },
        { question: "Qual objeto mágico é usado para transportar instantaneamente?", answers: ["Vassoura", "Pó de Flu", "Chave de Portal", "Capa da Invisibilidade"], correct: 1 },
        { question: "Qual é o nome do fantasma da Grifinória?", answers: ["Nick Quase-Sem-Cabeça", "O Frei Gorducho", "Murta Que Geme", "Barão Sangrento"], correct: 0 },
        { question: "Qual esporte é jogado no mundo bruxo?", answers: ["Quadribol", "Bruxobol", "Vassourobol", "Magibol"], correct: 0 },
        { question: "Qual é o nome do feitiço que desarma o oponente?", answers: ["Expelliarmus", "Stupefy", "Avada Kedavra", "Lumos"], correct: 0 },
        { question: "Qual é o nome do jornal mais famoso do mundo bruxo?", answers: ["Correio Bruxo", "Notícias de Hogwarts", "O Profeta Diário", "Jornal do Bruxo"], correct: 2 },
        { question: "Qual é a casa de Draco Malfoy em Hogwarts?", answers: ["Grifinória", "Lufa-Lufa", "Corvinal", "Sonserina"], correct: 3 },
        { question: "O que Harry Potter vê no Espelho de Ojesed?", answers: ["Seus pais", "Ele mesmo com a taça", "Voldemort", "Dumbledore"], correct: 0 }
    ],
    medium: [
        { question: "Qual é o nome do professor de Transfiguração em Hogwarts?", answers: ["Sibila Trelawney", "Minerva McGonagall", "Pomona Sprout", "Dolores Umbridge"], correct: 1 },
        { question: "Qual é o evento principal do quarto ano de Harry em Hogwarts?", answers: ["Copa Mundial de Quadribol", "Torneio Tribruxo", "Batalha de Hogwarts", "Aula de Aparatação"], correct: 1 },
        { question: "Qual é o nome do professor de Defesa Contra as Artes das Trevas em O Prisioneiro de Azkaban?", answers: ["Remo Lupin", "Alastor Moody", "Gilderoy Lockhart", "Quirinus Quirrell"], correct: 0 },
        { question: "Quem matou Dumbledore?", answers: ["Draco Malfoy", "Severo Snape", "Tom Riddle", "Bellatrix Lestrange"], correct: 1 },
        { question: "Quem mata Bellatrix Lestrange durante a Batalha de Hogwarts?", answers: ["Neville Longbottom", "Molly Weasley", "Luna Lovegood", "Hermione Granger"], correct: 1 },
        { question: "Qual é o nome do mapa que mostra todos os lugares e pessoas em Hogwarts?", answers: ["Mapa do Maroto", "Mapa da Magia", "Mapa de Hogwarts", "Mapa do Príncipe Mestiço"], correct: 0 },
        { question: "Quem foi o responsável pela criação da pedra filosofal?", answers: ["Nicolau Flamel", "Alvo Dumbledore", "Salazar Sonserina", "Horácio Slughorn"], correct: 0 },
        { question: "Qual é o nome do dragão que Harry enfrenta no Torneio Tribruxo?", answers: ["Chapéu Seletor", "Bicorne", "Dragão Húngaro", "Dragão Sueco"], correct: 2 },
        { question: "Qual é o nome do diretor da escola de magia Beauxbatons?", answers: ["Fleur Delacour", "Madame Olympe Maxime", "Gabrielle Delacour", "Minerva McGonagall"], correct: 1 },
        { question: "Como a Murta que Geme morreu?", answers: ["Ela foi assassinada por um basilisco", "Ela se afogou no banheiro", "Ela caiu de uma escada", "Ela foi envenenada"], correct: 0 }
    ],
    hard: [
        { question: "O que significa a sigla 'P.E.D.R.A.'?", answers: ["Programa Especial de Defesa Rápida e Avançada", "Pacto Estudantil de Duelo Rápido Avançado", "Proteção Extra dos Direitos dos Raros Animais", "Plataforma de Educação de Defesa Revolucionária e Avançada"], correct: 1 },
        { question: "Qual é o nome verdadeiro de Lord Voldemort?", answers: ["Tom Riddle", "Tom Marvolo Riddle", "Tom Riddle Jr.", "Tom Riddle Sr."], correct: 1 },
        { question: "Quem é o verdadeiro dono da Varinha das Varinhas antes de Dumbledore?", answers: ["Nicolau Flamel", "Gellert Grindelwald", "Tom Riddle", "Harry Potter"], correct: 1 },
        { question: "Qual é o nome completo de Alvo Dumbledore?", answers: ["Alvo Percival Wulfrico Brian Dumbledore", "Alvo Brian Percival Dumbledore", "Alvo Severo Dumbledore", "Alvo Grindelwald Dumbledore"], correct: 0 },
        { question: "Qual é o nome da irmã de Dumbledore?", answers: ["Ariana", "Morgana", "Helena", "Abigail"], correct: 0 },
        { question: "Qual é o nome do gigante meio-irmão de Hagrid?", answers: ["Grawp", "Karkus", "Norberto", "Fang"], correct: 0 },
        { question: "Qual é a senha para entrar na sala comunal da Grifinória no primeiro ano?", answers: ["Caput Draconis", "Alohomora", "Fortuna Major", "Vingardium Leviosa"], correct: 0 },
        { question: "Qual é a raça do dragão que Hagrid cria ilegalmente?", answers: ["Norueguês de dorso negro", "Rabo-Córneo Húngaro", "Chinês de Barriga Vermelha", "Verde Galês"], correct: 0 },
        { question: "Qual é o nome da organização secreta liderada por Dumbledore para combater Voldemort?", answers: ["Ordem da Fênix", "Exército de Dumbledore", "Liga da Luz", "Sociedade dos Bruxos Livres"], correct: 0 },
        { question: "Qual horcrux foi destruída por Neville Longbottom?", answers: ["O diário de Tom Riddle", "O anel de Marvolo Gaunt", "A taça de Helga Lufa-Lufa", "A cobra Nagini"], correct: 3 }
    ]
};

function showAlert(message, isError = false) {
    const alertContainer = document.getElementById("alert-container");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.innerHTML = `<img src="./images/varinha.png" class="alert-wand"> ${message}`;

    if (isError) {
        alertContainer.style.backgroundColor = "rgba(255, 50, 50, 0.9)";
        alertContainer.style.color = "#fff";
    } else {
        alertContainer.style.backgroundColor = "rgba(255, 215, 0, 0.9)";
        alertContainer.style.color = "#000";
    }

    alertContainer.classList.remove("alert-hidden");
    alertContainer.classList.add("alert-visible");
    setTimeout(() => {
        alertContainer.classList.remove("alert-visible");
        alertContainer.classList.add("alert-hidden");
    }, 3000);
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function selectHouse(house) {
    selectedHouse = house;
    const houseText = document.getElementById("selected-house-text");
    const houseName = getHouseName(house);
    houseText.textContent = `Você escolheu ${houseName}!`;

    document.querySelectorAll('#houses img').forEach(img => {
        img.classList.remove('house-selected');
    });

    event.target.classList.add('house-selected');
    updateTheme(house);
    showCheeringCharacter();
}

function showCheeringCharacter() {
    const characters = {
        grifinoria: ["Harry Potter", "Hermione Granger", "Rony Weasley"],
        sonserina: ["Draco Malfoy", "Severo Snape", "Narcisa Malfoy"],
        corvinal: ["Luna Lovegood", "Gilderoy Lockhart", "Cho Chang"],
        lufalufa: ["Cedrico Diggory", "Ninfadora Tonks", "Newt Scamander"]
    };

    const randomIndex = Math.floor(Math.random() * 3);
    const cheeringDiv = document.getElementById("cheering-character");
    cheeringDiv.textContent = `${characters[selectedHouse][randomIndex]} está torcendo por você!`;
    cheeringDiv.classList.remove("cheering-hidden");
    cheeringDiv.classList.add("cheering-visible");

    setTimeout(() => {
        cheeringDiv.classList.remove("cheering-visible");
        cheeringDiv.classList.add("cheering-hidden");
    }, 5000);
}

function getHouseName(house) {
    const houses = {
        grifinoria: "Grifinória",
        sonserina: "Sonserina",
        corvinal: "Corvinal",
        lufalufa: "Lufa-Lufa"
    };
    return houses[house] || house;
}

function updateTheme(house) {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.classList.remove(
        'grifinoria-theme',
        'sonserina-theme',
        'corvinal-theme',
        'lufalufa-theme'
    );
    quizContainer.classList.add(`${house}-theme`);
}

function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    const buttons = document.querySelectorAll('#difficulty-buttons button');

    buttons.forEach(btn => {
        btn.classList.remove('difficulty-selected');
        btn.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        btn.style.border = '1px solid gold';
    });
    event.target.classList.add('difficulty-selected');
}

function getDifficultyName(difficulty) {
    const names = {
        'easy': 'Trouxa (Fácil)',
        'medium': 'Bruxo (Médio)',
        'hard': 'Auror (Difícil)'
    };
    return names[difficulty] || difficulty;
}

function startQuiz() {
    if (!selectedHouse) {
        showAlert("Por favor, escolha sua casa antes de começar!", true);
        return;
    }
    if (!selectedDifficulty) {
        showAlert("Selecione um nível de dificuldade para continuar!", true);
        return;
    }

    document.getElementById("start-container").style.display = "none";
    document.getElementById("houses-selection").style.display = "none";
    document.getElementById("difficulty-selection").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    currentQuestionsSet = [];
    if (selectedDifficulty === 'easy') {
        currentQuestionsSet = [...questions.easy];
    } else if (selectedDifficulty === 'medium') {
        currentQuestionsSet = [...questions.medium];
    } else {
        currentQuestionsSet = [...questions.hard];
    }

    shuffleArray(currentQuestionsSet);
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").textContent = "Pontuação: 0";
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= currentQuestionsSet.length) {
        showEndScreen();
        return;
    }
    const current = currentQuestionsSet[currentQuestion];
    document.getElementById("question").textContent = current.question;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    const shuffledAnswers = [...current.answers];
    shuffleArray(shuffledAnswers);

    shuffledAnswers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(index, button, current.correct, shuffledAnswers);
        answersDiv.appendChild(button);
    });

    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;
    document.getElementById("progress").style.width = "0%";
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function checkAnswer(selectedIndex, button, correctIndex, shuffledAnswers) {
    clearInterval(timer);
    const correctAnswer = currentQuestionsSet[currentQuestion].answers[correctIndex];
    const correctIndexInShuffled = shuffledAnswers.indexOf(correctAnswer);
    const isCorrect = selectedIndex === correctIndexInShuffled;

    if (isCorrect) {
        score++;
        document.getElementById("score").textContent = "Pontuação: " + score;
        button.style.backgroundColor = "green";
        showFeedback("Você acertou!", "green");
    } else {
        button.style.backgroundColor = "red";
        showFeedback(`Você errou! A resposta correta era: ${correctAnswer}`, "red");
    }

    Array.from(document.getElementById("answers").children).forEach(btn => btn.disabled = true);
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 2000);
}

function showFeedback(message, color) {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = "feedback";
    feedbackDiv.textContent = message;
    feedbackDiv.style.color = color;
    document.getElementById("quiz").appendChild(feedbackDiv);
    setTimeout(() => {
        feedbackDiv.remove();
    }, 2000);
}

function updateTimer() {
    timeLeft--;
    const timeEl = document.getElementById("time");
    timeEl.textContent = timeLeft;
    const progress = document.getElementById("progress");
    progress.style.width = ((10 - timeLeft) * 10) + "%";

    if (timeLeft <= 3) {
        timeEl.style.color = "red";
    } else {
        timeEl.style.color = "#FFD700";
    }

    if (timeLeft <= 0) {
        clearInterval(timer);
        const correctAnswer = currentQuestionsSet[currentQuestion].answers[currentQuestionsSet[currentQuestion].correct];
        showFeedback(`Tempo esgotado! A resposta correta era: ${correctAnswer}`, "red");

        Array.from(document.getElementById("answers").children).forEach(btn => btn.disabled = true);
        setTimeout(() => {
            currentQuestion++;
            loadQuestion();
        }, 2000);
    }
}

function showEndScreen() {
    clearInterval(timer);
    document.getElementById("quiz").style.display = "none";
    document.getElementById("end-container").style.display = "block";
    document.getElementById("final-score").textContent = `Pontuação final: ${score}/${currentQuestionsSet.length}`;
    const finalMessage = document.getElementById("final-message");
    const percentage = (score / currentQuestionsSet.length) * 100;

    if (selectedHouse === 'grifinoria') {
        if (percentage >= 90) {
            finalMessage.textContent = "🏆 Coragem digna de Gryffindor! Você é um verdadeiro herói como Harry Potter!";
        } else if (percentage >= 70) {
            finalMessage.textContent = "🦁 Orgulho de Gryffindor! Quase tão bom quanto o Príncipe Mestiço!";
        } else if (percentage >= 50) {
            finalMessage.textContent = "⚔️ Corajoso como um Gryffindor, mas precisa revisar seus feitiços!";
        } else {
            finalMessage.textContent = "🛡️ Até Godric Gryffindor começou um dia... Continue praticando!";
        }
    }
    else if (selectedHouse === 'sonserina') {
        if (percentage >= 90) {
            finalMessage.textContent = "🐍 Sangue-puro nível mestrado! Você domina as Artes das Trevas!";
        } else if (percentage >= 70) {
            finalMessage.textContent = "💎 Ambição pura! Quase tão brilhante quanto Hermione Granger!";
        } else if (percentage >= 50) {
            finalMessage.textContent = "🕶️ Sonserino promissor... mas não subestime seus oponentes!";
        } else {
            finalMessage.textContent = "🐉 Até Salazar começou um dia... Reveja seus livros de magia!";
        }
    }
    else if (selectedHouse === 'corvinal') {
        if (percentage >= 90) {
            finalMessage.textContent = "🦅 Sabedoria digna de Rowena Ravenclaw! Você é uma águia intelectual!";
        } else if (percentage >= 70) {
            finalMessage.textContent = "📚 Mente brilhante! Quase tão sábio quanto o próprio Dumbledore!";
        } else if (percentage >= 50) {
            finalMessage.textContent = "🔍 Curiosidade típica de Corvinal... Continue explorando!";
        } else {
            finalMessage.textContent = "🦉 Até a coruja mais sábia já foi um filhote... Estude mais!";
        }
    }
    else if (selectedHouse === 'lufalufa') {
        if (percentage >= 90) {
            finalMessage.textContent = "🍯 Lealdade e talento! Você honra Helga Hufflepuff com seu conhecimento!";
        } else if (percentage >= 70) {
            finalMessage.textContent = "🌻 Trabalho duro compensa! Quase tão dedicado quanto Newt Scamander!";
        } else if (percentage >= 50) {
            finalMessage.textContent = "🦡 Espírito Lufano! Continue persistindo como a Toupeira!";
        } else {
            finalMessage.textContent = "🌱 Todo mundo começa em algum lugar... Seu esforço será recompensado!";
        }
    }
}

function restartQuiz() {
    document.getElementById("end-container").style.display = "none";
    document.getElementById("houses-selection").style.display = "block";
    document.getElementById("selected-house-text").textContent = "";
    document.querySelectorAll('#houses img').forEach(img => img.classList.remove('house-selected'));
    document.getElementById("quiz-container").className = "";
    selectedHouse = '';
    selectedDifficulty = '';
    document.getElementById("difficulty-selection").style.display = "none";
    document.getElementById("start-container").style.display = "flex";
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#houses img').forEach(img => {
        img.addEventListener('click', function () {
            selectHouse(this.getAttribute('data-house'));
        });
    });

    document.getElementById("start-btn").addEventListener('click', function (event) {
        event.preventDefault();
        if (!selectedHouse) {
            showAlert("Escolha sua casa de Hogwarts primeiro!", true);
            return;
        }
        if (!selectedDifficulty) {
            showAlert("Selecione um nível de dificuldade!", true);
            document.getElementById("difficulty-selection").style.display = "block";
            return;
        }
        startQuiz();
    });
});