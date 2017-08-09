$(function() {

  const dbKey = "students";
  function submit() {
    const studentDB =JSON.parse(localStorage.getItem(dbKey)) || [];
    const form = $("#studentform");
    const formData = form.serializeArray();
    const student = {};
    formData.forEach(obj => student[obj.name] = obj.value);
    student.number = Math.random().toString(36).substr(2, 9);
    saveStudent(student).done(function(){
      $("#successLabel").fadeToggle(3000, function(){
        $(this).hide();
        form.trigger("reset");
      });
    }).statusCode({
      400: function() { console.log( 'saveStudent Wrong Api Call' ); },
      500: function() { console.log( 'saveStudent Server Internal Error' ); },
      201: function() { console.log( 'saveStudent OK!'); }
    }).fail(function(){
      alert("Please submit again!")
    });
    event.preventDefault();
  };

  function saveStudent(student){
    return $.ajax({
      contentType: "application/json",
      url: "http://localhost:8080/api/students/",
      method: "POST",
      dataType: 'json',
      data: JSON.stringify(student)
    });
  }

  $("#studentform").validate({

   rules: {
     // The key name on the left side is the name attribute
     // of an input field. Validation rules are defined
     // on the right side
     name: "required",
     age: "required",
     class: "required",
     phone: "required",
     email: {
       required: true,
       // Specify that email should be validated
       // by the built-in "email" rule
       email: true
     }
   },
   // Specify validation error messages
   messages: {
     name: "Please enter your name",
     age: "Please enter your age",
     class: "Please enter your number",
     phone: "Please enter your phone",
     password: {
       required: "Please provide a password",
       minlength: "Your password must be at least 5 characters long"
     }
   },
   // Make sure the form is submitted to the destination defined
   // in the "action" attribute of the form when valid
   submitHandler: function(form) {
     submit();
   }
 });
})
