
(function ($, window, undefined) {

  $(function () {
    var
    $form   = $('.nodeForm'),
    $submit = $('.submit'),
    $reset  = $('.reset');

    $submit.on('click', function (e) {
      e.preventDefault();

      var
      serialisedForm = $form.serializeArray(),
      data           = getFormData(serialisedForm);

      if (formIsValid(data)) {
        $.ajax({
          url      : '/save',
          type     : 'POST',
          dataType : 'json',
          data     : data,
          success  : function(data, textStatus, xhr) {
            console.log(data.firstname);
            console.log(data.lastname);
            console.log(data.email);
            console.log(data.password);
          },
          error    : function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
            console.log(textStatus);
          }
        });
      }
      else {
        console.log('invalid');
      }

    });

    $reset.on('click', function (e) {
      e.preventDefault();
      $form
        .find('input[type="text"], input[type="password"]')
        .val('');
    });

  });

  function getFormData (formArray) {
      var data = {};
      $.map(formArray, function(item, i){
        data[item['name']] = item['value'];
      });
      return data;
  }

  function formIsValid(data) {
    // form validation goes here
    return true;
  }

}(jQuery, window));
