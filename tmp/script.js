var title = [ 'rank', 'name', 'capacity', 'city', 'country', 'tournament', 'tour'];
var loop = 0;
var doc = [];
var obj;

$('#table1 tr').each(function() { 
  
  obj = {};
  loop = 0;
  $(this).find('td').each (function() {   
    $(this).children('span').remove();
    
    var name = $(this).children('a').html();
    var country = $(this).children('a').children('span').html();
    var sup = $(this).children('sup').html();
    
    if ( name !== undefined || country !== undefined || sup !== undefined ) {
    
      if(name !== undefined) {
        obj[title[loop]] = name;
        loop++;
      } else if(country !== undefined) {
        obj[title[loop]] = country;
        loop++;
      }
      
    } else {
      obj[title[loop]] = $(this).html();
        loop++;      
    }
  });
  
  doc.push(obj);
  
}); 

console.log(JSON.stringify(doc));