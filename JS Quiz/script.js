document.addEventListener('DOMContentLoaded',()=>{




    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    

    const questions = [
        {
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
        },
        {
          question: "Which planet is known as the Red Planet?",
          choices: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
        },
        {
          question: "Who wrote 'Hamlet'?",
          choices: [
            "Charles Dickens",
            "Jane Austen",
            "William Shakespeare",
            "Mark Twain",
          ],
          answer: "William Shakespeare",
        },
      ];


      let qindex = 0;
      let score = 0;

      startBtn.addEventListener('click',startquiz)
      nextBtn.addEventListener('click',()=>{
        qindex++;
        if (qindex < questions.length){
            showQuestions()
        }
        else {
            showResults()
        }
      })

      function startquiz(){
        startBtn.classList.add('hidden')
        resultContainer.classList.add('hidden')
        questionContainer.classList.remove('hidden')

        showQuestions()
      }

      function showQuestions(){
        nextBtn.classList.add('hidden')
        choicesList.innerHTML = ''
        questionText.textContent = `${questions[qindex].question}`
         
        questions[qindex].choices.forEach(q => {
            const li = document.createElement('li')
            li.textContent= `${q}`
            li.addEventListener('click',()=>selectAnswer(q))
            li.addEventListener('click',()=>li.classList.add('highlight'))
            choicesList.appendChild(li)
        });
      }

      function selectAnswer(choice){
        
        const answer = questions[qindex].answer;
        if (choice === answer ){
            score++;
        }

        nextBtn.classList.remove('hidden')
      
      }
      
      function showResults(){
        questionContainer.classList.add('hidden')
        resultContainer.classList.remove('hidden')
        scoreDisplay.textContent = `${score} out of ${questions.length}`
      }


      restartBtn.addEventListener('click',()=>{
        qindex=0
        score = 0
        resultContainer.classList.add('hidden')
        startquiz()
      })
    
})