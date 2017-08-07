$(function() {

  const dbKey = "students";
  function submit() {
    const studentDB =JSON.parse(localStorage.getItem(dbKey)) || [];
    const form = $("#studentform");
    const formData = form.serializeArray();
    const student = {};
    formData.forEach(obj => student[obj.name] = obj.value);
    student.id = Math.random().toString(36).substr(2, 9);
    studentDB.push(student);
    localStorage.setItem("students", JSON.stringify(studentDB));

    $("#successLabel").fadeToggle(3000, function(){
      $(this).hide();
      form.trigger("reset");
    });

    event.preventDefault();
  };

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
