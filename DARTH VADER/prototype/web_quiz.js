const start=document.getElementById('start-btn');
const exit=document.getElementById('exit-btn');
const question = document.getElementById('question-container');
const message=document.getElementById('mess');
const next=document.getElementById('next-btn');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionElement = document.getElementById('question');
const sc=document.getElementById('score');
const card=document.getElementById('score_card');
const timercard=document.getElementById('settimer');
let score,currentquestion,prev;
const min=10;
let time=min*60-1;
start.addEventListener('click',teststart);
next.addEventListener('click',nextset);
function nextset()
{
    if(prev!=0&&prev.dataset.correct=="true")
    score++;
    currentquestion++;
    
    
    setNextQuestion();
}
function teststart(){

  question.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentquestion=0;
  score=0;
   message.classList.add('hide');
   next.classList.remove('hide');
   let temp=setInterval(updatetime,1000);
   setNextQuestion();
}
function setNextQuestion() {
    
    resetState();
    
    
    showquestion(shuffledQuestions[currentquestion])
  }

  function showquestion(ques)
{
  
     questionElement.innerText = ques.question;
     ques.answers.forEach(answer=>{
         const button=document.createElement('button');
         button.innerText=answer.text;
         button.classList.add('btn');
         if(answer.correct)
         {
             button.dataset.correct=answer.correct;
         }
         button.addEventListener('click', selectanswer)
         
         answerButtonsElement.appendChild(button)
     })
    
}
function resetState() {
    //clearStatusClass(document.body)
    prev=0;
    
    next.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }

 
function selectanswer(e)
{
    if(prev!=0)
     {
            prev.classList.remove('btn1');
     }
    const answer=e.target;
    prev=e.target;
    const correct=answer.dataset.correct;
    answer.classList.add('btn1');
   
    //console.log(answer.dataset.correct);
   
   /*Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct)
        {
        score++;
        console.log(button.dataset.correct);
        }
      })*/

      if (shuffledQuestions.length > currentquestion + 1) {
        next.classList.remove('hide')

      } else {
        
        exit.classList.remove('hide')
      }
      

}
exit.addEventListener('click',scorecard);


function scorecard()
{
    question.classList.add('hide');
    exit.classList.add('hide');
    card.classList.remove('hide');
    
    timercard.classList.add('hide');
    sc.value=Number(score);
    sc.disabled = true;
    //+"/"+Number(10);
    
}

function updatetime()
{
  const minutes=Math.floor(time/60);
  let seconds=time%60;
  seconds=seconds<10?'0'+seconds:seconds;
  timercard.innerText=`${minutes}:${seconds}`;
  time--;
  if(time==0)
  {
  scorecard();
  clearInterval(temp);
  }
  
}



/*const questions=[
  {
    question: '-> HTML stands for -',
    answers: [
      { text: 'HighText Machine Language', correct: "false" },
      { text: 'HyperText and links Markup Language', correct: "false" },
      { text: 'HyperText Markup Language', correct: "true" },
      { text: 'None of these', correct: "false" }
    ]
  }
]

*/


const questions = [
    {
      question: '-> HTML stands for -',
      answers: [
        { text: 'HighText Machine Language', correct: "false" },
        { text: 'HyperText and links Markup Language', correct: "false" },
        { text: 'HyperText Markup Language', correct: "true" },
        { text: 'None of these', correct: "false" }
      ]
    },
    {
      question: '-> The correct sequence of HTML tags for starting a webpage is -',
      answers: [
        { text: 'Head, Title, HTML, body', correct: "false" },
        { text: 'HTML, Body, Title, Head', correct: "false" },
        { text: 'HTML, Head, Title, Body', correct: "false"},
        { text: 'HTML, Head, Title, Body', correct: "true"}
      ]
    },
    {
      question: '-> Which of the following element is responsible for making the text bold in HTML?',
      answers: [
        { text: '<pre>', correct: "false" },
        { text: '<a>', correct: "false" },
        { text: '<b>', correct: "true" },
        { text: '<br>', correct: "false" }
      ]
    },
    {
      question: '-> Which of the following tag is used for inserting the largest heading in HTML?',
      answers: [
        { text: '<h3>', correct: "false" },
        { text: '<h1>', correct: "true" },
        { text: '<h5>', correct: "false" },
        { text: '<h6>', correct: "false" }
      ]
    },
    {
      question: '-> Which of the following tag is used to insert a line-break in HTML?',
      answers: [
        { text: '<br>', correct: "true" },
        { text: '<a>', correct: "false" },
        { text: '<pre>', correct: "false" },
        { text: '<b>', correct: "false" }
      ]
    },
    {
      question: '-> How to create an unordered list (a list with the list items in bullets) in HTML?',
      answers: [
        { text: '<ul>', correct: "true" },
        { text: '<ol>', correct: "false" },
        { text: '<li>', correct: "false" },
        { text: '<i>', correct: "false" }
      ]
    },
    {
      question: '-> How to insert an image in HTML?',
      answers: [
        { text: '<img href = "jtp.png" />' , correct: "false" },
        { text: '<img url = "jtp.png" />', correct: "false" },
        { text: '<img link = "jtp.png" />', correct: "false" },
        { text: '<img src = "jtp.png" />', correct: "true" }
      ]
    },
    {
      question: '-> How to create a hyperlink in HTML?',
      answers: [
        { text:'<a href = "www.testapp.com"> testapp.com </a>', correct: "true" },
        { text: '<a url = "www.testapp.com" testapp.com /a>', correct: "false" },
        { text: '<a link = "www.testapp.com"> testapp.com </a>', correct: "false" },
        { text: '<a> www.testapp.com <testapp.com /a>', correct: "false" }
      ]
    },
    {
      question: '-> How to create an ordered list (a list with the list items in numbers) in HTML?',
      answers: [
        { text: '<ul>', correct: "true" },
        { text: '<ol>', correct: "false" },
        { text: '<li>', correct: "false" },
        { text: '<i>', correct: "false" }
      ]
    },
    {
      question: '-> Which of the following element is responsible for making the text italic in HTML?',
      answers: [
        { text: '<i>', correct: "true" },
        { text: '<italic>', correct: "false" },
        { text: '<it>', correct: "false" },
        { text: '<pre>', correct: "false" }
      ]
    }
  ]