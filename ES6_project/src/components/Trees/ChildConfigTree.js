
/**
* Building trees and configuring child nodes. (selectMode must be 2, see generateFormElements() description)
*
**/
export default class ChildConfigTree {
    constructor(element) {
        this.id = parseInt(element.id.replace(/\D+/ig, ''));
        this.tree = $("#tree" + this.id);
        this.config = {
            checkbox: true,
            selectMode: 2,
            source: {
                data: {
                    'user_token': user_token,
                    'token': token,
                    'tree': this.id
                },
                url: 'index.php?route=' + extension + 'module/attributico/getChildrenSettings'
            }
        }
    }

    render() {
        this.tree.fancytree(this.config);
    }
}
