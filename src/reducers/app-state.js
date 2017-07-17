/**
 * Created by user on 08.07.2017.
 */

import helpers from '../utils/helpers';

let appInitialState = {
    draggedColumn:false
};

export  default function (appState = appInitialState, action) {
    switch (action.type) {
        case 'SET_DRAGGED_COLUMN':
            return setDraggedColumn(appState, action);
            break;
        case 'UNSET_DRAGGED_COLUMN':
            return unsetDraggedColumn(appState, action);
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