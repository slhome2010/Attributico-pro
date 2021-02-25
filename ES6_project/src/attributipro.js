/** http://servenus.com © 2015-2021 All Rights Reserved **/
/** For Attribut&pro v.0.0.3  **/

import 'jquery.fancytree';
import 'jquery-ui';
import 'ui-contextmenu';
import 'jquery-ui/ui/widgets/dialog';

import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd';

import './functions/Plugin/Dropmenu.js';
import './functions/Plugin/NodeMethod.js';

import buildFilter from './containers/BuildFilter'
import initTrees from './containers/InitTrees'
import tools from './functions/WindowContext/Tools'
import { apply, submit } from './functions/WindowContext/Apply'
import { checkForUpdates, dutyUpgrade } from './functions/WindowContext/Upgrade'
import buildDialog from './containers/BuildDialog';
import dialogEvents from './components/Events/DialogEvents';
import commonSettings from './components/Events/CommonSettings';
import configureStore from './store';
import reducer from './reducers';
import Observer from './observers/observer';
import { unitEvents } from './components/Events/UnitFormEvent.js';

window.tools = tools;
window.apply = apply;
window.submit = submit;
window.checkForUpdates = checkForUpdates;
//window.dutyUpgrade = dutyUpgrade;

window.selNodes = null;
window.selCategories = null;
window.currentCategory = 0;
window.currentAttribute = 0;
window.clipboardNodes = [];
window.clipboardTitles = [];
window.pasteMode = null;

// document ready actions
$(function() {
    let t0 = performance.now();

    $('.fancyfilter').each(buildFilter);
    $('.dialog-options').each(buildDialog);

    const initialState = {};
    const store = configureStore(reducer, initialState);

    const observer = new Observer(store);
    observer.init();

    initTrees(store);

    let ajaxFinished = 0;
    let totalAjax = 19; //Total of ajax functions you have

    $(document).ajaxComplete(function () { //Listener for a complete Ajax function
        ajaxFinished += 1;
        if (ajaxFinished == totalAjax) { //here you know that all tasks are finish
            let t1 = performance.now();
            console.log("Call to initTrees took " + (t1 - t0) + " milliseconds.");
        }
    });   

    /**
     * Alerts for tools when tasks is running
     * Placed in div = column-2, because column-1 is vtabs
     **/
    $('a[data-toggle="pill"]').on('click', function (e) {
        $("#column-2 .alert-success").hide();
        $("#column-2 .task-complete").hide();
        $("#column-2 .alert-info").show();
    });

    /**
     * Common settings change event hundlers
     *
     **/
    commonSettings(store);

    /**
     * Context menu dialog events
     *
     **/   
    dialogEvents();  
    
    /**
     * Unit form events
     *
     **/   
    unitEvents(); 

}); // end of document ready