# Maxit

Maxit is usually played on an n x n grid of squares. Each square contains a value ranging from -9 to 15. One of the squares is 
initially designated with a marker (**) indicating the current position. Player X may take any square on the same row as the 
marker. When Player X is done, Player Y makes a similar move, except choosing between the squares in the column.
Play alternates until all squares are taken or until a player is left without a valid move. The player with the most points 
at the end is the winner.

Includes two modes of play
1) Single Player - Where the player plays against the program
2) Two Player - Where two players play against each other

Bitmask DP algorithm used in the single player mode to make the most optimal move
every time based on the state of the grid to maximize computer’s score.  
  
State of the grid decided by
1) position - Current position of the pointer
2) gridState - Bitmask containing the positions of the grid that are not taken 
3) turn - Indicates if it is X's turn or Y's turn

DP array stores the difference between the scores of both players "Y - X".  
Next move chosen to maximize "Y - X" in case of Y's turn or maximize "X - Y" in case of X's turn.  
Computer assumes the role of Player Y and makes the next move per the DP array.

View deployment at https://akilkarthikeyan.github.io/maxit/

