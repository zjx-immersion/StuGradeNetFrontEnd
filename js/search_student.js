$(function(){

  reloadInitData("");

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

})
