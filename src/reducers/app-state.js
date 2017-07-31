/**
 * Created by user on 08.07.2017.
 */

import helpers from '../utils/helpers';

let appInitialState = {
    draggedColumn:false,
    draggedCard:false,
    sidebarStatus:false
};

export  default function (appState = appInitialState, action) {
    switch (action.type) {
        case 'SET_DRAGGED_COLUMN':
            return setDraggedColumn(appState, action);
            break;
        case 'UNSET_DRAGGED_COLUMN':
            return unsetDraggedColumn(appState, action);
            break;
        case 'SET_DRAGGED_CARD':
            return setDraggedCard(appState, action);
            break;
        case 'OPEN_SIDEBAR':
            return openSidebar(appState, action);
            break;
        case 'CLOSE_SIDEBAR':
            return closeSidebar(appState, action);
            break;
        case 'UNSET_DRAGGED_CARD':
            return unsetDraggedCard(appState, action);
            break;
        default:
            return appState;
    }
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

function openSidebar(appState, action) {
    let newAppState = helpers.copyObject(appState);
    newAppState.sidebarStatus = true;
    return newAppState;
}

function closeSidebar(appState, action) {
    let newAppState = helpers.copyObject(appState);
    newAppState.sidebarStatus = false;
    return newAppState;
}