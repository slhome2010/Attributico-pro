/* Service functions */
export function dutyUpgrade() {
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
        },
        url: 'index.php?route=' + extension + 'module/attributico/dutyUpgrade',
        //  async: false,
        success: function () {
            location.reload();
        }
    });
}
/**
 * Form buttons onclick events
 *
 **/
export function checkForUpdates() {
    $.ajax({
        data: {
            'user_token': user_token,
            'token': token,
        },
        url: 'index.php?route=' + extension + 'module/attributico/check_for_updates',
        dataType: 'json',
        success: function (check) {
           /*  $('#infoModal').modal('show'); */
            if (check.errno) {
                console.log(check);
                $('#infoModal #modal-content').html(check.errmsg);
            } else {
                if (!check.compare) {
                    $('#infoModal #modal-content').html(check.content.news);
                    $('#infoModal #modal-content').append(check.content.links);
                    $('#infoModal #modal-content').append(check.content.copyright);
                } else {
                    $('#infoModal #modal-content').html(check.content.well);
                    $('#infoModal #modal-content').append(check.content.copyright);
                }
            }
        }
    });
}