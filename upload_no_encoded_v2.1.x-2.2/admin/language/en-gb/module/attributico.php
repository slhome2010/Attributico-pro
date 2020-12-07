<?php

// Heading
$_['heading_title'] = '<span> Attribut<b style="color: #2199C7;">&</b>co</span>';

// Text
$_['text_success'] = 'Success: You have modified module!';
$_['text_module'] = 'Modules';
$_['text_edit'] = 'Edit Module';
$_['text_renew'] = 'Renew';
$_['text_keep'] = 'Keep';
$_['text_duty'] = 'Take duty template';
$_['text_duty_only'] = 'Take duty only if values is empty';
// Filter
$_['text_autoCollapse'] = 'autoCollapse';
$_['text_autoComplete'] = 'AutoComplete';
$_['text_Regular_expression'] = 'Regular expression';
$_['text_Highlight'] = 'Highlight';
$_['text_Fuzzy'] = 'Fuzzy';
$_['text_hideExpandedCounter'] = 'hideExpandedCounter';
$_['text_Counter_badges'] = 'Counter badges';
$_['text_Auto_expand'] = 'Auto expand';
$_['text_Leaves_only'] = 'Values only ';
$_['text_Attributes_only'] = 'Attributes only';
$_['text_Hide_unmatched_nodes'] = 'Hide unmatched nodes';
$_['text_matches'] = 'matches';
$_['text_filter'] = 'Filter:';
$_['button_filter_action']     = 'Execute';
$_['f_empty']     = 'Search empty';
$_['f_digital']   = 'Search numbers';
$_['f_html']      = 'Search HTML tags';
$_['f_default']   = 'Restore';
// Menu
$_['text_New_attribute'] = 'New attribute';
$_['text_New_group'] = 'New group';
$_['text_Expande'] = 'Expande';
$_['text_Collapse'] = 'Collapse';
$_['text_Edit'] = 'Edit';
$_['text_Delete'] = 'Delete';
$_['text_Copy'] = 'Copy';
$_['text_Paste'] = 'Paste';
$_['text_Options'] = 'Options';
$_['text_Sort'] = 'Sort (ASC)';
$_['text_sortOrder'] = 'Sort order';
$_['text_multiSelect'] = 'Hierarchical multiselect';
$_['text_lazyLoad'] = 'Lazy load';
$_['text_attention'] = 'Attention!';

$_['text_support'] = '<fieldset>
        		<legend>Support</legend>
                            <address>
                                For all questions related to the operation of the module, please contact:<br/>
				<strong>E-mail:</strong> <a href="mailto:#">comtronics@mail.ru</a><br/>
				<strong>Demo:</strong> <a href="http://demo.radiocity.kz">demo.radiocity.kz/admin (demo, demo)</a><br/>
                                <strong>Manual:</strong> <a href="http://servenus.com/ru/doc_attributico_ru.html">servenus.com/en/doc_attributico_en.html</a>
                            </address>
                    </fieldset>	';
$_['text_help1'] = '<legend>Mouse and keyboard control</legend>
                                <table class="table table-bordered">
                                    <thead><tr><th>The combination of mouse and keyboard</th><th>Action</th><th>Note</th></tr></thead>
                                    <tbody>
                                        <tr><td>Double click</td><td>Expand / Collapse node</td><td></td></tr>
                                        <tr><td>Ctrl + click</td><td>Select node</td><td>You can select multiple nodes</td></tr>
                                        <tr><td>Right button</td><td>Context menu</td><td>There are hints of hot keys</td></tr>
                                        <tr><td>Down mouse left button and move</td><td>Dragging nodes</td><td>The technology drag&drop</td></tr>
                                    </tbody>
                                </table>';
$_['text_help2'] = '<legend>Helpful information</legend>
                                <table class="table table-bordered">
                                    <thead><tr><th>Information</th><th>Description</th><th>Note</th></tr></thead>
                                    <tbody>
                                        <tr><td>Expanded tree</td>
                                            <td>By default, when expanding the node, all siblings are collapsed. To enable full expansion mode, it is necessary in the context menu,
                                            go to "Settings" and disable the checkbox with "autoCollapse"</td>
                                            <td>For each tree its own settings.</td></tr>
                                        <tr><td>Legend trees</td>
                                            <td>On the tab "Attributes" only one tree - "Attribute Groups". On the tab "Attributes category" three trees:
                                            "Categories" - on the left, "Categories Attributes" - to the right, "Attributes" - below. On the tab "Duty templates" - the same name tree.</td><td></td></tr>
                                        <tr><td>Adding attribute to the category</td>
                                            <td>The first way - to move the selected attributes from the bottom  tree ("Attributes") to the target category ( tree "Categories")
                                            or to the right tree ("Categories Attributes"). The second way - to go to the context menu of the tree "Categories Attributes"
                                            and select "New attribute". Click on the input box for the autocomplete..</td>
                                            <td>Target tree nodes are opened automatically after a short delay</td></tr>
                                        <tr><td>Change groups or categories</td>
                                            <td>Select  attributes for which you want to change the category (tree "Attributes category") and drag it to the target category
                                            (tree "Categories")</td><td>Note, that in the source tree, selected nodes are removed.</td></tr>
                                    </tbody>
                                </table>';
$_['help_sortorder'] = 'The sort order will be taken into account when constructing the tree, otherwise it will be done by sorting alphabetically';
$_['help_smart_scroll'] = 'Scroll nodes into fixed visible area';
$_['help_empty'] = 'Show or hide empty attribute values or blank templates';
$_['help_multiselect'] = 'Recursive selection of all child categories of marked category. If all child categories are marked, parent will marked automatically';
$_['help_autoattribute'] = 'When adding a new attribute to the category, it will automatically be added to all products of this category';
$_['help_autodel'] = 'When you delete an attribute of a category, it will automatically be removed from all products in this category';
$_['help_autoadd_inherit'] = 'Adding attributes to all the sub-categories, and the attribute values or templates to all products of these subcategories.';
$_['help_autodel_inherit'] = 'Remove the attributes from all the sub-categories, and the attribute values or patterns of all the products of these subcategories.';
$_['help_product_text'] = 'When you add an attribute to the product, the value of an attribute can be renewed (clear), keeping (save that which is already there) or Taken from duty template, overwriting the attribute values, or Taken from duty template only if the attribute values is empty.';
$_['help_upgrade'] = 'The database structure does not match the version of the module. Click the button below to conform.';
$_['help_children'] = 'It enables or disables the display of Templates, Values or Duty Template as a child nodes of attribute in this tree.';
$_['help_nosettings'] = 'Settings are not necessary.';
$_['help_about_blank'] = 'Open the product page in a new window. Attention! You take responsibility for the integrity of the data.';
$_['help_lazyload'] = 'Templates and values are not loaded at the time of loading of the tree, and loaded on demand.';
$_['help_group_options'] = 'Select the groups for which you want to perform this task.';
$_['help_defrag_options'] = 'You can undo the defragmentation of Groups or Attributes by uncheckmark from the corresponding item.';
$_['help_cache'] = 'When loading attribute trees, the data will be retrieved from the file cache corresponding to the tree.';

// Entry
$_['entry_attribute_groups'] = 'Attribute Groups';
$_['entry_attribute_template'] = 'Templates';
$_['entry_attribute_values'] = 'Values';
$_['entry_splitter'] = 'The splitter attributes';
$_['entry_autoattribute'] = 'Add categories attribute to Products';
$_['entry_autodel'] = 'Remove attribute category of products';
$_['entry_autoadd_inherit'] = 'Add in all sub-categories';
$_['entry_autodel_inherit'] = 'Remove from all subcategories';
$_['entry_sortorder'] = 'Consider the sort order';
$_['entry_smart_scroll'] = 'Smart scrolling';
$_['entry_empty'] = 'Show empty values';
$_['entry_multiselect'] = 'Hierarchical multiselect categories';
$_['entry_product_text'] = 'Attribute values';
$_['entry_categories'] = 'Categories';
$_['entry_sub_categories'] = 'Subcategories';
$_['entry_attributes'] = 'Attributes';
$_['entry_attribute'] = 'Attribute';
$_['entry_upgrade'] = 'Upgrade Database';
$_['entry_attribute_category'] = 'Attributes of Category';
$_['entry_duty'] = 'Duty';
$_['entry_products'] = 'Products';
$_['entry_about_blank'] = 'The product in a new window';
$_['entry_lazyload'] = 'Lazy load child nodes';
$_['entry_cache'] = 'Cache of the attributes trees';

// Error
$_['error_permission'] = 'Warning: You do not have permission to modify Attribut<b style="color: #003F62;">&</b>co!';
$_['error_not_category'] = 'Category not selected!';
$_['error_not_attribute'] = 'Attribute not selected!';

// Tab
$_['tab_general']           = 'Settings';
$_['tab_attribute']         = 'Attributes';
$_['tab_support']           = 'Support';
$_['tab_duty']              = 'Duty';
$_['tab_category']          = 'Categories attributes';
$_['tab_tools']             = 'Tools';
$_['tab_products']          = 'Products';
$_['tab_empty']             = 'Remove empty values';
$_['tab_defrag']            = 'Attributes defragmentation';
$_['tab_detached']          = 'Remove detached from products';
$_['tab_deduplicate']       = 'Combine duplicates (beta)';
$_['tab_scavengery']        = 'Remove erroneous links';
$_['tab_standart']          = 'Attributes standardization';
$_['tab_cache']             = 'Trees cache cleaning';

// Legend
$_['legend_general'] = 'General settings';
$_['legend_category'] = 'Adding / removing attributes in category';
$_['legend_algorithm'] = 'Adding an attribute value to the product';
$_['legend_inherit'] = 'Inheritance';
$_['legend_children'] = 'Trees settings';

// tools
$_['button_play']  = 'Start task';
$_['head_settings']  = 'Settings';
$_['head_command']  = 'Commands';
$_['head_status']  = 'Status';
$_['alert_warning']  = '<strong>Warning!</strong> Do not leave this page until the operation is complete.';
$_['alert_success']  = '<strong>Success!</strong> Operation has been completed.';
$_['alert_info']  = '<strong>Sorry!</strong> This feature is not implemented in this version.';
$_['alert_reload']  = '<strong>Warning!</strong> Necessarily to refresh this page to get the actual data!';
$_['alert_warning']  = '<strong>Warning!</strong> Make a backup of the database before using the tools.';
$_['message_duplicate'] = 'Processed duplicates: ';
$_['message_detached'] = 'Deleted attributes: ';
$_['message_empty'] = 'Deleted empty values: ';
$_['message_scavengery'] = 'Erroneous links were deleted: ';
$_['message_defragmentation'] = 'Ordered attributes: ';
$_['message_defragmentation_group'] = 'Ordered groups: ';