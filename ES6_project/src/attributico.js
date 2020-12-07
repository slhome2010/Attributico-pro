/** http://servenus.com © 2015-2021 All Rights Reserved **/
/** For Attribut&co v.3.1.5  **/

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
import apply from './functions/WindowContext/Apply'
import { checkForUpdates, dutyUpgrade } from './functions/WindowContext/Upgrade'
import buildDialog from './containers/BuildDialog';
import dialogOptionEvents from './components/DialogOption';
import commonSettings from './components/CommonSettings';
import configureStore from './store';
import reducer from './reducers';
import Observer from './observers/observer';

window.tools = tools;
window.apply = apply;
window.checkForUpdates = checkForUpdates;
window.dutyUpgrade = dutyUpgrade;

window.selNodes = null;
window.selCategories = null;
window.currentCategory = 0;
window.currentAttribute = 0;
window.clipboardNodes = [];
window.clipboardTitles = [];
window.pasteMode = null;

// document ready actions
$(function () {
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


    /* Button Save onclick event */
    $("#form-attributico").on('submit', function () {
        // Render hidden <input> elements for active and selected nodes
        $('[id ^= "tree"].settings').each(function (indx, element) {
            let tree = $.ui.fancytree.getTree("#" + element.id);
            tree.generateFormElements();
        });
        // alert("POST data:\n" + jQuery.param($(this).serializeArray()));
        // return false to prevent submission of this sample
        //  return false;
        //TODO submit deprecated
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
    // Attach dialog
    $('.dialog-options').dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        closeOnEscape: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });

    dialogOptionEvents();

}); // end of document ready