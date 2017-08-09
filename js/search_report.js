$(function(){

  reloadInitData();

  function reloadInitData(){

      feachReportFunc().done(function(gradeReport, status){
        console.log(gradeReport);
        console.log("status:" + status);
        if (!gradeReport){
          return;
        }
        rederTable(gradeReport);
      }).statusCode({
        400: function() { console.log( 'gradeReport Input is wrong!' ); },
        500: function() { console.log( 'gradeReport Server Internal Error' ); },
        201: function() { console.log( 'gradeReport OK!'); }
      }).fail(function(msg){
        console.log("error:");
        console.log(msg.responseText);
      });
  }

  function feachReportFunc(){
    return $.ajax({
      contentType: "application/json",
      url: "http://localhost:8080/api/defaultgradereports/",
      method: "POST",
      dataType: 'json'
    });
  }

  function rederTable(gradeReport){
    // console.log(gradeReport);
    $("#gradeReportTemplate").template("gradeReport");
    const table=$.tmpl("gradeReport", gradeReport);
    $("#studentGradeReport").html(table);
  }

  function registerSearchEvent(idOfButton){
    $("#"+ idOfButton).click(function(){
      let id = $("#" + idOfButton +"Txt").val();
      console.log(id);
      const students = searchStudents(id);
      rederTable(students);
    })
  }

})
