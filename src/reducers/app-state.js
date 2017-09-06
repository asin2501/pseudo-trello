/**
 * Created by user on 08.07.2017.
 */

import helpers from '../utils/helpers';

let appInitialState = {
    draggedColumn:false,
    draggedCard:false,
    sidebarStatus:false,
    colorbarStatus:false,
    addBoardPopupOpened:false,
    searchText:"",
    columnForm: null,
    cardForm: null
};

export  default function (appState = appInitialState, action) {
    switch (action.type) {
        case 'SET_ADDBOARD_POPUP_STATE':
            return setAddBoardPopupState(appState, action);
            break;
        case 'SET_DRAGGED_COLUMN':
            return setDraggedColumn(appState, action);
            break;
        case 'SET_COLUMN_FORM_STATE':
            return setColumnFormState(appState, action);
            break;
        case 'SET_CARD_FORM_STATE':
            return setCardFormState(appState, action);
            break;
        case 'UNSET_DRAGGED_COLUMN':
            return unsetDraggedColumn(appState, action);
            break;
        case 'SET_DRAGGED_CARD':
            return setDraggedCard(appState, action);
            break;
        case 'SET_COLOLORBAR_STATUS':
            return setColorbarStatus(appState, action);
            break;
        case 'SET_SIDEBAR_STATUS':
            return setSideBarStatus(appState, action);
            break;
        case 'CHANGE_SEARCH_TEXT':
            return changeSearchText(appState, action);
            break;
        case 'UNSET_DRAGGED_CARD':
            return unsetDraggedCard(appState, action);
            break;
        default:
            return appState;
    }
}

function setColumnFormState(appState, action){
    let newAppState = helpers.copyObject(appState);

    if(isFinite(action.payload)){
        newAppState.columnForm = action.payload;
        newAppState.cardForm = null;
    }else{
        newAppState.columnForm = null;
    }

    return newAppState;
}

function setCardFormState(appState, action){
    let newAppState = helpers.copyObject(appState);

    if(isFinite(action.payload)){
        newAppState.cardForm = action.payload;
        newAppState.columnForm = null;
    }else{
        newAppState.cardForm = null;
    }

    return newAppState;
}

function setAddBoardPopupState(appState, action){
    let newAppState = helpers.copyObject(appState);

    newAppState.addBoardPopupOpened = action.payload;
    return newAppState;
}

function setColorbarStatus(appState, action){
    let newAppState = helpers.copyObject(appState);

    newAppState.colorbarStatus = action.payload;
    return newAppState;
}

function setSideBarStatus(appState, action){
    let newAppState = helpers.copyObject(appState);
    newAppState.sidebarStatus = action.payload;
    return newAppState;
}

function changeSearchText(appState, action) {
    let newAppState = helpers.copyObject(appState);
    // console.log(action.payload.searchText);
    newAppState.searchText = action.payload.searchText;
    return newAppState;
}

function setDraggedColumn(appState, action) {
    let newAppState = helpers.copyObject(appState);
    newAppState.draggedColumn = action.payload;
    return newAppState;
}

function unsetDraggedColumn(appState, action) {
    let newAppState = helpers.copyObject(appState);
    newAppState.draggedColumn = false;
    return newAppState;
}

function setDraggedCard(appState, action) {
    let newAppState = helpers.copyObject(appState);
    newAppState.draggedCard = action.payload;
    return newAppState;
}

function unsetDraggedCard(appState, action) {
    let newAppState = helpers.copyObject(appState);
    newAppState.draggedCard = false;
    return newAppState;
}
