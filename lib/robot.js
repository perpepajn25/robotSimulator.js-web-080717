'use strict';

function Robot(coordinates = [0,0],bearing="north") {
  this.coordinates = coordinates
  this.bearing = bearing
};

Robot.prototype.place = function(object){
  this.coordinates[0]= object.x;
  this.coordinates[1]= object.y;
  this.bearing = object.direction
};

Robot.prototype.orient = function(direction){
  let directions = [ 'east', 'west', 'north', 'south' ];
  if (directions.includes(direction)) {
    this.bearing = direction
  } else {
   throw new Error("Invalid Robot Bearing")
  }
};

Robot.prototype.turnRight = function(){
  switch(this.bearing){
    case "north":
      this.bearing = "east";
      break;
    case "south":
      this.bearing = "west";
      break;
    case "east":
      this.bearing = "south";
      break;
    case "west":
      this.bearing = "north";
      break;
  }
};

Robot.prototype.turnLeft = function(){
  switch(this.bearing){
    case "north":
      this.bearing = "west";
      break;
    case "south":
      this.bearing = "east";
      break;
    case "east":
      this.bearing = "north";
      break;
    case "west":
      this.bearing = "south";
      break;
  }
};

Robot.prototype.at = function(x,y){
  this.coordinates[0] = x;
  this.coordinates[1] = y;
};

Robot.prototype.advance = function(){
  switch(this.bearing){
    case "north":
      this.coordinates[1]+=1;
      break;
    case "east":
      this.coordinates[0]+=1;
      break;
    case "south":
      this.coordinates[1]-=1;
      break;
    case "west":
      this.coordinates[0]-=1;
      break;
  }
};

Robot.prototype.instructions = function(string){
  let array = []
  for (let i=0; i < string.length; i++){
    if (string[i] === "R"){
      array.push('turnRight')
    } else if (string[i] === "L"){
      array.push('turnLeft')
    } else if (string[i] === "A"){
      array.push('advance')
    }
  }
  return array
};

Robot.prototype.evaluate = function(string){
  let instructRobot= this.instructions(string)
  for (let i=0; i < instructRobot.length; i++){
    if (instructRobot[i] === "turnRight"){
      this.turnRight()
    } else if (instructRobot[i] === "turnLeft"){
      this.turnLeft()
    } else if (instructRobot[i] === "advance"){
      this.advance()
    }
  }
};
