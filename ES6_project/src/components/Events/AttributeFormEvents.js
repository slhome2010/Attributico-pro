export default function formEvents() {
    // event handler for resize image 
    // document.getElementById('<?php echo $target; ?>').dispatchEvent(new Event('change', {bubbles: true, composed: true}));
    // in filemanager.tpl on line 58    
    $(document).on('change', 'input[id ^=\'attribute-image\']', function (e) { 
        //console.log($(this))
        //console.log(e.target)
        $.ajax({
            data: {
                'user_token': user_token,
                'token': token,
                'image': $(this).parent().find('input').val(),
                'size': 50
            },
            url: route + 'imageResize',
            success:  (resizedThumb) => { 				
				$(this).prev().find('img').attr('src', resizedThumb);				
            }
        });
    });    
}