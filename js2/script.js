//ES6


$(() => {
  const test = [
  {
    title: 'What is the capital of Ukraine?',
    points: 1,
    answers: [{
      answer: 'Kyiv',
      right: true
    },
    {
      answer: 'Poltava',
      right: false
    },
    {
      answer: 'Lviv',
      right: false
    }]
  },
  {
    title: 'When was Lviv founded?',
    points: 1,
    answers: [{
      answer: 'in 1992',
      right: false
    },
    {
      answer: 'in 1345',
      right: false
    },
    {
      answer: 'in 1256',
      right: true
    }]
  },
  {
    title: 'Who founded Lviv?',
    points: 1,
    answers: [{
      answer: 'Volodymur',
      right: false
    },
    {
      answer: 'Danulo',
      right: true
    },
    {
      answer: 'Ihor',
      right: false
    }]
  },
  {
    title: 'Who write "Kobzar" ?',
    points: 1,
    answers: [{
      answer: 'Lesja Ukrainka',
      right: false
    },
    {
      answer: 'Taras Shevchenko',
      right: true
    },
    {
      answer: 'Marko Vovchok',
      right: false
    }]
  }
  ];


  const localTest = JSON.stringify( test );
  localStorage.setItem( "test", localTest );


  const recievedTest = localStorage.getItem( "test" );
  const readyTest = JSON.parse( recievedTest );


  const $html = $( '#template' ).html();
  const content = tmpl($html, {
    data: readyTest
  });


  $( '#formId' ).prepend( content );

  const $inputs = $('input:checkbox');
  $inputs.on( 'click', function() {
    $(this).parent().siblings().children().each(function(){
      if ( $(this).attr('disabled') ) {
        $(this).attr('disabled', false);
      } else {
        $(this).attr('disabled', true);
      }
    });
  });

  const checkResults = e => {
    e.preventDefault();
    const rightAnswers = [];
    const getRightAnswers = () => {
      for ( let i = 0; i < readyTest.length; i++ ) {
        const testAnswers = readyTest[i].answers;
        for (let j = 0; j < testAnswers.length; j++) {
          const currentAnswer = readyTest[i].answers[j].right;
          rightAnswers.push(currentAnswer);
        }
      }
    };

    const givenAnswers = [];
    const getGivenAnswers = () => {
      $inputs.each(function () {
        if ( $(this).prop('checked') ) {
          givenAnswers.push(true);
        } else {
          givenAnswers.push(false);
        }
      });
    };

    let answered = 0;
    const check = () => {
      for (let i = 0; i < rightAnswers.length; i++) {
        if ( rightAnswers[i] === true ) {
          if ( rightAnswers[i] === givenAnswers[i] ) {
            answered++;
          }
        }
      }
    };

    let questionsQuantity = 0;
    const sumQuestions = () => {
      for (let i = 0; i < readyTest.length; i++) {
        questionsQuantity++;
      }
    };

    let passed = 0;
    let testOK= false;
    const testPassed = () => {
      passed = answered /questionsQuantity;
      if ( passed > 0.5 ) {
        testOK = true;
      }
    };

    getRightAnswers();
    console.log('rightAnswers = ', rightAnswers);

    getGivenAnswers();
    console.log('givenAnswers = ', givenAnswers);

    check();
    console.log('answered = ', answered);

    sumQuestions();

    testPassed();
    console.log('passed = ', passed);

    console.log('testOK = ', testOK);



    let $modal;
    const $body = $( 'body' );
    if ( testOK ){
      $modal = (`<div class="mymodal"><div class="mymodal-inner"><h1 class="text-center">You passed the test!</h1><h1 class="text-center">Right is ${answered}, from ${questionsQuantity}</h1><p class="text-center"><img src="images/image.png"></p><a class="center-block btn btn-primary" id="exit">Exit</a></div></div>`);
    } else {
      $modal = (`<div class="mymodal"><div class="mymodal-inner"><h1 class="text-center">You didn't pass the test!</h1><h1 class="text-center">Right is ${answered}, from ${questionsQuantity}</h1><p class="text-center"><img src="images/image1.png"></p><a class="center-block btn btn-primary" id="exit">Exit</a></div></div>`);
    }

    $body.append($modal);
    const $exit = $( '#exit' );
    const reset = () => {
      $inputs.prop( 'checked', false ).prop( 'disabled', false );
      $( '.mymodal' ).remove();
      return false;
    };

    $exit.on( 'click', reset );
  };

  $( '#check-results' ).on( 'click', checkResults );
});


