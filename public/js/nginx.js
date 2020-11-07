$(document ).ready(function() {
  $('.uploadButton').on('click', function() {
    $('#uploadFile').trigger('click');
  });
  $('#uploadFile').change(function() {
    $('#uploadForm').submit();
  });
});