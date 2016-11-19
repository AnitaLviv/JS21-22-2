
//es5
$(function(){

  'use strict';


var test = [
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


var localTest = JSON.stringify( test );
localStorage.setItem( "test", localTest );


var recievedTest = localStorage.getItem( "test" );
var readyTest = JSON.parse( recievedTest );


var $html = $( '#template' ).html();
var content = tmpl($html, {
  data: readyTest
});


$( '#formId' ).prepend( content );

var $inputs = $('input:checkbox');
$inputs.on( 'click', function() {
  $(this).parent().siblings().children().each(function(){
    if ( $(this).attr('disabled') ) {
      $(this).attr('disabled', false);
    } else {
      $(this).attr('disabled', true);
    }
  });
});

var checkResults = function(e) {
  e.preventDefault();
  var rightAnswers = [];
  var getRightAnswers = function() {
    for ( var i = 0; i < readyTest.length; i++ ) {
      var testAnswers = readyTest[i].answers;
      for (var j = 0; j < testAnswers.length; j++) {
        var currentAnswer = readyTest[i].answers[j].right;
        rightAnswers.push(currentAnswer);
      }
    }
  };

  var givenAnswers = [];
  var getGivenAnswers = function() {
    $inputs.each(function () {
      if ( $(this).prop('checked') ) {
        givenAnswers.push(true);
      } else {
        givenAnswers.push(false);
      }
    });
  };

  var answered = 0;
  var check = function () {
    for (var i = 0; i < rightAnswers.length; i++) {
      if ( rightAnswers[i] === true ) {
        if ( rightAnswers[i] === givenAnswers[i] ) {
          answered++;
        }
      }
    }
  };

  var questionsQuantity = 0;
  var sumQuestions = function () {
    for (var i = 0; i < readyTest.length; i++) {
      questionsQuantity++;
    }
  };

  var passed = 0;
  var testOK= false;
  var testPassed = function () {
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



  var $modal;
  var $body = $( 'body' );
  if ( testOK ){
    $modal = ('<div class="mymodal"><div class="mymodal-inner"><h1 class="text-center">You passed the test!</h1><h1 class="text-center">Right is '+
     answered +', from '+ questionsQuantity +'</h1><p class="text-center"><img src="images/image.png"></p><a class="center-block btn btn-primary" id="exit">Exit</a></div></div>');
  } else {
    $modal = ('<div class="mymodal"><div class="mymodal-inner"><h1 class="text-center">You didn\'t pass the test!</h1><h1 class="text-center">Right is '+
     answered +', from '+ questionsQuantity +'</h1><p class="text-center"><img src="images/image1.png"></p><a class="center-block btn btn-primary" id="exit">Exit</a></div></div>');
  }

  $body.append($modal);
  var $exit = $( '#exit' );
  var reset = function() {
    $inputs.prop( 'checked', false ).prop( 'disabled', false );
    $( '.mymodal' ).remove();
    return false;
  };

  $exit.on( 'click', reset );
};

$( '#check-results' ).on( 'click', checkResults );

});
