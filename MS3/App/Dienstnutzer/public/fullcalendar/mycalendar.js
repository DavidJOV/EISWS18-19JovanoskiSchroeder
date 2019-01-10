$(document).ready(function() {
   var url = "http://localhost:3000/Dienstplaene/"+getIndexVonDienstplan();
   $.get(url,function(dienstplan){
    console.log(dienstplan)
   
    // page is now ready, initialize the calendar..
    $('#calendar').fullCalendar({
       
       
        
    });
  


});
})

function getIndexVonDienstplan()
{
       var query = window.location.href
       var vars = query.split("/");
       for (var i=0;i<vars.length;i++) {
               if(i+1 == vars.length){
                   return vars[i];
                   console.log(vars[i]);
                }
              
               
       }
    
}
