//import { type } from "os";

import React, { useRef, useState } from "react";
import Tile from "../tile/Tile";
import './Chessboard.css';
import Referee from "../../referee/Referee";



const horizontalAxis = ["a", "b", "c", "d", "e", "f","g", "h"];
const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8] ;

 export interface Piece {
    image : string;
    x : number;
    y : number;
    type : PieceType; 
    team: Team;
}

export enum PieceType {
    PAWN,
    ROOK,
    KNIGHT,
    BISHOP,
    QUEEN,
    KING
}

export enum Team {
    WHITE,
    BLACK
}



// initial board state
 const initialBoardState: Piece[] = []

 for(let i = 0; i<2; i++){
    const teamType = i === 0 ? Team.BLACK : Team.WHITE;
    const type = (teamType === Team.BLACK) ? "d" : "l";
    const y = (teamType === Team.BLACK) ? 7 : 0;

    initialBoardState.push({image : `assets/images/Chess_r${type}t60.png`, x:0, y, type: PieceType.ROOK, team: teamType})
    initialBoardState.push({image : `assets/images/Chess_r${type}t60.png`, x:7, y, type: PieceType.ROOK, team: teamType})
    initialBoardState.push({image : `assets/images/Chess_n${type}t60.png`, x:1, y, type: PieceType.KNIGHT, team: teamType})
    initialBoardState.push({image : `assets/images/Chess_n${type}t60.png`, x:6, y, type: PieceType.KNIGHT, team: teamType})
    initialBoardState.push({image : `assets/images/Chess_b${type}t60.png`, x:2, y, type: PieceType.BISHOP,  team: teamType})
    initialBoardState.push({image : `assets/images/Chess_b${type}t60.png`, x:5, y, type: PieceType.BISHOP, team: teamType})
    initialBoardState.push({image : `assets/images/Chess_q${type}t60.png`, x:3, y, type: PieceType.QUEEN, team: teamType})
    initialBoardState.push({image : `assets/images/Chess_k${type}t60.png`, x:4, y, type: PieceType.KING, team: teamType})
}
for( let i =0; i< 8; i++){
    initialBoardState.push({image : 'assets/images/Chess_pdt60.png', x:i, y:6, type: PieceType.PAWN, team: Team.BLACK})
}
for( let i =0; i< 8; i++){
    initialBoardState.push({image : 'assets/images/Chess_plt60.png', x:i, y:1, type: PieceType.PAWN, team: Team.WHITE})
}


function Chessboard(){
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [ gridX, setGridX] = useState<number>(0);
    const [ gridY, setGridY] = useState<number>(0);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const chessboardRef = useRef<HTMLDivElement>(null)
    const referee = new Referee();

    function grabPiece(e: React.MouseEvent){
    const element = e.target as HTMLElement
    const chessboard = chessboardRef.current;


    // check if the element is a chess piece and if the chessboard is loaded
    if(element.classList.contains("chess-piece") && chessboard){

        setGridX(Math.floor((e.clientX - chessboard.offsetLeft)/100));
        setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100)));

        const x = e.clientX -50;
        const y = e.clientY -50;
        element.style.position = "absolute";
        element.style.left = `${x}px`
        element.style.top = `${y}px`

        setActivePiece(element)
    }
    }

    // moves the piece around the chessboard
    function movePiece(e : React.MouseEvent){
     const chessboard = chessboardRef.current;
     if(activePiece && chessboard){
        const minX = chessboard.offsetLeft - 35;
        const minY = chessboard.offsetTop -35;

        const x = e.clientX -50;
        const y = e.clientY -50;
        activePiece.style.position = "absolute";
        // activePiece.style.left = `${x}px`
        // activePiece.style.top = `${y}px`

        if(x > minX && x < minX + chessboard.offsetWidth -30){
            activePiece.style.left = `${x}px`
        }

        if(y > minY && y < minY + chessboard.offsetHeight -30){
            activePiece.style.top = `${y}px`
        }

    }
}


// drops the piece on the chessboard
function dropPiece(e : React.MouseEvent){
    const chessboard = chessboardRef.current;
    if(activePiece && chessboard){
        const x = Math.floor((e.clientX - chessboard.offsetLeft)/100);
        const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100));

        const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY)
        //const attackedPiece = pieces.find((p) => p.x === x && p.y === y)
        console.log(currentPiece + "current piece")
        if(currentPiece){
            const validMove = referee.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces)
            if(validMove){
                //updates peices position

                const Updatedpieces = pieces.reduce((results, piece) => {
                    if(piece.x === gridX && piece.y === gridY){
                        piece.x = x;
                        piece.y = y;
                        results.push(piece)
                    }else if(!(piece.x === x && piece.y === y)){
                        results.push(piece)
                    }
                    return results
                }, [] as Piece[]);
                setPieces(Updatedpieces)
            
        }else{
            activePiece.style.position = "relative";
            activePiece.style.removeProperty("top");
            activePiece.style.removeProperty("left");

        }
                 
        }
        setActivePiece(null)
        }
    }
    

    let board = []
    for(let j=verticalAxis.length -1; j>=0 ; j--){
    for(let i=0; i< horizontalAxis.length; i++){
        const number = j + i + 2;
        let image = undefined;
        
        // check if there is a piece on the tile
        pieces.forEach(p => {
            if(p.x === i && p.y === j){
                image = p.image;
            }
        })

        board.push(<Tile key={`${j},${i}`} image ={image} number = {number}/>)


            
        }
    }

    return <div onMouseMove={e => movePiece(e)} onMouseDown={e => grabPiece(e)} onMouseUp={e => dropPiece(e)} id="chessboard" ref={chessboardRef}>{board}</div>
};

export default Chessboard;


