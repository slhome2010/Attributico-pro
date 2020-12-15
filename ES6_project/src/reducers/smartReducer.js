import { COPY_NODE, RENAME_NODE, ADD_NODE, DELETE_NODE, UPDATE_NODE, PASTE_NODE, CUT_NODE } from '../constants/actions'

export default function smart(state = {}, action) {
    switch (action.type) {

        case RENAME_NODE:
        case UPDATE_NODE:
            return {
                ...state,                
                affilateValue: action.node.getParent().getNextSibling(),
                affilateTemplate: action.node.getParent().getPrevSibling()
            }      

        default:
            return state;
    }
}