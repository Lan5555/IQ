//firebase
const firebaseConfig = {
  apiKey: "process.env.SECRET",
 authDomain: "validator-533ce.firebaseapp.com",
   projectId: "validator-533ce",
  storageBucket: "validator-533ce.appspot.com",
 messagingSenderId: "367967988323",
 appId: "1:367967988323:web:18390dc55e99e718d9a656",
   measurementId: "G-0KGQDK3R0Y",
  databaseURL:"https://validator-533ce-default-rtdb.firebaseio.com/"
 };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  let bottomSheet = document.querySelector('.bottomSheet');
  const toggleSheet = async() => {
    bottomSheet.classList.toggle('openSheet');
    document.body.style.backgroundColor = 'grey';
    mem.style.backgroundColor = '';
  }
  
  
  
  const b1 = document.querySelector('.b1');
  const mem = document.querySelector('.memContainer');
  b1.addEventListener('click',() => {
    bottomSheet.classList.toggle('openSheet');
    document.body.style.backgroundColor = '';
    mem.style.backgroundColor = 'white';
  });
  
  let question = document.querySelector('.QC');
  let options = document.getElementsByName('answer');
  let option1 = document.querySelector('label[for="first"]');
  let option2 = document.querySelector('label[for="sec"]');
  let option3 = document.querySelector('label[for="third"]');
  let option4 = document.querySelector('label[for="forth"]');
  let previous = document.querySelector('.pre');
  let next = document.querySelector('.next');
  let submit = document.querySelector('.sub');
  let answered = document.querySelector('.answered');
  let timer2 = document.querySelector('.currentTime');
  let message = document.querySelector('.message');
  let keyHolder;
  let nameX;
  const query = (event) => {
    event.preventDefault();
    let name = document.querySelector('.name');
  let key = document.querySelector('.key');
   keyHolder = key.value;
    nameX = name.value;
    
    if(key.value == 6984){
      nJToast.success({
        message: `Welcome ${name.value}`,
        backgroundColor: 'white',
        textColor: 'black',
        titleColor: 'black',
        progressBarColor: 'green',
      })
      page1.style.display = "none";
      page2.style.display = "block";
    }else if(key.value == 5422){
      nJToast.success({
        message: `Welcome ${name
          .value}`,
        backgroundColor: 'white',
        textColor:'black',
        titleColor:'black',
        progressBarColor: 'green',
      })
      page1.style.display = "none";
      page2.style.display = "block";
    }else{
      nJToast.warning({
        message: `Invalid credentials`,
        backgroundColor: 'red',
        progressBarColor: 'white',
        textColor:'white'
      })
      
    }
    nJFloatingActionButton.FloatingActionButton({
      onclick: toggleSheet
    });
    audio = new Audio('misc/videoplayback.mp3');
    audio.play();
  }
   let popUp = document.querySelector('.popUp');
  message.addEventListener('click', () => {
    
    popUp.style.display = 'flex';
    
  });
  let audio;
  let decision = false;
  let decision2 = false;
  const startGame = () => {
    modeCreator();
    let loader = document.querySelector('.loader');
    loader.style.display = "block";
    loader.style.marginTop = "20px";
    setTimeout(() => {
      popUp.style.display = 'none';
      page2.style.display = "none";
      page3.style.display = "block";
      loader.style.display = "none";
      save.style.display = "none";
      timer();
      displayQuestions();
    
      let audio = new Audio('')
    }, 2000);
  }
  
  const modeCreator = async() => {
    let select = document.getElementById('mode');
    let chosen = select.value;
    if (chosen == "solo") {
      decision = false;
    } else if (chosen == "vs") {
      decision = true;
    }
    
  }
  let save = document.querySelector('.save');
  const confirm = () => {
    save.style.display = "block";
    
  }
  
  
  let count2 = 0;
  const upload = (event) => {
    event.preventDefault();
    let question = document.querySelector('.question');
    let one = document.getElementById("one");
    let two = document.getElementById("two");
    let three = document.getElementById("three");
    let four = document.getElementById("four");
    let answer = document.getElementById("answer");
    let globalList = [];
    let submitted = document.querySelector('.submitted');
    
    count2++;
    const dataRef = database.ref('quiz').push();
    dataRef.set({
      question: question.value,
      one:one.value,
      two:two.value,
      three:three.value,
      four:four.value,
      answer:answer.value
    }).then(() => {
      nJToast.success({
        message:'Sent Successfully'
      });
      submitted.innerHTML = `Number uploaded: ${count2}/20`;
      bottomSheet.scrollTo(0,0);
      question.value = "";
      one.value = "";
      two.value = "";
      three.value = "";
      four.value = "";
      answer.value = "";
    }).catch((error) => {
      nJToast.warning({
        message:`An error occurred at ${error}`
      });
    });
    //Individual Set
    if(keyHolder == 6984){
    const dataRef2 = database.ref('quiz1').push();
    dataRef2.set({
      question: question.value,
      one: one.value,
      two: two.value,
      three: three.value,
      four: four.value,
      answer: answer.value
    })
    }else if(keyHolder == 5422){
    //Individual set two
    const dataRef3 = database.ref('quiz2').push();
    dataRef3.set({
      question: question.value,
      one: one.value,
      two: two.value,
      three: three.value,
      four: four.value,
      answer: answer.value
    });
    }
  }
  
  const fetchQuestions = () => {
    return new Promise((resolve, reject) => {
      let dataRef;
  
      if (!decision) {
        // Fetch data from 'quiz' if decision is false
        dataRef = database.ref('quiz');
      } else if (decision) {
        // Fetch data from 'quiz1' if decision is true
        if(keyHolder == 6984){
        dataRef = database.ref('quiz2');
        }else if(keyHolder == 5422){
          dataRef = database.ref('quiz1');
        }
      }
  
      // Fetch the data
      dataRef.once('value')
        .then((snapshot) => {
          let dataLoaded = [];
          snapshot.forEach(childSnapShot => {
            const question = childSnapShot.val().question;
            const data1 = childSnapShot.val().one;
            const data2 = childSnapShot.val().two;
            const data3 = childSnapShot.val().three;
            const data4 = childSnapShot.val().four;
            const answer = parseInt(childSnapShot.val().answer, 10);
  
            dataLoaded.push({
              question: question,
              options: [data1, data2, data3, data4],
              correctAnswerIndex: answer
            });
          });
          resolve(dataLoaded);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  let score = 0;
  
  let quizData = [];

  let currentQuestion = 0;
  let answered2 = 0;
  
  let sub = document.querySelector('.sub');
  const displayQuestions = async () => {
    if(!audio.paused){
      audio.pause();
    }
    try {
      quizData = await fetchQuestions(); // Load data first
      if (quizData.length > 0 && currentQuestion < quizData.length) {
        // Now safely access quizData
        question.innerText = quizData[currentQuestion].question;
        option1.innerHTML = quizData[currentQuestion].options[0];
        option2.innerHTML = quizData[currentQuestion].options[1];
        option3.innerHTML = quizData[currentQuestion].options[2];
        option4.innerHTML = quizData[currentQuestion].options[3];
        answered.innerHTML = `Questions answered:<br>${answered2}/${quizData.length}`;
        
      } else {
        sub.style.display = "block";
        answered.innerHTML = `Questions answered:<br>${answered2}/${quizData.length}`;
        const selected = document.querySelector('input[name="answer"]:checked');
        if(selected){
        const selectedOption = parseInt(selected.value, 10);
        if (selectedOption === quizData[currentQuestion].correctAnswerIndex) {
          score++;
          
        }
        }
      }

    } catch (error) {
      nJToast.warning({
        message: `An error occurred: ${error}`
      });
    }
    
  };
  
  next.addEventListener('click', () => {
    checkAnswer();
    if (currentQuestion <= quizData.length) {
      currentQuestion++;
      const loader = document.querySelector('.loader');
      const selected = document.querySelectorAll('input[name="answer"]');
      loader.style.display = "block";
      setTimeout(() => {
        loader.style.display = "none";
        displayQuestions();
        selected.forEach(radio => {
          radio.checked = false;
        })
        
      },1000);
    }
  });
  previous.addEventListener('click',() => {
    const loader = document.querySelector('.loader');
    currentQuestion--;
    loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none";
      displayQuestions();
     
        const selected = document.querySelectorAll('input[name="answer"]');
        const getChecked = localStorage.getItem('select');
        const getChecked2 = parseInt(getChecked, 10);
        selected[getChecked2].checked = true;
    }, 1000);
  });
  
  const checkAnswer = () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    
    if (selected) {
    const selectedOption = parseInt(selected.value, 10);
    let clicked = [];
    clicked.push(selectedOption.value);
    localStorage.setItem('select',selected.value);
    answered2++;
      if (selectedOption === quizData[currentQuestion].correctAnswerIndex) {
        score++;
      } 
    } else {
      
    }
    
  };
  
  
  let minute = 14;
  let seconds = 60;
  let percent;
  
  const timer = () => {
    let time = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        minute--;
        seconds = 59;
      }
      if (minute == 0) {
        setTimeout(() => {
          clearInterval(time);
          nJToast.success({
            titleColor: 'black',
            backgroundColor: 'white',
            textColor: 'black',
            progressBarColor: 'green',
            message: "Completed await your results"
          });
          setTimeout(() => {
            assignScore();
          }, 3000);
          seconds = 0
        },59900);
      }
      timer2.innerHTML = `${minute}:${seconds}`;
    }, 1000);
  }
  let page1 = document.querySelector('.container');
  let page2 = document.querySelector('.page2');
  let page3 = document.querySelector('.page3');
  let page4 = document.querySelector('.page4');
  
  const assignScore = () => {
  page3.style.display = "none";
  page4.style.display = "block";
  let score2 = document.querySelector('.score');
  let remark = document.querySelector('.remark');
  let name1 = document.querySelector('.name1');
   percent = Math.floor((score / quizData.length) * 100);
  
  name1.innerHTML = name;
  score2.innerHTML = `${percent}%`;
  if(percent > 50){
    remark.innerHTML = "Congratulations.. Nice work";
  }else{
    remark.innerHTML = "Try harder next time";
  }
  
    
  setTimeout(() => {
    nJToast.success({
      message: 'Navigated to home',
      backgroundColor: 'white',
      progressBarColor: 'green',
      titleColor:"black",
      textColor:'black'
    })
    page4.style.display = "none";
    page1.style.display = "block";
  },20000)
  }
  let percent2;
  const submit2 = () => {
      percent2 = Math.floor((score / quizData.length) * 100);
             nJToast.success({
                titleColor: 'black',
             backgroundColor: 'white',
             textColor: 'black',
            progressBarColor: 'green',
            message: "Completed await your results"
            });
              setTimeout(() => {
            assignScore();
             }, 3000);
    if(decision && keyHolder == 6984){
      const dataRef = database.ref('score1');
      dataRef.set({
        name:nameX,
        percent:percent2
      });
    }else if(decision && keyHolder == 5422){
      const dataRef1 = database.ref('score2');
      dataRef1.set({
        name:nameX,
        percent: percent2
      });
    }
  }
  let name3 = document.querySelector('.name3');
  let scoreE = document.querySelector('.score3');
  let name2 = document.querySelector('.name2');
  let score1 = document.querySelector('.score1');
  let displyResult = document.querySelector('.displayResult');
  let back = document.querySelector('.back');
  
  const fetchScore = () => {
  
    const dataRef = database.ref('score1');
    dataRef.once('value')
    .then((snapshot) => {
      const data = snapshot.val().name;
      const scoreX = snapshot.val().percent;
      name3.innerHTML = data;
      scoreE.innerHTML = scoreX + "%";
      
      
    });
    const dataRef1 = database.ref('score2');
    dataRef1.once('value')
      .then((snapshot) => {
        const data = snapshot.val().name;
        const scoreX = snapshot.val().percent;
        name2.innerHTML = data;
        score1.innerHTML = scoreX + "%";
    
      });
      dataRef.on('value', (snapshot) => {
        const data = snapshot.val().name;
        const scoreX = snapshot.val().percent;
        name3.innerHTML = data;
        scoreE.innerHTML = scoreX + "%";
      });
      dataRef1.on('value', (child) => {
        const data = child.val().name;
        const scoreX = child.val().percent;
        name2.innerHTML = data;
        score1.innerHTML = scoreX + "%";
      });
  }
  
  sub.addEventListener('click', () => {
    submit2();
  });
  
  window.onload = () => {
    modeCreator();
    
  }
  let results = document.querySelector('.results');
  
  results.addEventListener('click', () => {
   fetchScore();
    displyResult.style.display = "block";
  });
  back.addEventListener('click',()=> {
    displyResult.style.display = "none"
  });