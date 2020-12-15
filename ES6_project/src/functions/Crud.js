import { getSelectedKeys, getSelectedTitles, deSelectNodes, deSelectCategories } from './Select'
import { copyNode, deleteNode, dndAddNode, dndReplaceCategory, updateNode } from '../actions';
import { moveNode } from './Move';

export function addNewAttribute(activeNode, activeKey, lng_id) {
    /* This function for previously insert New record in DataBase and  editing this in tree after */
    let node = activeNode,
        parentLevel = (activeKey === 'attribute') ? 2 : 1;
    while (node.getLevel() > parentLevel) {
        node = node.getParent();
    }

    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'key': node.key,
            'language_id': lng_id,
            'tree': '1' // TODO  уточнить смысл передачи параметра            
        },
        url: 'index.php?route=' + extension + 'module/attributico/addAttribute',
        success: function (newNode) {
            // Здесь dispatch не нужен, т.к. сработает SaveAfterEdit            
            node.editCreateNode("child", newNode);
        }
    });
}

export function deleteAttribute(node, store) {
    let level = node.getLevel();
    if (level === 2 || level === 3 || level === 5) {
        $.ajax({
            data: {
                'keys': selNodes ? getSelectedKeys(selNodes) : [node.key],
                'titles': selNodes ? getSelectedTitles(selNodes) : [node.title],
                'language_id': node.getLanguageId()
            },
            url: `index.php?route=${extension}module/attributico/deleteAttributes&user_token=${user_token}&token=${token}`,
            type: 'POST',
            success: function () {
                let affectedNodes = []
                let removeVisibleNodes = true
                // let cloneNode = Object.assign({}, node); none deep-clone
                // Deep-clone object
                // let cloneNode = jQuery.extend(true, {}, node)
                if (node.isTemplate() || node.isValue()) {
                    affectedNodes.push(node.getParentAttribute())
                    // Не удаляем видимые узлы, т.к. родительский перезагрузится и их там может уже не быть                    
                    removeVisibleNodes = false
                } else if (node.isAttribute()) {
                    affectedNodes.push(node.getParentGroup())
                } else {
                    // Delete Group  
                    affectedNodes = null
                }
                // Надо до remove иначе node может уже не быть придется работать с клоном. У клона нет siblings.
                store.dispatch(deleteNode(node, affectedNodes));

                if (removeVisibleNodes) {
                    // selNodes не всегда есть, т.к. они создаются только по ctrl+click
                    if (selNodes) {
                        selNodes.forEach(selnode => {
                            selnode.remove();
                        });
                    } else {
                        node.remove();
                    }
                }

            }
        });
    }
}

export function deleteDuty(node, store) {
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'key': node.key,
            'language_id': node.getLanguageId(),
            'name': '',
        },
        url: 'index.php?route=' + extension + 'module/attributico/editAttribute',
        success: function () {
            // при удалении надо перезагрузить дерево т.к. поле не удаестя сделать пустым при edit
            store.dispatch(deleteNode(node, [node.getParentGroup()]));
        }
    });
}

export function cloneDuty(node, store) {
    if (node.title === '' && !confirm('Warning! This node is empty. All cloned nodes will become empty. Are you sure?')) return
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
            'key': node.key,
            'language_id': node.getLanguageId(),
            'name': node.title,
            'clone': true
        },
        url: 'index.php?route=' + extension + 'module/attributico/editAttribute',
        success: function () {
            // при удалении надо перезагрузить дерево т.к. поле не удаестя сделать пустым при edit
            store.dispatch(updateNode(node, [node.getParentGroup()]));
            $(node.span).removeClass("pending");
        }
    });
}

// sourceNode = data.otherNode это узел источника
// Синхронизировать деревья атрибутов надо, т.к. могли добавиться или удалиться значения после add/delete
export function addAttributeToCategory(sourceNode, targetNode, clipboard, remove, store) {
    $.ajax({
        data: {
            'attributes': clipboard ? getSelectedKeys(clipboard) : [sourceNode.key],
            'category_id': targetNode.key,
            'categories': selCategories ? getSelectedKeys(selCategories) : []
        },        
        url: `index.php?route=${extension}module/attributico/addCategoryAttributes&user_token=${user_token}&token=${token}`,
        type: 'POST'
    }).done(function () {
        // Это либо смена категории либо копипаст из CategoryAttributeTree
        if (!remove) {
            deSelectCategories();            
            // Надо перезагружать остальные деревья, чтоб подхватить новые значения и шаблоны            
            store.dispatch(dndAddNode(sourceNode, targetNode, clipboard ? clipboard : [sourceNode]));
            deSelectNodes();
        } else {
            deSelectCategories(); // чтобы не удалялось в отмеченных категориях
            deleteAttributesFromCategory(sourceNode, targetNode, clipboard, store);
        }
    });
}

export function deleteAttributesFromCategory(sourceNode, targetNode, clipboard, store) {
    let category_id = sourceNode.getParent().key;

    $.ajax({
        data: {
            'attributes': clipboard ? getSelectedKeys(clipboard) : [sourceNode.key],
            'category_id': category_id,
            'categories': selCategories ? getSelectedKeys(selCategories) : []
        },       
        url: `index.php?route=${extension}module/attributico/deleteAttributesFromCategory&user_token=${user_token}&token=${token}`,
        type: 'POST',
        success: function () {
            // Если targetNode == null, то это просто операция удаления
            store.dispatch(dndReplaceCategory(sourceNode, targetNode, clipboard ? clipboard : [sourceNode]));
        }
    });
    deSelectNodes();
}

export function copyPaste(action, actionNode, store) {
    let activeTree = actionNode.tree;
    // Селектор нужен т.к. источником узлов могут служить разные деревья. В селекторе убираем цифры.
    let TREE_SELECTOR = '[name ^=' + activeTree.$div[0].id.replace(/[0-9]/g, '') + ']';
    let lng_id = parseInt(activeTree.$div[0].id.replace(/\D+/ig, ''));
    let direct = 'after';
    let ctrlKey = false;
    let parentNode;
    let sourceNode;
    let targetNode;
    let targetLevel;
    let sourceLevel;

    // actionNode в операциях cut & copy играет роль sourceNode, а в операции paste targetNode
    switch (action) {
        case "cut":
        case "copy":
            pasteMode = action;
            // selNodes надо переписать в буфер обмена, т.к. при нажатии без ctrl сработет deselectNodes()
            // заполняем буфер обмена clipboard выделенными узлами для каждого языка
            // для операций move нужен список узлов не важно для какого языка
            // для операций delete нужен список узлов не важно для какого языка
            // для операций addToCategory нужен список узлов не важно для какого языка
            // если нужен список узлов, то используется selNodes или [sourceNode.key]
            // однако для функций addAttribute... нужна структура типа :
            // [[empty,A1ru,empty,A1en],[empty,A2ru,empty,A2en],...[empty,A100ru,empty,A100en]]
            $(TREE_SELECTOR).each(function (indx, selector) {
                let tree = $.ui.fancytree.getTree("#" + selector.id);
                let lng_id = parseInt(selector.id.replace(/\D+/ig, ''));

                clipboardNodes[lng_id] = [];
                clipboardTitles[lng_id] = [];

                if (selNodes) {
                    selNodes.forEach(node => {
                        let selNode = tree.getNodeByKey(node.key);
                        if (selNode !== null) {
                            clipboardNodes[lng_id].push(selNode);
                            clipboardTitles[lng_id].push(selNode.title);
                        }
                    });
                } else {
                    let selNode = tree.getNodeByKey(actionNode.key);
                    if (selNode !== null) {
                        clipboardNodes[lng_id].push(selNode);
                        clipboardTitles[lng_id].push(selNode.title);
                    }
                }
            });
            break;
        case "paste":
            direct = 'after';
            ctrlKey = false;

            if (clipboardNodes.length == 0) {
                alert("Clipboard is empty.");
                break;
            }

            if (pasteMode == "cut") {
                // Cut mode: check for recursion and remove source 
                parentNode = actionNode.getParentGroup() || actionNode.getParentCategory();
                sourceNode = clipboardNodes[lng_id][0];
                targetNode = actionNode;
                targetLevel = actionNode.getLevel();
                sourceLevel = sourceNode.getLevel();

                if (parentNode.isCategory()) {
                    addAttributeToCategory(sourceNode, parentNode, clipboardNodes[lng_id], true, store);
                } else {
                    if (targetLevel !== sourceLevel) {
                        direct = 'over';
                    }
                    // embargo on levels mixing
                    if (targetLevel === 1 || targetLevel > sourceLevel) {
                        alert('Merging nodes of different levels is impossible.')
                    } else {
                        // clipboardNodes[lng_id] - список узлов не важно для какого языка
                        moveNode(sourceNode, targetNode, clipboardNodes[lng_id], ctrlKey, direct, store)
                    }
                }
            } else {
                pasteNodes(actionNode, lng_id, store);
            }

            clipboardNodes = [];
            clipboardTitles = [];
            pasteMode = null;
            break;
        case "merge":
            direct = 'over';
            ctrlKey = true;

            if (clipboardNodes.length == 0) {
                alert("Clipboard is empty.");
                break;
            }

            if (pasteMode == "cut") {
                sourceNode = clipboardNodes[lng_id][0];
                targetLevel = actionNode.getLevel();
                sourceLevel = sourceNode.getLevel();
                if (targetLevel === sourceLevel) {
                    moveNode(sourceNode, actionNode, clipboardNodes[lng_id], ctrlKey, direct, store)
                } else {
                    alert('Merging nodes of different levels is impossible.')
                }
            }

            clipboardNodes = [];
            clipboardTitles = [];
            pasteMode = null;
            break;
        default:
            alert("Unhandled clipboard action '" + action + "'");
    }
}

export function pasteNodes(targetNode, lng_id, store) {
    let parentNode = targetNode.getParentGroup() || targetNode.getParentCategory();
    let sourceNode = clipboardNodes[lng_id][0];

    if (parentNode.isGroup()) {
        $.ajax({
            data: {
                'target': parentNode.key,
                'titles': clipboardTitles,
                'attributes': getSelectedKeys(clipboardNodes[lng_id]),
            },           
            url: `index.php?route=${extension}module/attributico/addAttributes&user_token=${user_token}&token=${token}`,
            type: 'POST',
            success: function () {
                store.dispatch(copyNode(sourceNode, parentNode));
            }
        });
    }
    if (parentNode.isCategory()) {
        addAttributeToCategory(sourceNode, parentNode, clipboardNodes[lng_id], false, store);
    }
}