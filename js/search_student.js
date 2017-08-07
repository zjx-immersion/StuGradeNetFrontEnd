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
    const studentList =JSON.parse(localStorage.getItem("students"));
    return studentList
    .filter(stu => stu.name.includes(keyWords) || stu.id.includes(keyWords))
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
