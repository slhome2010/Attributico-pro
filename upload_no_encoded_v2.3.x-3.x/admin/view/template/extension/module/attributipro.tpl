<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
    <div class="page-header">
        <div class="container-fluid">
            <div class="pull-right">
                <a onclick="checkForUpdates(); $('#infoModal').modal('show');" class="btn btn-warning" data-toggle="tooltip" title="<?php echo $button_check_for_updates; ?>" data-placement="top"><i class="fa fa-cloud-download"></i></a>
                <a onclick="apply()" class="btn btn-success" data-toggle="tooltip" title="<?php echo $button_apply; ?>" data-placement="top"><i class="fa fa-check"></i></a>
                <a onclick="submit()" class="btn btn-primary" data-toggle="tooltip" title="<?php echo $button_save; ?>" data-placement="top"><i class="fa fa-save"></i></a>
                <a href="<?php echo $cancel; ?>" data-toggle="tooltip" data-placement="top" title="<?php echo $button_cancel; ?>" class="btn btn-default"><i class="fa fa-reply"></i></a>
            </div>
            <h1><?php echo $heading_title; ?></h1>
            <ul class="breadcrumb">
                <?php foreach ($breadcrumbs as $breadcrumb) { ?>
                    <li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
                <?php } ?>
            </ul>
        </div>
    </div>
    <div class="container-fluid">
        <div id="root"></div>
        <div id="portal"></div>
        <?php if ($error_warning) { ?>
            <div id="error_warning" class="alert alert-danger"><i class="fa fa-exclamation-circle"></i>
                <?php echo $error_warning; ?>
                <button type="button" class="close" data-dismiss="alert">&times;</button>
            </div>
        <?php } ?>
        <div id="reload" class="alert alert-danger alert-dismissible" role="alert" style="display: none"><i class="fa fa-exclamation-triangle"></i> <?php echo $alert_reload; ?>
        </div>
        <div class="panel panel-default alert-before">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-pencil"></i> <?php echo $text_edit; ?></h3>
            </div>
            <div class="panel-body">
                <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="close" data-dismiss="modal">×</button>
                                <h4 class="modal-title" id="infoModalLabel"><?php echo $entry_info_title; ?></h4>
                            </div>
                            <div class="modal-body">
                                <p id="modal-content"></p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal"><?php echo $button_close; ?></button>
                            </div>
                        </div>
                    </div>
                </div>
                <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form-attributipro" class="form-horizontal">
                    <div id="tabs">
                        <ul class="nav nav-tabs">
                            <li><a href="#tab-general" data-toggle="tab"><i class="fa fa-cog"></i>
                                    <?php echo $tab_general; ?> </a></li>
                            <li class="active"><a href="#tab-attribute" data-toggle="tab"><i class="fa fa-tree"></i>
                                    <?php echo $tab_attribute; ?> </a></li>
                            <li><a href="#tab-duty" data-toggle="tab"><i class="fa fa-database"></i>
                                    <?php echo $tab_duty; ?> </a></li>
                            <li><a href="#tab-category" data-toggle="tab"><i class="fa fa-list"></i>
                                    <?php echo $tab_category; ?></a> </li>
                            <li><a href="#tab-products" data-toggle="tab"><i class="fa fa-th"></i>
                                    <?php echo $tab_products; ?></a> </li>
                            <li><a href="#tab-tools" data-toggle="tab"><i class="fa fa-wrench"></i>
                                    <?php echo $tab_tools; ?></a> </li>
                            <li><a href="#tab-support" data-toggle="tab"><i class="fa fa-life-ring"></i>
                                    <?php echo $tab_support; ?></a> </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane" id="tab-general">
                                <div class="col-sm-3">
                                    <ul class="nav nav-tabs tabs-left" id="verticalTab">
                                        <li><a href="#tab-common" data-toggle="tab"><?php echo $settings_general ?></a></li>
                                        <li><a href="#tab-children" data-toggle="tab"><?php echo $settings_children ?></a></li>
                                        <li><a href="#tab-ct" data-toggle="tab"><?php echo $settings_category ?></a></li>
                                        <li><a href="#tab-inherit" data-toggle="tab"><?php echo $settings_inherit ?></a></li>
                                        <li><a href="#tab-method" data-toggle="tab"><?php echo $settings_algorithm ?></a></li>
                                        <li><a href="#tab-replace" data-toggle="tab"><?php echo $settings_replace ?></a></li>
                                    </ul>
                                </div>
                                <div class="col-sm-9">
                                    <div class="tab-content">
                                        <div class="tab-pane" id="tab-common">
                                            <legend><?php echo $settings_general ?></legend>
                                            <div class="form-group">
                                                <div class="row">
                                                    <label class="col-sm-4 control-label" for="input-attributipro_splitter"><?php echo $entry_splitter; ?></label>
                                                    <div class="col-sm-8">
                                                        <input type="text" name="attributipro_splitter" value="<?php echo $attributipro_splitter; ?>" class="form-control" id="input-attributipro_splitter" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <label class="col-sm-4 control-label" for="input-attributipro_sortorder"><span data-toggle="tooltip" title="<?php echo $help_sortorder; ?>"><?php echo $entry_sortorder; ?></span></label>
                                                    <div class="col-sm-8">
                                                        <div class="checkbox">
                                                            <label>
                                                                <?php if ($attributipro_sortorder) { ?>
                                                                    <input type="checkbox" name="attributipro_sortorder" value="1" checked="checked" id="input-attributipro_sortorder" />
                                                                <?php } else { ?>
                                                                    <input type="checkbox" name="attributipro_sortorder" value="1" id="input-attributipro_sortorder" />
                                                                <?php } ?>
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <label class="col-sm-4 control-label" for="input-attributipro_smart_scroll"><span data-toggle="tooltip" title="<?php echo $help_smart_scroll; ?>"><?php echo $entry_smart_scroll; ?></span></label>
                                                    <div class="col-sm-8">
                                                        <div class="checkbox">
                                                            <label>
                                                                <?php if ($attributipro_smart_scroll) { ?>
                                                                    <input type="checkbox" name="attributipro_smart_scroll" value="1" checked="checked" id="input-attributipro_smart_scroll" />
                                                                <?php } else { ?>
                                                                    <input type="checkbox" name="attributipro_smart_scroll" value="1" id="input-attributipro_smart_scroll" />
                                                                <?php } ?>
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <label class="col-sm-4 control-label" for="input-attributipro_empty"><span data-toggle="tooltip" title="<?php echo $help_empty; ?>"><?php echo $entry_empty; ?></span></label>
                                                    <div class="col-sm-8">
                                                        <div class="checkbox">
                                                            <label>
                                                                <?php if ($attributipro_empty) { ?>
                                                                    <input type="checkbox" name="attributipro_empty" value="1" checked="checked" id="input-attributipro_empty" />
                                                                <?php } else { ?>
                                                                    <input type="checkbox" name="attributipro_empty" value="1" id="input-attributipro_empty" />
                                                                <?php } ?>
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <label class="col-sm-4 control-label" for="input-attributipro_about_blank"><span data-toggle="tooltip" title="<?php echo $help_about_blank; ?>"><?php echo $entry_about_blank; ?></span></label>
                                                    <div class="col-sm-8">
                                                        <div class="checkbox">
                                                            <label>
                                                                <?php if ($attributipro_about_blank) { ?>
                                                                    <input type="checkbox" name="attributipro_about_blank" value="1" checked="checked" id="input-attributipro_about_blank" />
                                                                <?php } else { ?>
                                                                    <input type="checkbox" name="attributipro_about_blank" value="1" id="input-attributipro_about_blank" />
                                                                <?php } ?>
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <label class="col-sm-4 control-label" for="input-attributipro_lazyload"><span data-toggle="tooltip" title="<?php echo $help_lazyload; ?>"><?php echo $entry_lazyload; ?></span></label>
                                                    <div class="col-sm-8">
                                                        <div class="checkbox">
                                                            <label>
                                                                <?php if ($attributipro_lazyload) { ?>
                                                                    <input type="checkbox" name="attributipro_lazyload" value="1" checked="checked" id="input-attributipro_lazyload" />
                                                                <?php } else { ?>
                                                                    <input type="checkbox" name="attributipro_lazyload" value="1" id="input-attributipro_lazyload" />
                                                                <?php } ?>
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <label class="col-sm-4 control-label" for="input-attributipro_cache"><span data-toggle="tooltip" title="<?php echo $help_cache; ?>"><?php echo $entry_cache; ?></span></label>
                                                    <div class="col-sm-8">
                                                        <div class="checkbox">
                                                            <label>
                                                                <?php if ($attributipro_cache) { ?>
                                                                    <input type="checkbox" name="attributipro_cache" value="1" checked="checked" id="input-attributipro_cache" />
                                                                <?php } else { ?>
                                                                    <input type="checkbox" name="attributipro_cache" value="1" id="input-attributipro_cache" />
                                                                <?php } ?>
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <label class="col-sm-4 control-label" for="input-attributipro_multistore"><span data-toggle="tooltip" title="<?php echo $help_multistore; ?>"><?php echo $entry_multistore; ?></span></label>
                                                    <div class="col-sm-8">
                                                        <div class="checkbox">
                                                            <label>
                                                                <?php if ($attributipro_multistore) { ?>
                                                                    <input type="checkbox" name="attributipro_multistore" value="1" checked="checked" id="input-attributipro_multistore" />
                                                                <?php } else { ?>
                                                                    <input type="checkbox" name="attributipro_multistore" value="1" id="input-attributipro_multistore" />
                                                                <?php } ?>
                                                                &nbsp;
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab-children">
                                            <legend><?php echo $settings_children ?></legend>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $entry_attribute_groups; ?></span></label>
                                                        <div id="tree1" class="settings"></div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $tab_duty; ?></span></label>
                                                        <div id="tree2" class="settings"></div>
                                                    </div>
                                                </div>
                                                <div class="clearfix"></div>
                                                <div class="clearfix"></div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $entry_attributes; ?></span></label>
                                                        <div id="tree3" class="settings"></div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $entry_attribute_category; ?></span></label>
                                                        <div id="tree4" class="settings"></div>
                                                    </div>
                                                </div>
                                                <div class="clearfix"></div>
                                                <div class="clearfix"></div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_children; ?>"><?php echo $entry_products; ?></span></label>
                                                        <div id="tree5" class="settings"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab-ct">
                                            <legend><?php echo $settings_category ?></legend>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label class="col-sm-8 control-label" for="input-attributipro_autoadd"><span data-toggle="tooltip" title="<?php echo $help_autoattribute; ?>"><?php echo $entry_autoattribute; ?></span></label>
                                                        <div class="col-sm-4">
                                                            <div class="checkbox">
                                                                <label>
                                                                    <?php if ($attributipro_autoadd) { ?>
                                                                        <input type="checkbox" name="attributipro_autoadd" value="1" checked="checked" id="input-attributipro_autoadd" />
                                                                    <?php } else { ?>
                                                                        <input type="checkbox" name="attributipro_autoadd" value="1" id="input-attributipro_autoadd" />
                                                                    <?php } ?>
                                                                    &nbsp; </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="col-sm-8 control-label" for="input-attributipro_autodel"><span data-toggle="tooltip" title="<?php echo $help_autodel; ?>"><?php echo $entry_autodel; ?></span></label>
                                                        <div class="col-sm-4">
                                                            <div class="checkbox">
                                                                <label>
                                                                    <?php if ($attributipro_autodel) { ?>
                                                                        <input type="checkbox" name="attributipro_autodel" value="1" checked="checked" id="input-attributipro_autodel" />
                                                                    <?php } else { ?>
                                                                        <input type="checkbox" name="attributipro_autodel" value="1" id="input-attributipro_autodel" />
                                                                    <?php } ?>
                                                                    &nbsp; </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab-inherit">
                                            <legend><?php echo $settings_inherit ?></legend>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label class="col-sm-8 control-label" for="input-attributipro_autoadd_subcategory"><span data-toggle="tooltip" title="<?php echo $help_autoadd_inherit; ?>"><?php echo $entry_autoadd_inherit; ?></span></label>
                                                        <div class="col-sm-4">
                                                            <div class="checkbox">
                                                                <label>
                                                                    <?php if ($attributipro_autoadd_subcategory) { ?>
                                                                        <input type="checkbox" name="attributipro_autoadd_subcategory" value="1" checked="checked" id="input-attributipro_autoadd_subcategory" />
                                                                    <?php } else { ?>
                                                                        <input type="checkbox" name="attributipro_autoadd_subcategory" value="1" id="input-attributipro_autoadd_subcategory" />
                                                                    <?php } ?>
                                                                    &nbsp; </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="col-sm-8 control-label" for="input-attributipro_autodel_subcategory"><span data-toggle="tooltip" title="<?php echo $help_autodel_inherit; ?>"><?php echo $entry_autodel_inherit; ?></span></label>
                                                        <div class="col-sm-4">
                                                            <div class="checkbox">
                                                                <label>
                                                                    <?php if ($attributipro_autodel_subcategory) { ?>
                                                                        <input type="checkbox" name="attributipro_autodel_subcategory" value="1" checked="checked" id="input-attributipro_autodel_subcategory" />
                                                                    <?php } else { ?>
                                                                        <input type="checkbox" name="attributipro_autodel_subcategory" value="1" id="input-attributipro_autodel_subcategory" />
                                                                    <?php } ?>
                                                                    &nbsp; </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label" for="input-attributipro_multiselect"><span data-toggle="tooltip" title="<?php echo $help_multiselect; ?>"><?php echo $entry_multiselect; ?></span></label>
                                                <div class="col-sm-8">
                                                    <div class="checkbox">
                                                        <label>
                                                            <?php if ($attributipro_multiselect) { ?>
                                                                <input type="checkbox" name="attributipro_multiselect" value="1" checked="checked" id="input-attributipro_multiselect" />
                                                            <?php } else { ?>
                                                                <input type="checkbox" name="attributipro_multiselect" value="1" id="input-attributipro_multiselect" />
                                                            <?php } ?>
                                                            &nbsp; </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab-method">
                                            <legend><?php echo $settings_algorithm ?></legend>
                                            <div class="form-group">
                                                <label class="col-sm-3 control-label"><span data-toggle="tooltip" title="<?php echo $help_product_text; ?>"><?php echo $entry_attribute_values; ?></span></label>
                                                <div class="col-sm-9">
                                                    <div class="radio">
                                                        <label>
                                                            <?php if ($attributipro_product_text == 'clean') { ?>
                                                                <input type="radio" name="attributipro_product_text" value="clean" checked="checked" />
                                                                <?php echo $text_clear; ?>
                                                            <?php } else { ?>
                                                                <input type="radio" name="attributipro_product_text" value="clean" />
                                                                <?php echo $text_clear; ?>
                                                            <?php } ?>
                                                        </label>
                                                    </div>
                                                    <div class="radio">
                                                        <label>
                                                            <?php if ($attributipro_product_text == 'unchange') { ?>
                                                                <input type="radio" name="attributipro_product_text" value='unchange' checked="checked" />
                                                                <?php echo $text_keep; ?>
                                                            <?php } else { ?>
                                                                <input type="radio" name="attributipro_product_text" value='unchange' />
                                                                <?php echo $text_keep; ?>
                                                            <?php } ?>
                                                        </label>
                                                    </div>
                                                    <div class="radio">
                                                        <label>
                                                            <?php if ($attributipro_product_text == 'overwrite') { ?>
                                                                <input type="radio" name="attributipro_product_text" value='overwrite' checked="checked" />
                                                                <?php echo $text_duty; ?>
                                                            <?php } else { ?>
                                                                <input type="radio" name="attributipro_product_text" value='overwrite' />
                                                                <?php echo $text_duty; ?>
                                                            <?php } ?>
                                                        </label>
                                                    </div>
                                                    <div class="radio">
                                                        <label>
                                                            <?php if ($attributipro_product_text == 'ifempty') { ?>
                                                                <input type="radio" name="attributipro_product_text" value='ifempty' checked="checked" />
                                                                <?php echo $text_duty_only; ?>
                                                            <?php } else { ?>
                                                                <input type="radio" name="attributipro_product_text" value='ifempty' />
                                                                <?php echo $text_duty_only; ?>
                                                            <?php } ?>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab-replace">
                                            <legend><?php echo $settings_replace ?></legend>
                                            <div class="form-group">
                                                <div class="radio">
                                                    <label class="control-label">
                                                        <?php if ($attributipro_replace_mode == 'substr') { ?>
                                                            <input type="radio" name="attributipro_replace_mode" value="substr" checked="checked" />
                                                        <?php } else { ?>
                                                            <input type="radio" name="attributipro_replace_mode" value="substr" />
                                                        <?php } ?>
                                                        <span data-toggle="tooltip" title="<?php echo $help_replace_substr; ?>"><?php echo $text_replace_substr; ?>
                                                        </span>
                                                    </label>
                                                </div>
                                                <div class="radio">
                                                    <label class="control-label">
                                                        <?php if ($attributipro_replace_mode == 'match') { ?>
                                                            <input type="radio" name="attributipro_replace_mode" value="match" checked="checked" />
                                                        <?php } else { ?>
                                                            <input type="radio" name="attributipro_replace_mode" value="match" />
                                                        <?php } ?>
                                                        <span data-toggle="tooltip" title="<?php echo $help_replace_match; ?>"><?php echo $text_replace_match; ?>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane active" id="tab-attribute">
                                <ul class="nav nav-tabs" id="tab-attribute_language">
                                    <?php foreach ($languages as $language) { ?>
                                        <li><a href="#tab-attribute_language<?php echo $language['language_id']; ?>" data-toggle="tab"><img src="<?php echo $language['src']; ?>" title="<?php echo $language['name']; ?>" />
                                                <?php echo $language['name']; ?></a></li>
                                    <?php } ?>
                                </ul>
                                <div class="tab-content">
                                    <?php foreach ($languages as $language) { ?>
                                        <div class="tab-pane" id="tab-attribute_language<?php echo $language['language_id']; ?>">
                                            <div class="fancyfilter" id="tab-attribute_filter<?php echo $language['language_id']; ?>"></div>
                                            <div class="form-group">
                                                <ul id="attribute_group_tree<?php echo $language['language_id']; ?>" name="attribute_group_tree<?php echo $language['language_id']; ?>" class="filetree"></ul>
                                            </div>
                                            <div class="dialog-options" id="options_attribute_group_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab-duty">
                                <ul class="nav nav-tabs" id="tab-duty_language">
                                    <?php foreach ($languages as $language) { ?>
                                        <li><a href="#tab-duty_language<?php echo $language['language_id']; ?>" data-toggle="tab"><img src="<?php echo $language['src']; ?>" title="<?php echo $language['name']; ?>" />
                                                <?php echo $language['name']; ?></a></li>
                                    <?php } ?>
                                </ul>
                                <div class="tab-content">
                                    <?php foreach ($languages as $language) { ?>
                                        <div class="tab-pane" id="tab-duty_language<?php echo $language['language_id']; ?>">
                                            <div class="fancyfilter" id="tab-duty_filter<?php echo $language['language_id']; ?>"></div>
                                            <div class="form-group">
                                                <ul id="duty_attribute_tree<?php echo $language['language_id']; ?>" name="duty_attribute_tree<?php echo $language['language_id']; ?>" class="filetree"></ul>
                                            </div>
                                            <div class="dialog-options" id="options_duty_attribute_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab-category">
                                <ul class="nav nav-tabs" id="tab-category_language">
                                    <?php foreach ($languages as $language) { ?>
                                        <li><a href="#tab-category_language<?php echo $language['language_id']; ?>" data-toggle="tab"><img src="<?php echo $language['src']; ?>" title="<?php echo $language['name']; ?>" />
                                                <?php echo $language['name']; ?></a></li>
                                    <?php } ?>
                                </ul>
                                <div class="tab-content">
                                    <?php foreach ($languages as $language) { ?>
                                        <div class="tab-pane" id="tab-category_language<?php echo $language['language_id']; ?>">
                                            <div class="fancyfilter" id="tab-category_filter<?php echo $language['language_id']; ?>"></div>
                                            <div class="table-responsive">
                                                <table class="table table-striped table-bordered">
                                                    <thead>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td class="left" style="width: 50%;">
                                                                <div id="category_tree<?php echo $language['language_id']; ?>" name="category_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                                                <div class="dialog-options" id="options_category_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                                            </td>
                                                            <td class="left">
                                                                <div id="category_attribute_tree<?php echo $language['language_id']; ?>" name="category_attribute_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                                                <div class="dialog-options" id="options_category_attribute_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="table-responsive">
                                                <table class="table table-striped table-bordered">
                                                    <thead>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td class="left" style="width: 50%;">
                                                                <div id="attribute_tree<?php echo $language['language_id']; ?>" name="attribute_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                                                <div class="dialog-options" id="options_attribute_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab-products">
                                <ul class="nav nav-tabs" id="tab-products_language">
                                    <?php foreach ($languages as $language) { ?>
                                        <li><a href="#tab-products_language<?php echo $language['language_id']; ?>" data-toggle="tab"><img src="<?php echo $language['src']; ?>" title="<?php echo $language['name']; ?>" />
                                                <?php echo $language['name']; ?></a></li>
                                    <?php } ?>
                                </ul>
                                <div class="tab-content">
                                    <?php foreach ($languages as $language) { ?>
                                        <div class="tab-pane" id="tab-products_language<?php echo $language['language_id']; ?>">
                                            <div class="fancyfilter" id="tab-products_filter<?php echo $language['language_id']; ?>"></div>
                                            <div class="table-responsive">
                                                <table class="table table-striped table-bordered">
                                                    <thead>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td class="left" style="width: 50%;">
                                                                <div id="attribute_product_tree<?php echo $language['language_id']; ?>" name="attribute_product_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                                                <div class="dialog-options" id="options_attribute_product_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                                            </td>
                                                            <td class="left">
                                                                <div id="product_tree<?php echo $language['language_id']; ?>" name="product_tree<?php echo $language['language_id']; ?>" class="filetree"></div>
                                                                <div class="dialog-options" id="options_product_tree<?php echo $language['language_id']; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab-tools">
                                <div class="row">
                                    <div class="col-lg-2 col-md-3" id="column-1">
                                        <ul class="nav nav-pills nav-stacked">
                                            <li class="active"><a href="#tab-empty" data-toggle="pill"> <?php echo $tab_empty; ?> </a></li>
                                            <li><a href="#tab-scavengery" data-toggle="pill"> <?php echo $tab_scavengery; ?> </a></li>
                                            <li><a href="#tab-defrag" data-toggle="pill"> <?php echo $tab_defrag; ?></a></li>
                                            <li><a href="#tab-sorting" data-toggle="pill"><?php echo $tab_sorting; ?> </a></li>
                                            <li><a href="#tab-detached" data-toggle="pill"> <?php echo $tab_detached; ?></a></li>
                                            <li><a href="#tab-deduplicate" data-toggle="pill"><?php echo $tab_deduplicate; ?> </a></li>
                                            <li><a href="#tab-category-attributes" data-toggle="pill"><?php echo $tab_category_attributes; ?> </a></li>
                                            <li><a href="#tab-cache" data-toggle="pill"> <?php echo $tab_cache; ?> </a></li>
                                            <li><a href="#tab-standart" data-toggle="pill"> <?php echo $tab_standart; ?></a></li>
                                        </ul>
                                    </div>
                                    <hr class="hidden-lg hidden-md">
                                    <div class="col-lg-10 col-md-9" style="border-left: 1px solid #eee;" id="column-2">
                                        <div class="alert alert-danger" role="alert"> <?php echo $alert_backup; ?>
                                        </div>
                                        <div class="tab-content">
                                            <div class="tab-pane active" id="tab-empty">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><?php echo $head_settings; ?></th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th style="text-align: center;">
                                                                    <?php echo $help_nosettings; ?> </th>
                                                                <td><button type="button" onclick=" return tools('empty')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button>
                                                                </td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab-scavengery">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><?php echo $head_settings; ?></th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th style="text-align: center;">
                                                                    <?php echo $help_nosettings; ?> </th>
                                                                <td><button type="button" onclick=" return tools('scavengery')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button></td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab-defrag">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_defrag_options; ?>"><?php echo $head_settings; ?></span></label>
                                                                </th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div class="options">
                                                                        <label class="checkbox-inline" for="tab-defrag-group">
                                                                            <input type="checkbox" name="tab-defrag-group" id="tab-defrag-group" checked="checked">
                                                                            <?php echo $entry_attribute_groups; ?>
                                                                        </label>
                                                                        <label class="checkbox-inline" for="tab-defrag-attribute">
                                                                            <input type="checkbox" name="tab-defrag-attribute" id="tab-defrag-attribute" checked="checked">
                                                                            <?php echo $entry_attributes; ?>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td><button type="button" onclick=" return tools('defrag')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button></td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab-sorting">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><?php echo $head_settings; ?></th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th style="text-align: center;">
                                                                    <?php echo $help_nosettings; ?> </th>
                                                                <td><button type="button" onclick=" return tools('sorting')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button></td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab-detached">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_group_options; ?>"><?php echo $head_settings; ?></span></label>
                                                                </th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div id="detach_tree<?php echo $config_language; ?>" name="detach_tree<?php echo $config_language; ?>" class="options"></div>
                                                                    <div class="dialog-options" id="options_detach_tree<?php echo $config_language; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                                                </td>
                                                                <td><button type="button" onclick=" return tools('detached')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button></td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab-deduplicate">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_group_options; ?>"><?php echo $head_settings; ?></span></label>
                                                                </th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div id="deduplicate_tree<?php echo $config_language; ?>" name="deduplicate_tree<?php echo $config_language; ?>" class="options"></div>
                                                                    <div class="dialog-options" id="options_deduplicate_tree<?php echo $config_language; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                                                </td>
                                                                <td><button type="button" onclick=" return tools('deduplicate')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button></td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="task-complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /> </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab-category-attributes">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_categories_options; ?>"><?php echo $head_settings; ?></span></label>
                                                                </th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div class="options">
                                                                        <label class="checkbox-inline" for="tab-create-categories">
                                                                            <input type="checkbox" name="tab-create-categories" id="tab-create-categories" checked="checked">
                                                                            <?php echo $entry_create_categories; ?>
                                                                        </label>
                                                                        <label class="checkbox-inline" for="tab-inject-to-products">
                                                                            <input type="checkbox" name="tab-inject-to-products" id="tab-inject-to-products" checked="checked">
                                                                            <?php echo $entry_inject_to_products; ?>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            <tr>
                                                                <td>
                                                                    <div id="category_check_tree<?php echo $config_language; ?>" name="category_check_tree<?php echo $config_language; ?>" class="options"></div>
                                                                    <div class="dialog-options" id="options_category_check_tree<?php echo $config_language; ?>" title="<?php echo $text_Options[$language['language_id']]; ?>"></div>
                                                                </td>
                                                                <td><button type="button" onclick=" return tools('createcategory')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button></td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="task-complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /> </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab-cache">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><?php echo $head_settings; ?></th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th style="text-align: center;">
                                                                    <?php echo $help_nosettings; ?> </th>
                                                                <td><button type="button" onclick=" return tools('cache')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button>
                                                                </td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab-standart">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><label class="control-label"><span><?php echo $head_settings; ?></span></label>
                                                                </th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div class="options">
                                                                        <div>
                                                                            <label class="control-label"><span data-toggle="tooltip" title="<?php echo $help_clone_options; ?>"><?php echo $head_clone; ?></span></label>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="col-sm-6">
                                                                                <label class="checkbox-inline" for="clone-language-group">
                                                                                    <input type="checkbox" name="clone-language-group" id="clone-language-group" value="group" checked="checked">
                                                                                    <?php echo $entry_groups; ?>
                                                                                </label>
                                                                                <label class="checkbox-inline" for="clone-language-attribute">
                                                                                    <input type="checkbox" name="clone-language-attribute" id="clone-language-attribute" value="attribute" checked="checked">
                                                                                    <?php echo $entry_attributes; ?>
                                                                                </label>
                                                                                <label class="checkbox-inline" for="clone-language-value">
                                                                                    <input type="checkbox" name="clone-language-value" id="clone-language-value" value="value" checked="checked">
                                                                                    <?php echo $entry_values; ?>
                                                                                </label>
                                                                                <label class="checkbox-inline" for="clone-language-duty">
                                                                                    <input type="checkbox" name="clone-language-duty" id="clone-language-duty" value="duty" checked="checked">
                                                                                    <?php echo $entry_duties; ?>
                                                                                </label>
                                                                            </div>
                                                                            <div class="col-sm-6">
                                                                                <label class="radio-inline">
                                                                                    <input type="radio" name="clone-language-mode" value="insert" checked="checked" />
                                                                                    <?php echo $text_insert; ?>
                                                                                </label>
                                                                                <label class="radio-inline">
                                                                                    <input type="radio" name="clone-language-mode" value="overwrite" />
                                                                                    <?php echo $text_overwrite; ?>
                                                                                </label>
                                                                                <label class="radio-inline">
                                                                                    <input type="radio" name="clone-language-mode" value="overifempty" />
                                                                                    <?php echo $text_overwrite_if_empty; ?>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <div class="col-sm-6">
                                                                                <label class="control-label" for="clone-language-source"><?php echo $entry_from; ?></label>
                                                                                <select name="clone-language-source" id="clone-language-source" class="form-control">
                                                                                    <?php foreach ($languages as $language) { ?>
                                                                                        <?php if ($language['language_id'] == $config_language) { ?>
                                                                                            <option value="<?php echo $language['language_id']; ?>" selected="selected"><?php echo $language['name']; ?></option>
                                                                                        <?php } else { ?>
                                                                                            <option value="<?php echo $language['language_id']; ?>"><?php echo $language['name']; ?></option>
                                                                                        <?php } ?>
                                                                                    <?php } ?>
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-sm-6">
                                                                                <label class="control-label" for="clone-language-target"><?php echo $entry_to; ?></label>
                                                                                <select name="clone-language-target" id="clone-language-target" class="form-control">
                                                                                    <?php foreach ($languages as $language) { ?>
                                                                                        <?php if ($language['language_id'] == $config_language) { ?>
                                                                                            <option value="<?php echo $language['language_id']; ?>" selected="selected"><?php echo $language['name']; ?></option>
                                                                                        <?php } else { ?>
                                                                                            <option value="<?php echo $language['language_id']; ?>"><?php echo $language['name']; ?></option>
                                                                                        <?php } ?>
                                                                                    <?php } ?>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td><button type="button" onclick=" return tools('clone')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button></td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="alert alert-info" role="alert"> <?php echo $alert_info; ?></div>
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <colgroup>
                                                            <col class="col-xs-12 col-md-10">
                                                            <col class="col-xs-4 col-md-1">
                                                            <col class="col-xs-4 col-md-1">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><label class="control-label"><span><?php echo $head_settings; ?></span></label>
                                                                </th>
                                                                <th><?php echo $head_command; ?></th>
                                                                <th><?php echo $head_status; ?></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <label class="control-label" for="input-unit"><span data-toggle="tooltip" title="<?php echo $help_unit; ?>"><?php echo $label_unit; ?></span></label>
                                                                        <select name="unit_id" id="input-unit" class="form-control">
                                                                            <?php foreach ($units as $unit) { ?>
                                                                                <option value="<?php echo $unit['value']; ?>"><?php echo $unit['title']; ?></option>
                                                                            <?php } ?>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button type="button" onclick=" return tools('clone')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-warning"><i class="fa fa-play"></i></button>
                                                                </td>
                                                                <td>
                                                                    <div class="ajax-loader"><img class="loader-img" src="view/javascript/fancytree/skin-win7/loading.gif" style="display:none;" /></div>
                                                                    <div class="task-complete"><img class="complete-img" src="view/javascript/fancytree/skin-custom/accept.png" style="display:none;" /></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="alert alert-warning" role="alert" style="display: none">
                                                    <?php echo $alert_warning; ?> </div>
                                                <div class="alert alert-success alert-dismissible" role="alert" style="display: none">
                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                    <?php echo $alert_success; ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tab-support">
                                        <div class="table-responsive">
                                            <?php echo $text_help1; ?>
                                        </div>
                                        <div class="table-responsive">
                                            <?php echo $text_help2; ?>
                                        </div>
                                        <div class="form-group">
                                            <?php echo $text_support; ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    const ATTRIBUTE_GROUP_TREE = $('[name ^= "attribute_group_tree"]');
    const config_language = '<?php echo $config_language; ?>';
    const token = '<?php echo $token; ?>';
    const user_token = '<?php echo $user_token; ?>';
    const extension = '<?php echo $extension; ?>'; //TODO deprecated для v2.3 другая структура каталогов
    const route = '<?php echo $route; ?>'; // для v1.5 другая функция входа в товар 
    const edit = '<?php echo $edit; ?>'; //TODO deprecated для v1.5 другая функция входа в товар   
    const textConfirm = <?php echo json_encode($text_confirm) ?>;
    const FILTERSETTINGS = <?php echo json_encode($filter_settings) ?>;

    let filterLabels = [];
    let contextmenuConfig = [];
    let dialogItems = [];

    ATTRIBUTE_GROUP_TREE.each(function(indx, element) {
        let lng_id = parseInt(element.id.replace(/\D+/ig, ''));
        contextmenuConfig[lng_id] = [{
                title: <?php echo json_encode($text_Edit) ?>[lng_id] + "<kbd>[Shift+Click]</kbd>",
                cmd: "rename",
                uiIcon: "ui-icon-pencil"
            },
            {
                title: <?php echo json_encode($text_Delete) ?>[lng_id] + "<kbd>[Del]</kbd>",
                cmd: "remove",
                uiIcon: "ui-icon-trash"
            },
            {
                title: <?php echo json_encode($text_Cut) ?>[lng_id] + "<kbd>[Ctrl+X]</kbd>",
                cmd: "cut",
                uiIcon: "ui-icon-scissors",
                disabled: true
            },
            {
                title: <?php echo json_encode($text_Copy) ?>[lng_id] + "<kbd>[Ctrl+C]</kbd>",
                cmd: "copy",
                uiIcon: "ui-icon-copy",
                disabled: true
            },
            {
                title: <?php echo json_encode($text_Paste) ?>[lng_id] + "<kbd>[Ctrl+V]</kbd>",
                cmd: "paste",
                uiIcon: "ui-icon-clipboard",
                disabled: true
            },
            {
                title: <?php echo json_encode($text_Merge) ?>[lng_id] + "<kbd>[Alt+V]</kbd>",
                cmd: "merge",
                uiIcon: "ui-icon-link",
                disabled: true
            },
            {
                title: <?php echo json_encode($entry_clone) ?>[lng_id] + "<kbd>[Alt+C]</kbd>",
                cmd: "clone",
                uiIcon: "ui-icon-seek-next",
                disabled: true
            },
            {
                title: "----"
            },
            {
                title: <?php echo json_encode($text_Expande) ?>[lng_id] + "<kbd>[Ctrl+B]</kbd>",
                cmd: "expande",
                uiIcon: "ui-icon-folder-open"
            },
            {
                title: <?php echo json_encode($text_Refresh) ?>[lng_id] + "<kbd>[Shift+R]</kbd>",
                cmd: "refresh",
                uiIcon: "ui-icon-refresh"
            },
            {
                title: "----"
            },
            {
                title: <?php echo json_encode($text_Options) ?>[lng_id],
                cmd: "options",
                uiIcon: "ui-icon-gear"
            },
            {
                title: "----"
            },
            {
                title: <?php echo json_encode($text_New_group) ?>[lng_id] + "<kbd>[Ctrl+M]</kbd>",
                cmd: "addSibling",
                uiIcon: "ui-icon-plusthick"
            },
            {
                title: <?php echo json_encode($text_New_attribute) ?>[lng_id] + "<kbd>[Ctrl+Q]</kbd>",
                cmd: "addChild",
                uiIcon: "ui-icon-plus"
            }
        ];

        filterLabels[lng_id] = {
            title: <?php echo json_encode($text_filter) ?>[lng_id],
            button: <?php echo json_encode($button_filter_action) ?>[lng_id],
            checkbox: {
                autoComplete: <?php echo json_encode($text_autoComplete) ?>[lng_id],
                attributesOnly: <?php echo json_encode($text_Attributes_only) ?>[lng_id],
                leavesOnly: <?php echo json_encode($text_Leaves_only) ?>[lng_id],
            },
            spancheckbox: {
                hideMode: <?php echo json_encode($text_Hide_unmatched_nodes) ?>[lng_id],
                autoExpand: <?php echo json_encode($text_Auto_expand) ?>[lng_id],
                counter: <?php echo json_encode($text_Counter_badges) ?>[lng_id],
                hideExpandedCounter: <?php echo json_encode($text_hideExpandedCounter) ?>[lng_id],
                highlight: <?php echo json_encode($text_Highlight) ?>[lng_id],
                fuzzy: <?php echo json_encode($text_Fuzzy) ?>[lng_id],
                regex: <?php echo json_encode($text_Regular_expression) ?>[lng_id],
            },
            dropdown: {
                empty: <?php echo json_encode($f_empty) ?>[lng_id],
                digital: <?php echo json_encode($f_digital) ?>[lng_id],
                html: <?php echo json_encode($f_html) ?>[lng_id],
                default: <?php echo json_encode($f_default) ?>[lng_id],
            }
        };

        dialogItems[lng_id] = {
            sortorder: {
                label: <?php echo json_encode($text_sortOrder) ?>[lng_id],
                selector: 'sortOrder',
                state: '<?php echo $attributipro_sortorder; ?>'
            },
            lazyload: {
                label: <?php echo json_encode($text_lazyLoad) ?>[lng_id],
                selector: 'lazyLoad',
                state: '<?php echo $attributipro_lazyload; ?>'
            },
            autocollapse: {
                label: <?php echo json_encode($text_autoCollapse) ?>[lng_id],
                selector: 'autoCollapse',
                state: '1'
            },
            hierarchy: {
                label: <?php echo json_encode($text_multiSelect) ?>[lng_id],
                selector: 'multiSelect',
                state: '<?php echo $attributipro_multiselect; ?>'
            },
            divergency: {
                label: <?php echo json_encode($text_Diver) ?>[lng_id],
                selector: 'diver',
                state: '0'
            }
        };
    });

    $("[data-toggle='tooltip']").tooltip();
</script>
<script type="text/javascript">
    $('#tab-attribute_language a:first').tab('show');
    $('#tab-category_language a:first').tab('show');
    $('#tab-duty_language a:first').tab('show');
    $('#tab-products_language a:first').tab('show');
    $('#verticalTab a:first').tab('show');
</script>
<?php echo $footer; ?>