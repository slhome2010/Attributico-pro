<div id="tabs-standart">
    <ul class="nav nav-tabs">
        <li><a href="#tab-clone" data-toggle="tab"><i class="fa fa-cog"></i>
                <?php echo $head_clone; ?> </a></li>
        <li class="active"><a href="#tab-unit" data-toggle="tab"><i class="fa fa-tree"></i>
                <?php echo $tab_attribute; ?> </a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane" id="tab-clone">
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
        </div>
        <div class="tab-pane" id="tab-unit">
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
                                <div class="btn-group-vertical" role="group" aria-label="Unit tools">
                                    <button type="button" onclick="addAttribute();" data-toggle="tooltip" title="<?php echo $button_attribute_add; ?>" class="btn btn-primary"><i class="fa fa-pencil"></i></button>
                                    <button type="button" onclick=" return tools('clone')" data-toggle="tooltip" title="<?php echo $button_play; ?>" class="btn btn-success"><i class="fa fa-plus-circle"></i></button>
                                    <button type="button" onclick=" $('#attribute-row<?php echo $attribute_row; ?>').remove();" data-toggle="tooltip" title="<?php echo $button_remove; ?>" class="btn btn-danger"><i class="fa fa-minus-circle"></i></button>
                                </div>
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
    </div>
    <div class="alert alert-info" role="alert"> <?php echo $alert_info; ?></div>
    <div class="alert alert-warning" role="alert" style="display: none">
        <?php echo $alert_warning; ?> </div>
    <div class="alert alert-success alert-dismissible" role="alert" style="display: none">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <?php echo $alert_success; ?>
    </div>
</div>


