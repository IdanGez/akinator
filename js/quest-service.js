'use strict';

const STORAGE_KEY = 'questDB'

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(STORAGE_KEY)
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gPrevQuest = null;
    gCurrQuest = gQuestsTree
    _saveQuestionsToStorage()
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    const newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest
    gPrevQuest[lastRes] = newQuest
    _saveQuestionsToStorage()
    gCurrQuest = gQuestsTree
}

function getCurrQuest() {
    return gCurrQuest
}

function _saveQuestionsToStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree);
}

