import ChildConfigTree from '../components/Trees/ChildConfigTree';
import AttributeGroupTree from '../components/Trees/AttributeGroupTree';
import CategoryTree from '../components/Trees/CategoryTree'
import CategoryAttributeTree from '../components/Trees/CategoryAttributeTree'
import AttributeTree from '../components/Trees/AttributeTree';
import DutyTree from '../components/Trees/DutyTree';
import AttributeProductTree from '../components/Trees/AttributeProductTree';
import ProductTree from '../components/Trees/ProductTree';
import GroupCheckTree from '../components/Trees/GroupCheckTree';
import CategoryCheckTree from '../components/Trees/CategoryCheckTree';
import {
    ATTRIBUTE_GROUP_TREE, CATEGORY_TREE, CATEGORY_ATTRIBUTE_TREE, ATTRIBUTE_TREE, DUTY_ATTRIBUTE_TREE,
    PRODUCT_TREE, ATTRIBUTE_PRODUCT_TREE, GROUP_CHECK_TREE, CATEGORY_CHECK_TREE
} from '../constants/global'

export default function initTrees(store) {

    /**
    * Building trees and configuring child nodes. (selectMode must be 2, see generateFormElements() description)
    *
    **/
    $('[id ^= "tree"]').each(function (indx, element) {
        let tree = new ChildConfigTree(element);
        tree.render();
    });

    /* 
        * Build deduplicate tree and detach tree for tools
        * This tree must have fixed position for correctly form serializing
        */
    $(GROUP_CHECK_TREE).each(function (indx, element) {
        let tree = new GroupCheckTree(element,store);
        tree.render();
    });

    /**
     * Build category attribute tree for tools
     * This tree must have fixed position for correctly form serializing
     **/
    $(CATEGORY_CHECK_TREE).each(function (indx, element) {
        let tree = new CategoryCheckTree(element,store);
        tree.render();
    });

    // ------------------------ main attribute table --------------------
    $(ATTRIBUTE_GROUP_TREE).each(function (indx, element) {
        let tree = new AttributeGroupTree(element,store);
        tree.render();
    });

    // ----------------------- category table --------------------------
    $(CATEGORY_TREE).each(function (indx, element) {
        let tree = new CategoryTree(element,store);
        tree.render();
    });

    $(CATEGORY_ATTRIBUTE_TREE).each(function (indx, element) {
        let tree = new CategoryAttributeTree(element,store);
        tree.render();
    });

    $(ATTRIBUTE_TREE).each(function (indx, element) {
        let tree = new AttributeTree(element,store);
        tree.render();
    });

    // ---------------------- duty attribute table ------------------
    $(DUTY_ATTRIBUTE_TREE).each(function (indx, element) {
        let tree = new DutyTree(element,store);
        tree.render();
    });

    // ------------------- product  attribute table -----------------
    $(ATTRIBUTE_PRODUCT_TREE).each(function (indx, element) {
        let tree = new AttributeProductTree(element,store);
        tree.render();
    });

    $(PRODUCT_TREE).each(function (indx, element) {
        let tree = new ProductTree(element,store);
        tree.render();
    });

} // end of Inittree()