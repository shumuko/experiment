/* Author:

*/
var paperPosX = 10;
var paperPosY = 20;
var width = 800;
var height = 600;
var paper = Raphael(paperPosX, paperPosY, width, height);
var bgColor = "#CCC";
var connector;

var team = ['Grahic\nDesigner', 'Interactive\nDesigner', 'Developer', 'Web\nDesigner', 'Project\nManager', 'UX', 'Copywriter'];

var currentTeam = $('select#team-select').val();
var currentTeamTitle = $('select#team-select').text();



drawBg(bgColor);
drawRole();

// on change event --- when a team is selected
$('select#team-select').change(function(){
  drawBg(bgColor);   
  
  if(currentTeam == "ux-team"){
    team = ['ux', 'Project\nManager', 'Web\nDesigner'];
  }
  if(currentTeam == "design-team"){
    team = ['Grahic\nDesigner', 'Interactive\nDesigner', 'Developer', 'Web\nDesigner', 'Project\nManager', 'UX', 'Copywriter'];
  }
  if(currentTeam == "dev-team"){
    team = ['Grahic\nDesigner', 'Interactive\nDesigner', 'Developer', 'Web\nDesigner', 'Project\nManager', 'UX', 'Copywriter', 'Frontend', 'Backend'];
  }
  
  drawRole(team);
  setCenterOrb(team); 
 
});

function drawBg(bgColor){
  var bg = paper.rect(paperPosX, paperPosY, width-100, height-100);
  
  bg.attr({
    fill: bgColor,
    stroke: "none"
  });  
}



function drawRole(){
  connector = paper.path("M0,0L300, 300").attr({
    "stroke-width": 2,
  	stroke: "#e8e1e1",
  	"stroke-dasharray": "."
  });
  var role = paper.circle(300, 300, 100);
  
  /*
connector.attr({
    stroke: "#CCC",
    "stroke-dasharray" : "."
      
  });
*/
  
  role.animate({
    fill: "#608100",
    stroke: "#3c5400",
    "stroke-width": 50,
    "stroke-opacity": 0.1,
    "fill-opacity": 0.3,
  }, 500);
  
  
}

function setCenterOrb() {
  
}




