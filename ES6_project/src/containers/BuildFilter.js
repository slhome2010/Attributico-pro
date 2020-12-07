/* bild filter widget and add it to table */
export default function buildFilter() {
    let id = $(this).attr('id');
    let lng_id = parseInt(id.replace(/\D+/ig, ''));
    let tab = id.split('_')[0];
    let checkbox = filterLabels[lng_id].checkbox;
    let spancheckbox = filterLabels[lng_id].spancheckbox;
    let dropdown = filterLabels[lng_id].dropdown;
    let widget = tab + "_filterwidget" + lng_id;

    // create open/close triangle
    let hideFilter = "fs_" + tab + "_hideFilter" + lng_id;
    $('<label>', {
        class: 'checkbox-inline pull-right clearfix ',
        style: "float:right;",
        for: hideFilter,
        append: $('<input>', {
            type: "checkbox",
            class: "hide",
            name: hideFilter,
            id: hideFilter,
            checked: $.inArray(hideFilter, FILTERSETTINGS) + 1 ? true : false,
            'data-toggle': "collapse",
            'data-target': "#" + widget
        }).add($('<i>', {
            class: "fa fa-angle-double-down fa-lg",
            'aria-hidden': "true"
        }))
    }).appendTo(this);

    //create filter form
    let open = $.inArray(hideFilter, FILTERSETTINGS) + 1 ? 'in' : '';
    let form = $('<div>', {
        class: 'form-group form-inline collapse ' + open,
        id: widget
    });
    form.appendTo(this);
    // create input & buttons
    let search = tab + "_search" + lng_id;
    let btnSearch = tab + "_btnSearch" + lng_id;
    let btnResetSearch = tab + "_btnResetSearch" + lng_id;
    $('<label>', {
        for: search,
        text: filterLabels[lng_id].title,
        style: "margin-left:1px;"
    }).appendTo(form);
    $('<input>', {
        type: "text",
        name: search,
        placeholder: "Filter...",
        class: "form-control",
        id: search,
        style: "margin-left:1px;"
    }).appendTo(form);
    $('<button>', {
        id: btnResetSearch,
        type: "button",
        class: "btn btn-default button",
        value: 'S',
        append: $('<i>', {
            class: "fa fa-times",
            'aria-hidden': "true"
        }),
        style: "margin-left:1px;"
    }).appendTo(form);
    $('<button>', {
        id: btnSearch,
        type: "button",
        class: "btn btn-default button",
        value: 'R',
        append: $('<i>', {
            class: "fa fa-search",
            'aria-hidden': "true"
        }),
        style: "margin-left:1px;"
    }).appendTo(form);
    // create dropdown menu
    let dropdownmenu = $('<div>', {
        class: "btn-group dropdown-events",
        style: 'display: inline-block;'
    });
    dropdownmenu.appendTo(form);
    $('<button>', {
        type: "button",
        class: "btn btn-default dropdown-toggle",
        'data-toggle': "dropdown",
        'aria-haspopup': "true",
        'aria-expanded': "false",
        text: filterLabels[lng_id].button,
        append: $('<span>', {
            class: "caret"
        }),
        style: "margin-left:1px;"
    }).appendTo(dropdownmenu);
    let ul = $('<ul>', {
        class: "dropdown-menu drop-menu"
    });
    ul.appendTo(dropdownmenu);
    for (var key in dropdown) {
        let li = $('<li>').appendTo(ul);

        $('<a>', {
            id: "f_" + tab + lng_id + "_" + key,
            href: "#",
            //onclick: "return FilterAction(this,"+lng_id+",'tab-attribute');",
            text: dropdown[key]
        }).appendTo(li);
    }
    // create matches counter
    $('<span>', {
        id: tab + "_matches" + lng_id,
        class: "badge"
    }).appendTo(form);
    // create fistline checkboxes
    for (var key in checkbox) {
        let itemId = "fs_" + tab + "_" + key + lng_id;
        $('<input>', {
            type: "checkbox",
            name: itemId,
            id: itemId,
            checked: $.inArray(itemId, FILTERSETTINGS) + 1 ? true : false,
            style: "margin-left:1rem;"
        }).appendTo(form);

        $('<label>', {
            for: itemId,
            //class: "checkbox-inline",
            style: "padding-top:0px; margin-left:1px; font-weight:normal;",
            text: checkbox[key]
        }).appendTo(form);
    }
    // create loader gif
    $('<div>', {
        class: 'ajax-loader',
        append: $('<img>', {
            src: "view/javascript/fancytree/skin-win7/loading.gif",
            id: "loadImg" + lng_id,
            style: "z-index:1000; display:none;"
        })
    }).appendTo(form);
    // create secondline checkboxes
    let span = $('<div>', {
        id: tab + "_searchmode" + lng_id,
        style: "margin-top:1em;"
    });
    span.appendTo(form);

    for (var key in spancheckbox) {
        let spanId = "fs_" + tab + "_" + key + lng_id;
        $('<input>', {
            type: "checkbox",
            name: spanId,
            id: spanId,
            checked: $.inArray(spanId, FILTERSETTINGS) + 1 ? true : false,
            style: "margin-left:1rem;"
        }).appendTo(span);

        $('<label>', {
            for: spanId,
            //class: "checkbox-inline",
            style: "padding-top:0px; margin-left:1px; font-weight:normal;",
            text: spancheckbox[key]
        }).appendTo(span);
    }
}