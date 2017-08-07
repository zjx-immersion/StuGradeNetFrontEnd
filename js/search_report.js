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
        404: function() { alert( 'Unauthorized' ); },
        500: function() { alert( 'Server Internal Error' ); },
        201: function() { alert( 'OK!'); }
      }).fail(function(msg){
        console.log("error:");
        console.log(msg.responseText);
      });
  }

  function feachReportFunc(){
    const dynamicData = [
      {number:"007"},
      {number: "008"}
    ];
    return $.ajax({
      contentType: "application/json",
      url: "http://localhost:8080/api/gradereports/",
      method: "POST",
      dataType: 'json',
      data: JSON.stringify(dynamicData)
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
