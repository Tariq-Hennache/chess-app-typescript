import { PieceType, Team, Piece } from "../Constants";

//px and py are the initial x and y coordinates of the piece
// x and y are the final x and y coordinates of the piece

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

    isValidPawnMove(px:number, py:number, x:number, y:number, team:Team, boardState:Piece[]){
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

    isValidKnightMove(px:number, py:number, x:number, y:number, team:Team, boardState:Piece[]){

            if((Math.abs(x - px) === 2 && Math.abs(y - py) === 1) || (Math.abs(x - px) === 1 && Math.abs(y - py) === 2)){
                if(!this.isTileOccupied(x, y, boardState)){
                    return true;
                }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                    return true;
                }
                }
            
            }

    isValidBishopMove(px:number, py:number, x:number, y:number, team:Team, boardState:Piece[]){
            if(Math.abs(x - px) === Math.abs(y - py)){
                // checks move to top right
                if(x - px > 0 && y - py > 0){
                    let x1 = px + 1;
                    let y1 = py + 1;
                    while(x1 !== x && y1 !== y){
                        if(this.isTileOccupied(x1, y1, boardState)){
                            return false;
                        }
                        x1++;
                        y1++;
                    }
                // checks move to top left
                } else if(x - px < 0 && y - py > 0){
                    let x1 = px - 1;
                    let y1 = py + 1;
                    while(x1 !== x && y1 !== y){
                        if(this.isTileOccupied(x1, y1, boardState)){
                            return false;
                        }
                        x1--;
                        y1++;
                    }
                // checks move to bottom right
                }else if(x - px > 0 && y - py < 0){
                    let x1 = px + 1;
                    let y1 = py - 1;
                    while(x1 !== x && y1 !== y){
                        if(this.isTileOccupied(x1, y1, boardState)){
                            return false;
                        }
                        x1++;
                        y1--;
                    }
                // checks move to bottom left
                }else if(x - px < 0 && y - py < 0){
                    let x1 = px - 1;
                    let y1 = py - 1;
                    while(x1 !== x && y1 !== y){
                        if(this.isTileOccupied(x1, y1, boardState)){
                            return false;
                        }
                        x1--;
                        y1--;
                    }
                }
                if(!this.isTileOccupied(x, y, boardState)){
                    return true;
                }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                    return true;
                }
            }
    }

    isValidRookMove(px:number, py:number, x:number, y:number, team:Team, boardState:Piece[]){
        if(x === px){
            if(y > py){
                let y1 = py + 1;
                while(y1 !== y){
                    if(this.isTileOccupied(x, y1, boardState)){
                        return false;
                    }
                    y1++;
                }
            }else if(y < py){
                let y1 = py - 1;
                while(y1 !== y){
                    if(this.isTileOccupied(x, y1, boardState)){
                        return false;
                    }
                    y1--;
                }
            }if(!this.isTileOccupied(x, y, boardState)){
                return true;
                }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                return true;
                }
        }else if(y === py){
            if(x > px){
                let x1 = px + 1;
                while(x1 !== x){
                    if(this.isTileOccupied(x1, y, boardState)){
                        return false;
                    }
                    x1++;
                }
            }else if(x < px){
                let x1 = px - 1;
                while(x1 !== x){
                    if(this.isTileOccupied(x1, y, boardState)){
                        return false;
                    }
                    x1--;
                }
            }if(!this.isTileOccupied(x, y, boardState)){
                return true;
                }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                return true;
                }

        }}

    isValidQueenMove(px:number, py:number, x:number, y:number, team:Team, boardState:Piece[]){
        if(x === px){
            if(y > py){
                let y1 = py + 1;
                while(y1 !== y){
                    if(this.isTileOccupied(x, y1, boardState)){
                        return false;
                    }
                    y1++;
                }
            }else if(y < py){
                let y1 = py - 1;
                while(y1 !== y){
                    if(this.isTileOccupied(x, y1, boardState)){
                        return false;
                    }
                    y1--;
                }
            }if(!this.isTileOccupied(x, y, boardState)){
                return true;
                }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                return true;
                }
        }else if(y === py){
            if(x > px){
                let x1 = px + 1;
                while(x1 !== x){
                    if(this.isTileOccupied(x1, y, boardState)){
                        return false;
                    }
                    x1++;
                }
            }else if(x < px){
                let x1 = px - 1;
                while(x1 !== x){
                    if(this.isTileOccupied(x1, y, boardState)){
                        return false;
                    }
                    x1--;
                }
            }if(!this.isTileOccupied(x, y, boardState)){
                return true;
                }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                return true;
                }

        } if(Math.abs(x - px) === Math.abs(y - py)){
            // checks move to top right
            if(x - px > 0 && y - py > 0){
                let x1 = px + 1;
                let y1 = py + 1;
                while(x1 !== x && y1 !== y){
                    if(this.isTileOccupied(x1, y1, boardState)){
                        return false;
                    }
                    x1++;
                    y1++;
                }
            // checks move to top left
            } else if(x - px < 0 && y - py > 0){
                let x1 = px - 1;
                let y1 = py + 1;
                while(x1 !== x && y1 !== y){
                    if(this.isTileOccupied(x1, y1, boardState)){
                        return false;
                    }
                    x1--;
                    y1++;
                }
            // checks move to bottom right
            }else if(x - px > 0 && y - py < 0){
                let x1 = px + 1;
                let y1 = py - 1;
                while(x1 !== x && y1 !== y){
                    if(this.isTileOccupied(x1, y1, boardState)){
                        return false;
                    }
                    x1++;
                    y1--;
                }
            // checks move to bottom left
            }else if(x - px < 0 && y - py < 0){
                let x1 = px - 1;
                let y1 = py - 1;
                while(x1 !== x && y1 !== y){
                    if(this.isTileOccupied(x1, y1, boardState)){
                        return false;
                    }
                    x1--;
                    y1--;
                }
            }
            if(!this.isTileOccupied(x, y, boardState)){
                return true;
            }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                return true;
            }
        }
        }

    isValidKingMove(px:number, py:number, x:number, y:number, team:Team, boardState:Piece[]){
        if(Math.abs(x - px) <= 1 && Math.abs(y - py) <= 1){
            if(!this.isTileOccupied(x, y, boardState)){
                return true;
            }else if(this.tileHasEnemyPiece(x, y, team, boardState)){
                return true;
            }else{
                return false;
            }
        }
    }

    


    

    isValidMove(px:number, py:number, x:number, y:number, type:PieceType, team:Team, boardState:Piece[]){
        switch(type){
            case PieceType.PAWN:
                return this.isValidPawnMove(px, py, x, y, team, boardState);
                
            case PieceType.KNIGHT:
                return this.isValidKnightMove(px, py, x, y, team, boardState);
                
            case PieceType.BISHOP:
                return this.isValidBishopMove(px, py, x, y, team, boardState);
                
            case PieceType.ROOK:
                return this.isValidRookMove(px, py, x, y, team, boardState);
                
            case PieceType.QUEEN:
                return this.isValidQueenMove(px, py, x, y, team, boardState);
                //return this.isValidRookMove(px, py, x, y, team, boardState) || this.isValidBishopMove(px, py, x, y, team, boardState);
                
            case PieceType.KING:
                return this.isValidKingMove(px, py, x, y, team, boardState);
        }
    }

        
        

            
           

       

       

    

}







export default Referee;