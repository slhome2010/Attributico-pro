/**
 * Filter create and event services
 * @type {class}
 *
 **/
export default class Filter {
    constructor(tab, tree, lng_id) {
        this.data = {
            tab,
            tree,
            lng_id            
        };
        this.input = $("input[name=" + this.data.tab + "_search" + this.data.lng_id + "]");
        this.btnSearch = $("button#" + this.data.tab + "_btnSearch" + this.data.lng_id);
        this.btnResetSearch = $("button#" + this.data.tab + "_btnResetSearch" + this.data.lng_id);
        this.checkbox = $("div#" + this.data.tab + "_filter" + this.data.lng_id + " input:checkbox");
        this.autoComplete = $("input#fs" + this.data.tab + "_autoComplete" + this.data.lng_id);

        this.search = this.search.bind(this);
        this.keyupCounter = 0
    }

    attachEvents() {        
        this.input.on('keyup focus', this.data, this.search);
        this.btnSearch.on('click', this.data, this.search);
        this.checkbox.on('change', this.data, this.changeSettings);
        this.btnResetSearch.on('click', this.data, this.clear).attr("disabled", true);
        this.btnSearch.attr("disabled", this.autoComplete.is(":checked"));        
        $("a[id ^=f_" + this.data.tab + this.data.lng_id + "]").on('click', this.data, this.action);
    }

    clear(e) {
        if (e.data.tree.isFilterActive()) {
            e.data.tree.clearFilter();            
            $('input[name *= ' + e.data.tab + '_search' + e.data.lng_id + ']').val("");
            $('span[id *= ' + e.data.tab + '_matches' + e.data.lng_id + ']').text("");            
            $("[id ^=loadImg]").hide();
        }
    }

    changeSettings(e) {
        let id = $(this).attr("id");
        let flag = $(this).is(":checked");

        switch (id) {
            case "fs_" + e.data.tab + "_autoExpand" + e.data.lng_id:
            case "fs_" + e.data.tab + "_regex" + e.data.lng_id:
            case "fs_" + e.data.tab + "_leavesOnly" + e.data.lng_id:
            case "fs_" + e.data.tab + "_attributesOnly" + e.data.lng_id:
                break; // Re-apply filter only
            case "fs_" + e.data.tab + "_autoComplete" + e.data.lng_id:
                $("button#" + e.data.tab + "_btnSearch" + e.data.lng_id).attr("disabled", $(this).is(":checked"));
                break;
            case "fs_" + e.data.tab + "_hideMode" + e.data.lng_id:
                e.data.tree.options.filter.mode = flag ? "hide" : "dimm";
                break;
            case "fs_" + e.data.tab + "_counter" + e.data.lng_id:
                e.data.tree.options.filter['counter'] = flag;
                break;
            case "fs_" + e.data.tab + "_fuzzy" + e.data.lng_id:
                e.data.tree.options.filter['fuzzy'] = flag;
                break;
            case "fs_" + e.data.tab + "_hideExpandedCounter" + e.data.lng_id:
                e.data.tree.options.filter['hideExpandedCounter'] = flag;
                break;
            case "fs_" + e.data.tab + "_highlight" + e.data.lng_id:
                e.data.tree.options.filter['highlight'] = flag;
                break;
        }
        e.data.tree.clearFilter();
        $("input[name=" + e.data.tab + "_search" + e.data.lng_id + "]").trigger("keyup");
    }

    async search(e) {
        let tab = e.data.tab;
        let lng_id = e.data.lng_id;
        let tree = e.data.tree;
        let n = 0;
        let opts = {
            autoExpand: $("#fs_" + tab + "_autoExpand" + lng_id).is(":checked"),
            leavesOnly: $("#fs_" + tab + "_leavesOnly" + lng_id).is(":checked")
        };
        let attributesOnly = $("#fs_" + tab + "_attributesOnly" + lng_id).is(":checked");
        let match = $("input[name=" + tab + "_search" + lng_id + "]").val();        

        if (e && e.which === $.ui.keyCode.ESCAPE || $.trim(match) === "") {
            $("button#" + tab + "_btnResetSearch" + lng_id).trigger("click");
            return;
        }
        if (!$("#fs_" + tab + "_autoComplete" + lng_id).is(":checked") && e.type === "keyup") {
            return;
        }

        if (!attributesOnly && this.keyupCounter === 0) {
            // keyuoCounter защита от срабатывания на каждую букву при автозаполнении
            await this.loadAllNodes(tree)            
            this.keyupCounter++          
        }

        setTimeout(() => {
            if ($("#fs_" + tab + "_regex" + lng_id).is(":checked")) {
                // Pass function to perform match
                n = tree.filterNodes(function (node) {
                    return new RegExp(match, "i").test(node.title);
                }, opts);
                $("span#" + tab + "_matches" + lng_id).text("(" + n + ")");
            } else {
                n = tree.filterNodes(match, opts);
                $("span#" + tab + "_matches" + lng_id).text("(" + n + ")");
            }
        }, 600);

        $("button#" + tab + "_btnResetSearch" + lng_id).attr("disabled", false);
        $("span#" + tab + "_matches" + lng_id).text("(" + n + ")");
    }

    async loadAllNodes(tree) {
        tree.visit(node => {
            if (node.isLazy()) {
                node.load(true);
            }
        })        
    }

    action(e) {
        let tab = e.data.tab;
        let lng_id = e.data.lng_id;
        let btnSearch = $("button#" + tab + "_btnSearch" + lng_id);
        let btnResetSearch = $("button#" + tab + "_btnResetSearch" + lng_id);
        let regex = $("div#" + tab + "_searchmode" + lng_id + " input#fs_" + tab + "_regex" + lng_id + ":checkbox");
        let input = $("input[name=" + tab + "_search" + lng_id + "]");

        regex.prop({
            "checked": true
        });

        switch (e.target.id) {
            case 'f_' + tab + lng_id + '_empty':
                input.val("^\s*$");
                btnSearch.trigger("click");
                break;
            case 'f_' + tab + lng_id + '_digital':
                input.val("[0-9]");
                btnSearch.trigger("click");
                break;
            case 'f_' + tab + lng_id + '_html':
                input.val("<[^>]+>");
                btnSearch.trigger("click");
                break;
            case 'f_' + tab + lng_id + '_default':
                regex.prop({
                    "checked": false
                });
                btnResetSearch.trigger("click");
                break;
        }

        return false;
    }
}