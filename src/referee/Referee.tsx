import { PieceType, Team, Piece } from "../components/chessboard/Chessboard";

class Referee{

    isTileOccupied(x:number, y:number, boardState : Piece[]):boolean{

        const piece = boardState.find((piece) => piece.x === x && piece.y === y);
        if(piece){
            return true;
        }else{
            return false;
        }


    }
    isValidMove(px:number, py:number, x:number, y:number, type:PieceType, team:Team, boardState:Piece[]){
        console.log("isValidMove")
        console.log(px, py, x, y, type, team)
        if(type === PieceType.PAWN){
            if(team === Team.WHITE){
                if(py === 1 && x === px){
                    if(y === py + 1 || y === py + 2){
                        return true;
                    }
                    
                }else{
                   if(y === py + 1 && x === px){
                       return true;
                   }
                }
            } else {
                if(team === Team.BLACK){
                if(py === 6 && x === px){
                    if(y === py - 1 || y === py - 2){
                        if(!this.isTileOccupied(x, y, boardState)){
                            return true;
                        }
                    }
                    
                }else{
                   if(y === py - 1 && x === px){
                        if(!this.isTileOccupied(x, y, boardState)){
                       return true;
                        }
                   }
                }
            }

            }
            

        }

        return false;
    }
}






export default Referee;