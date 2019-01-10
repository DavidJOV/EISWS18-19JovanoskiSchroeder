$(document).ready(function() {
   var url = "http://localhost:3000/Dienstplaene/"+1//getIndexVonDienstplan();
   $.get(url,function(dienstplan){
    console.log(dienstplan.schichten)
   
   
    // page is now ready, initialize the calendar..
    $('#calendar').fullCalendar({
        
        eventSources: [

            // your event source
            {
              events: [ // put the array in the `events` property
                {
                  title  : 'Fruehdienst',
                  start  : '2019-01-01'
                },
                {
                  title  : 'Fruehdienst',
                  start  : '2019-01-05',
                  end    : '2019-01-07'
                },
                {
                  title  : 'Fruehdienst',
                  start  : '2019-01-09T12:30:00',
                }
              ],
              color: 'black',     // an option!
              textColor: 'yellow' // an option!
            }
        
            // any other event sources...
        
          ]
        
       
          
        
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
