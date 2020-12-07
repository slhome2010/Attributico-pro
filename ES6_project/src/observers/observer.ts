/**
 * @class Observer
 */
import { Store, StoreCreator } from 'redux';
import { CATEGORY_TREE } from '../constants/global';
import { getSelectedTitles } from '../functions/Select'
export default class Observer {
    store: Store
    constructor(store: Store) {
        this.store = store;
    }

    /** Надо перезагрузить дерево атрибутов категории, т.к. назания или узлы могли измениться 
     * в результате действий над ними в других деревьях
    */
    reactivateCategory(targetNode: Fancytree.FancytreeNode) {
        $(CATEGORY_TREE).each((indx: number, element: HTMLUListElement) => {
            const tree = $.ui.fancytree.getTree("#" + element.id);
            let activeNode = targetNode?.isCategory() ? targetNode : tree.getActiveNode();

            if (activeNode) {
                tree.getNodeByKey(activeNode.key).setActive(false);
                tree.getNodeByKey(activeNode.key).setActive(true);
            }
        });
    }
    /* Clear Filter if tree reload */
    clearFilter(tree: Fancytree.Fancytree) {
        if (tree.isFilterActive()) {

            tree.clearFilter();

            $('input[name *= "search"]').val("");
            $('span[id *= "matches"]').text("");
            $("[id ^=loadImg]").hide();
        }
    }

    printState(state: any) {
        let stateInfo = {
            tree: state.tree !== null ? state.tree.$div[0].id : null,
            sourceNode: state.sourceNode !== null ? state.sourceNode.title : null,
            targetNode: state.targetNode !== null ? state.targetNode.title : null,
            activeNode: state.activeNode !== null ? state.activeNode.title : null,
            altActiveNode: state.altActiveNode !== null ? state.altActiveNode.title : null,
            selfReload: state.selfReload,
            affectedNodes: getSelectedTitles(state.affectedNodes)
        }
        console.log('stateInfo', stateInfo)
    }

    async expandeAllParents(node: Fancytree.FancytreeNode) {
        let parentList = node.getParentList(false, false)
        for (let parent of parentList) {
            await parent.setExpanded(true)
        }
    }

    async setActiveNode(tree: Fancytree.Fancytree, estimatedAactiveNode: Fancytree.FancytreeNode, possibleActiveNode: Fancytree.FancytreeNode) {
        let currentActiveNode = tree.getActiveNode();
        let activeNode = estimatedAactiveNode !== null ? tree.getNodeByKey(estimatedAactiveNode.key) : currentActiveNode !== null ? tree.getNodeByKey(currentActiveNode.key) : null;
        let altActiveNode = possibleActiveNode != null ? tree.getNodeByKey(possibleActiveNode.key) : null;

        if (activeNode !== null) {
            await this.expandeAllParents(activeNode)
            activeNode.setActive(true)
            /* Если бы могли, то подогнали бы в область видимости newnode.makeVisible(); newnode.scrollIntoView(); */
        } else if (altActiveNode !== null) {
            await this.expandeAllParents(altActiveNode)
            altActiveNode.setActive(true)
        }
        //console.log('3 Active node set for:', tree.$div[0].id);
    }

    async loadAllChildren(node: Fancytree.FancytreeNode) {
        let childrens = node.getChildren()

        for (let child of childrens) {
            if (child.isTemplate() || child.isValue()) {
                child.resetLazy();
                await child.load(true)
                //console.log('1 Child loaded for:', child.key, child.tree.$div[0].id);
            }
        }
    }

    async loadParent(node: Fancytree.FancytreeNode) {
        node.resetLazy();
        await node.load(true)
    }

    async loadAllLazyNodes(tree: Fancytree.Fancytree, nodeList: Fancytree.FancytreeNode[]) {
        for (let node of nodeList) {
            let findedNode: Fancytree.FancytreeNode = tree.getNodeByKey(node.key);
            if (findedNode.isGroup()) {
                await this.loadParent(findedNode)
            } else {
                await this.loadAllChildren(findedNode)
            }
        }
    }

    async smartReload(tree: Fancytree.Fancytree, nodeList: Fancytree.FancytreeNode[]) {
        await this.loadAllLazyNodes(tree, nodeList)
        //console.log('2 Smart reloaded for:', tree.$div[0].id);
    }

    /* Асинхронная функция. Деревья и узлы грузятся параллельно, но установка активного узла только после загрузки. */
    treeReload() {
        let state = { ...this.store.getState().reloadReducer, ...this.store.getState().smartReducer };
        let treeSelectors: Array<HTMLUListElement> = [];
        //this.printState(state)
        // Если активное дерево не перезагружалось, то надо установить активный узел принудительно 
        if (!state.selfReload && state.activeNode !== null) {
            state.activeNode.getParent().setExpanded(true).done(() => { state.activeNode.setActive(true) });
        }

        this.reactivateCategory(state.targetNode)

        $(state.boundTrees).each( (index: number, treeSelector: HTMLUListElement) => { treeSelectors.push(treeSelector)})
        treeSelectors.forEach(async (treeSelector: HTMLUListElement): Promise<void> => {
            let tree = $.ui.fancytree.getTree("#" + treeSelector.id);
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            if (state.affectedNodes !== null) {                
                if ((tree !== state.tree) || state.selfReload) {
                    await this.smartReload(tree, state.affectedNodes)
                }
                this.setActiveNode(tree, state.activeNode, state.altActiveNode)
            } else
                if ((tree !== state.tree) || state.selfReload) { // not reload active tree
                    this.clearFilter(tree);
                    tree.reload().done(() => {
                        // В каждом дереве установим активный узел или альтернативный, н-р, родителя 
                        this.setActiveNode(tree, state.activeNode, state.altActiveNode)
                    });
                }
        });
    }
    /* Функция приведенная к синхронному виду. Деревья и узлы грузятся последовательно */
    /* async treeReload() {
        let state = { ...this.store.getState().reloadReducer, ...this.store.getState().smartReducer };
        let treeSelectors: Array<HTMLUListElement> = [];
        this.printState(state)
        // Если активное дерево не перезагружалось, то надо установить активный узел принудительно /
        if (!state.selfReload && state.activeNode !== null) {
            state.activeNode.getParent().setExpanded(true).done(() => { state.activeNode.setActive(true) });
        }
        // Сформируем массив для последующего синхронного цикла for ... of
        $(state.boundTrees).each( (index: number, treeSelector: HTMLUListElement) => { treeSelectors.push(treeSelector)})

        for (let treeSelector of treeSelectors) {
            let tree = $.ui.fancytree.getTree("#" + treeSelector.id);
            tree.options.source.data.cache = $('input[name = "attributico_cache"]:checkbox').is(":checked");
            if (state.affectedNodes !== null) {
                // self перенести в реюсер т.к. разное управление для разных операций
                // console.log('(', tree !== state.tree, '||', state.targetNode.getParent().isLazy(), ') ||', state.selfReload) /
                if ((tree !== state.tree) || state.selfReload) {
                    await this.smartReload(tree, state.affectedNodes)
                }
                this.setActiveNode(tree, state.activeNode, state.altActiveNode)                
            } else
                if ((tree !== state.tree) || state.selfReload) { // not reload active tree
                    this.clearFilter(tree);
                    tree.reload().done(() => {
                        // В каждом дереве установим активный узел или альтернативный, н-р, родителя /
                        this.setActiveNode(tree, state.activeNode, state.altActiveNode)
                    });
                }                
        }
    } */

    init() {
        this.store.subscribe(this.treeReload.bind(this))
    }
}