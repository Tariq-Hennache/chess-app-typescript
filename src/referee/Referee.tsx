import { PieceType, Team, Piece } from "../Constants";

class Referee{

    isTileOccupied(x:number, y:number, boardState : Piece[]):boolean{

        const piece = boardState.find((piece) => piece.x === x && piece.y === y);
        if(piece){
            return true;
        }else{
            return false;
        }


    }

    tileHasEnemyPiece(x:number, y:number, team:Team, boardState:Piece[]):boolean{
        const piece = boardState.find((piece) => piece.x === x && piece.y === y);
        if(piece && piece.team !== team){
            return true;
        }else{
            return false;
        }
    }

    isEnPassant(px:number, py:number, x:number, y:number, boardState:Piece[], team: Team, type:PieceType){
        const direction = team === Team.WHITE ? 1 : -1;

        if(type === PieceType.PAWN){ 
            if(y - py === direction && Math.abs(x - px) === 1){
                const piece = boardState.find((piece) => piece.x === x && piece.y === y - direction && piece.enPassant);
                if(piece){
                    return true;
                }
            
        }
            
        }
        return false;

    }

    

    isValidMove(px:number, py:number, x:number, y:number, type:PieceType, team:Team, boardState:Piece[]){
        console.log("isValidMove")
        console.log(px, py, x, y, type, team)
        if(type === PieceType.PAWN){
            const startRow = team === Team.WHITE ? 1 : 6;
            const direction = team === Team.WHITE ? 1 : -1;
            if(py === startRow && x === px && y - py === direction * 2){
                if(!this.isTileOccupied(x, y, boardState) && !this.isTileOccupied(x, y - direction, boardState)){
                    return true;
                }
            }else if(y - py === direction && x === px){
                if(!this.isTileOccupied(x, y, boardState)){
                    return true;
                }
            }

            else if(y - py === direction && Math.abs(x - px) === 1){
                if(this.isTileOccupied(x, y, boardState)){
                    return true;
                }
            }else if(y - py === direction && Math.abs(x - px) === 1){
                if(this.tileHasEnemyPiece(x, y, team, boardState)){
                    return true;
                }
            }
         }

        
            

    

        return false;
    }
}






export default Referee;