$(function(){

  reloadInitData("");
  let selectedStudent={};

  $.showModal = function(number, name) {
    // selectedStudent= selectedStu;
    selectedStudent = {number: number, name: name}
    $('#grade-modal-title').html(selectedStudent.name)
    $('#myModal').modal('show')
    console.log(number + name);
  }

  function reloadInitData(){
      const students = searchStudents("");
      if (!students){
        return;
      }
      rederTable(students);
  }

  function rederTable(students){
    $("#studentsTableTemplate").template("studentsTable");
    const table=$.tmpl("studentsTable", {students: students});
    $("#search-stu-list").html(table);
  }

  function searchStudents(keyWords) {
    feachStudentsFunc(keyWords).done(function(students, status){
      console.log(students);
      console.log("status:" + status);
      if (!students){
        return;
      }
      rederTable(students);
    }).statusCode({
      400: function() { console.log( 'searchStudents Input is wrong!' ); },
      500: function() { console.log( 'searchStudents Server Internal Error' ); },
      201: function() { console.log( 'searchStudents OK!'); }
    }).fail(function(msg){
      console.log("error:");
      console.log(msg.responseText);
    });
  }

  function feachStudentsFunc(keyWords){
    return $.ajax({
      contentType: "application/json",
      url: "http://localhost:8080/api/students/" + keyWords,
      method: "GET",
      dataType: 'json'
    });
  }
  registerSearchEvent("idSearcher");
  registerSearchEvent("nameSearcher");

  function registerSearchEvent(idOfButton){
    $("#"+ idOfButton).click(function(){
      let id = $("#" + idOfButton +"Txt").val();
      console.log(id);
      const students = searchStudents(id);
      rederTable(students);
    })
  }

  function modalSubmit() {
    const form = $("#grade-form");
    const gradesForm = form.serializeArray();
    const grade = {};
    gradesForm.forEach(obj => grade[obj.name] = obj.value);
    console.log(JSON.stringify(grade) + "----");
    saveGrades(selectedStudent.number, grade).done(function(grades, status){
      console.log(grade);
      console.log("status:" + status);
      alert("Add Success!")
    }).statusCode({
      400: function() { console.log( 'searchStudents Input is wrong!' ); },
      500: function() { console.log( 'searchStudents Server Internal Error' ); },
      201: function() { console.log( 'searchStudents OK!'); }
    }).fail(function(msg){
      console.log("error:");
      console.log(msg.responseText);
    });
    event.preventDefault();
  }

  function saveGrades(stuNumber, grades){
    return $.ajax({
      contentType: "application/json",
      url: `http://localhost:8080/api/students/${stuNumber}/grades`,
      method: "POST",
      dataType: 'json',
      data: JSON.stringify(grades)
    });
  }

  $("#grade-form").validate({

   rules: {
     mathsScore: "required",
     chineseScore: "required",
     englishScore: "required",
     programScore: "required"
   },
   messages: {
     mathsScore: "Please enter your name",
     chineseScore: "Please enter your age",
     englishScore: "Please enter your number",
     programScore: "Please enter your phone"
   },
   submitHandler: function(form) {
     modalSubmit();
   }
 });

})
