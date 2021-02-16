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
                    <div class="form-group">
                        <label class="control-label" for="input-unit"><?php echo $label_unit; ?></label>
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
</div>