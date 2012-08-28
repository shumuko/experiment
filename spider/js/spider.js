// testing with an array 
var team = ["Designer","Developer", "Project\nManager", "UX", "Creative\nDirector", "Designer","Front End\nDeveloper", "Marketing\nManager", "Copywriter"];

// temporary change in select to show different teams selected
$('select#teamSelect').change(function() {
	var currentTeam = $('select#teamSelect').val();
	var currentTeamTitle = $('option:selected').text();
	
	paper.clear();
	
	fillBackground(bgColor);
	
	if (currentTeam == "dev_team") {
		team = ["Designer","Developer", "Project\nManager", "UX"];
	}
	
	if (currentTeam == "ux_team") {
		team = ["Project\nManager", "UX", "Creative\nDirector", "Designer","Developer", "Project\nManager", "Copywriter"];
	}
	
	if (currentTeam == "design_team") {
		team = ["Designer","Developer", "Project\nManager", "UX", "Creative\nDirector", "Designer","Developer", "Project\nManager", "Copywriter"];
	}
	
	if (currentTeam == "big_team") {
		team = ["Designer","Developer", "Project\nManager", "UX", "Creative\nDirector", "Designer","Developer", "Project\nManager", "Copywriter","UX", "Creative\nDirector", "Designer","Developer", "Project\nManager", "Copywriter","Designer","Developer", "Project\nManager", "UX", "Creative\nDirector", "Designer","Developer", "Project\nManager", "Copywriter","UX", "Creative\nDirector", "Designer","Developer", "Project\nManager", "Copywriter"];
	}

	displayRoles(team);
	//Redraw center to cover connection lines
	setCenterOrb(currentTeamTitle);

});

//////////////////
// Team Builder //
//////////////////

var baseSize = 10; // Originally set to 10, allows to dynamically adjust size of "spider"
// Setup canvas
var height = (baseSize * 60);
var width = (baseSize * 90);
var paperPosX = 100;
var paperPosY = 50;
var paper = Raphael(paperPosX, paperPosY, width, height);
var centerX = width/2;
var centerY = height/2;
var bgColor = "#24201f";
var cx;
var cy;
var	r = baseSize * 5.4;
var roleFontSize = baseSize * 2; 
var roleTitle;
var radius = baseSize * 22;
var connector;

function fillBackground(bgColor){
	var bg = paper.rect(paperPosX, paperPosY, width, height);
	bg.attr({"fill": bgColor});
};

function rdm(from, to){
   return Math.floor(Math.random() * (to - from + 1) + from);
}

function drawRole(cx, cy, r, roleTitle){
	animateTime = rdm(500,1200);
	var isActive = true; //set default to active 
	
	var role = paper.circle(cx, cy, r).attr('id', roleTitle).animate({
		fill: "#36a698", 
		stroke: "#36a698", "stroke-width": (baseSize * 5), 
		"stroke-opacity": 0.1,}, animateTime).click(function(e) {

			if(isActive == true){
				this.animate({
					fill: "#333333",
					stroke: "none"
				});
				isActive = false;
			} else {
				this.animate({
			        fill: "#36a698",
			        stroke: "#36a698", 
			        "stroke-width": (baseSize * 5),
			        "stroke-opacity": 0.1 
			        }, animateTime);
				isActive = true;			
			}
    });
	
	paper.circle(cx, cy, r).animate({
		stroke: "#24201f", 
		"stroke-width": (baseSize * .5), 
		"stroke-opacity": 0.5}, animateTime);
		
	var t = paper.text(cx, cy, roleTitle).attr({ 
			"font-size": roleFontSize, 
			"font-family": "BebasNeue, Arial, Helvetica, sans-serif", 
			"fill" : "#24201f"
			}).click(function(e) {
				if(isActive == true){
				role.animate({
					fill: "#333333",
					stroke: "none"
				});
				isActive = false;
			} else {
				role.animate({
			        fill: "#36a698",
			        stroke: "#36a698", 
			        "stroke-width": (baseSize * 5),
			        "stroke-opacity": 0.1 
			        }, animateTime);
				isActive = true;			
			}
    });	
		
}; 
//end of drawRole()

function roleInfo(cx, cy, roleTitle){
	paper.circle(cx, cy, baseSize * 1.8).attr({"fill" : "#ffffff", "fill-opacity" : ".4","stroke" : "none"}).click(function(e) {
		$('h1').text(roleTitle);
    });

	paper.text(cx, cy, "i").attr({"font-size": (baseSize * 1.2), "font-family": "Georgia, serif", "fill" : "#24201f", "font-style" : "italic"}).click(function(e) {
		$('h1').text(roleTitle);
    });	

;
}

function setCenterOrb (teamTitle){  	
	// draw center orb for team label second to cover connecting lines
	function drawCenterOrb (r, fill, stroke, strokeWidth, teamTitle, strokeOpacity){
		var role = paper.circle(centerX, centerY, r).animate({fill: fill,  stroke: stroke, "stroke-width": strokeWidth, "stroke-opacity": strokeOpacity}, 1000);
		// add text to orb
		var tt = paper.text(centerX, centerY, teamTitle);
		tt.attr({ "font-size": (baseSize * 2.2), "font-family": "BebasNeue, Arial, Helvetica, sans-serif", "fill" : "#24201f", "width" : (baseSize * 3) });
	};
	
	// modify these to change appearance of orb/strokes
	drawCenterOrb((baseSize * 8.2), "#29261f", "#9dcb45", (baseSize * .8), "Design Team", .2);
	drawCenterOrb((baseSize * 6.2), "#9dcb45", "#24201f", (baseSize * .5), "Design Team", .9);
}

function displayRoles(){  // draw orb for each role
	
	var numRoles = team.length; //count number of roles in a given team
	
	// reduce radius and font size if more than ten roles
	if (numRoles >= 10){
		r = baseSize * 4;
		roleFontSize = baseSize * 1.7; 
	}
	else {
		r = baseSize * 5.4;
		roleFontSize = baseSize * 2;	//this resets on a change in team
	}
	
	for (var i = 0; i < team.length; i++) { 	//loop through for each role
		
		//lets pick some points in a circle, adding a range of randomness to make things a bit organic
		
		cx = (centerX + radius * Math.cos(2 * Math.PI * i / team.length)) + rdm(5,20);
	    cy = (centerY + radius * Math.sin(2 * Math.PI * i / team.length)) + rdm(5,20);
	    
	    //if the y coordinates fall into a range above or below  center point, lets modify to make an oval
	    
	    if (cy > 0 && cy < centerY-(baseSize*10.1)){
	    	cy = cy + (baseSize * 5.5);
	    } 
	   	else if (cy < height && cy > centerY+(baseSize*10.1)){
	   		cy = cy - (baseSize * 5.5);
	   	}
	    
	    //more modification on x axis
		
		if (cx > 0 && cx < centerX){
	    	cx = cx *.93;
	    } 
	   	else if (cx < width && cx > centerX){
	   		cx = cx * 1.1;
	   	}
	    
	    if (numRoles >= 6){
		    //if point falls on either left or right extreme, exaggerate distance
		   	if (cy > centerY && cy < centerY+(baseSize * 5.5)){
		    	cx = cx * 1.07;
		    	cx = cx * 1.01;
		    } 
		   	else if (cy < centerY && cy > centerY-(baseSize * 5.5)){
		   		cx = cx * .93;
		   		cy = cy * .99;
		   	}
		}

		if (numRoles >= 13){ // modify role positions if too many to plot without overlapping
			if (i % 2 === 0 ){
				cx = cx * .97;
				cy = cy * .97;
			}
		}
		
		// Build set for objects to sit in
		// Start drawing lines to connect
	    
    	connector = paper.path("M" + centerX + "," + centerY +"L"+cx+","+cy).attr ({
	    	"stroke-width": baseSize * .2,
	    	"stroke": "#e8e1e1",
	    	"stroke-dasharray": "."
	    });
		
		roleTitle = team[i];
		// Draw circle for role
		drawRole(cx, cy, r, roleTitle);

		// Adjust positioning to offset info buttons
		cx = cx+30;
		cy = cy+40;
		roleInfo(cx, cy, roleTitle);
	}
};

// on page load 

fillBackground(bgColor); //fill bg on load
displayRoles(); // display roles on page load
setCenterOrb(); // draw center orb on initial page load