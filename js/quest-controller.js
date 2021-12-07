'use strict';

var gLastRes = null;

$(document).ready(init);

function init() {
  createQuestsTree();
  $('.btn-start').click(onStartGuessing);
  $('.btn-restart').hide();
  $('.btn-restart').click(onPlayAgain);
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse);
  $('.btn-no').click({ ans: 'no' }, onUserResponse);
  $('.btn-add-guess').click(onAddGuess);
}

function onStartGuessing() {
  $('.game-start').hide()
  renderQuest();
  $('.quest').show()
}

function renderQuest() {
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      $('.btn-restart').show();
      $('.quest').hide()
      // TODO: improve UX
    } else {
      alert('I dont know...teach me!');
      $('.quest').hide()
      $('.new-quest').show()

    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}

function onPlayAgain(){
  init()
  onStartGuessing()
  createQuestsTree()
}