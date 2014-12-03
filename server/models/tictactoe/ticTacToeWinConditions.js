/**
 * Created by thordurth on 3.12.2014.
 */
module.exports = function(grid,symbol){

  // win conditions: [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  var winConditions = false;
  var i;
  for(i = 0; i <= 6;i = i+3){
    if(grid[i] === symbol && grid[i+1] === symbol && grid[i+2] === symbol){
       winConditions = true;
     }

  }
  for(i = 0; i < 3; i++){
    if(grid[i] === symbol && grid[i+3] === symbol && grid[i+6] === symbol){
       winConditions = true;
     }
  }
  if(grid[0] === symbol && grid[4] === symbol && grid[8] === symbol){
     winConditions = true;
  }
  if(grid[2] === symbol && grid[4] === symbol && grid[6] === symbol){
    winConditions = true;
  }

  return {
    isWin: function(){
      return winConditions;
    }
  }

};
