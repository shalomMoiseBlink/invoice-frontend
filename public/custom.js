$(function () {
    var formID = $('form').attr('id');
    var $form = $('#' + formID);

    var auto = {
        autoSetup: true,
        autoSubmit: true,
        submitOnEnter: true,
        nativeEvents: true
    };
    try {
        var hf = $form.hostedForm(auto);
    } catch (e) {
        //Add your exception handling code here
        console.log("error here", e)
    }
    $('input[type=submit]').val('Charge');
});