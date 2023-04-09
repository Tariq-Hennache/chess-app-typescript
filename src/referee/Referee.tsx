import { PieceType, Team } from "../components/chessboard/Chessboard";

class Referee{
    isValidMove(px:number, py:number, x:number, y:number, type:PieceType, team:Team){
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
            }
            

        }

        return false;
    }
}






export default Referee;