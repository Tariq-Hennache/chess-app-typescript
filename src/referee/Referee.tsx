import { PieceType, Team, Piece } from "../Constants";

class Referee{

    isTileOccupied(x:number, y:number, boardState : Piece[]):boolean{

        const piece = boardState.find((piece) => piece.position.x === x && piece.position.y === y);
        if(piece){
            return true;
        }else{
            return false;
        }


    }

    tileHasEnemyPiece(x:number, y:number, team:Team, boardState:Piece[]):boolean{
        const piece = boardState.find((piece) => piece.position.x === x && piece.position.y === y);
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
                const piece = boardState.find((piece) => piece.position.x === x && piece.position.y === y - direction && piece.enPassant);
                if(piece){
                    return true;
                }
            
        }
            
        }
        return false;

    }

    // isPieceInTheWay(px:number, py:number, x:number, y:number, boardState:Piece[], type:PieceType){
    //     if(type === PieceType.PAWN){
    //         const direction = y - py > 0 ? 1 : -1;
    //         if(this.isTileOccupied(x, y, boardState)){
    //             return true;
    //         }else if(this.isTileOccupied(x, y - direction, boardState)){
    //             return true;
    //         }
    //     }else if(type === PieceType.KNIGHT){
    //         return false;
    //     }else if(type === PieceType.BISHOP){
    //         const xDirection = x - px > 0 ? 1 : -1;
    //         const yDirection = y - py > 0 ? 1 : -1;
    //         let x1 = px + xDirection;
    //         let y1 = py + yDirection;
    //         while(x1 !== x && y1 !== y){
    //             if(this.isTileOccupied(x1, y1, boardState)){
    //                 return true;
    //             }
    //             x1 += xDirection;
    //             y1 += yDirection;
    //         }
    //     }else if(type === PieceType.ROOK){
    //         const xDirection = x - px > 0 ? 1 : -1;
    //         const yDirection = y - py > 0 ? 1 : -1;
    //         if(x === px){
    //             let y1 = py + yDirection;
    //             while(y1 !== y){
    //                 if(this.isTileOccupied(x, y1, boardState)){
    //                     return true;
    //                 }
    //                 y1 += yDirection;
    //             }
    //         }else if(y === py){
    //             let x1 = px + xDirection;
    //             while(x1 !== x){
    //                 if(this.isTileOccupied(x1, y, boardState)){
    //                     return true;
    //                 }
    //                 x1 += xDirection;
    //             }
    //         }
    //     }else if(type === PieceType.QUEEN){
    //         const xDirection = x - px > 0 ? 1 : -1;
    //         const yDirection = y - py > 0 ? 1 : -1;
    //         if(x === px){
    //             let y1 = py + yDirection;
    //             while(y1 !== y){
    //                 if(this.isTileOccupied(x, y1, boardState)){
    //                     return true;
    //                 }
    //                 y1 += yDirection;
    //             }
    //         }else if(y === py){
    //             let x1 = px + xDirection;
    //             while(x1 !== x){
    //                 if(this.isTileOccupied(x1, y, boardState)){
    //                     return true;
    //                 }
    //                 x1 += xDirection;
    //             }
    //         }else if(Math.abs(x - px) === Math.abs(y - py)){
    //             let x1 = px + xDirection;
    //             let y1 = py + yDirection;
    //             while(x1 !== x && y1 !== y){
    //                 if(this.isTileOccupied(x1, y1, boardState)){
    //                     return true;
    //                 }
    //                 x1 += xDirection;
    //                 y1 += yDirection;
    //             }
    //         }
    //     }else if(type === PieceType.KING){
    //         if(Math.abs(x - px) <= 1 && Math.abs(y - py) <= 1){
    //             return false;
    //         }
    //     }
    //     return false;
    // }



    

    isValidMove(px:number, py:number, x:number, y:number, type:PieceType, team:Team, boardState:Piece[]){
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
         } else if(type === PieceType.KNIGHT){
            if((Math.abs(x - px) === 2 && Math.abs(y - py) === 1) || (Math.abs(x - px) === 1 && Math.abs(y - py) === 2)){
                if(!this.isTileOccupied(x, y, boardState)){
                    return true;
                }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                    return true;
                }
                    console.log("knight")
                }
            }

            else if(type === PieceType.BISHOP){
                if(Math.abs(x - px) === Math.abs(y - py)){
                    if(!this.isTileOccupied(x, y, boardState)){
                        return true;
                    }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                        return true;
                    }
                }
            }

        

        
            

    

        return false;
    }
}






export default Referee;