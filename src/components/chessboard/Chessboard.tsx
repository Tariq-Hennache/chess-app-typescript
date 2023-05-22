//import { type } from "os";

import React, { useRef, useState } from "react";
import Tile from "../tile/Tile";
import './Chessboard.css';
import Referee from "../../referee/Referee";
import { horizontalAxis, verticalAxis, Piece, PieceType, Team, initialBoardState, Postition} from "../../Constants";




function Chessboard(){
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [activePiecePosition, setActivePiecePosition] = useState<Postition>({x:0, y:0});
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const chessboardRef = useRef<HTMLDivElement>(null)
    const referee = new Referee();

    function grabPiece(e: React.MouseEvent){
    const element = e.target as HTMLElement
    const chessboard = chessboardRef.current;


    // check if the element is a chess piece and if the chessboard is loaded
    if(element.classList.contains("chess-piece") && chessboard){
        setActivePiecePosition({x: Math.floor((e.clientX - chessboard.offsetLeft)/100), y: Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100))})
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

        const currentPiece = pieces.find((p) => p.position.x === activePiecePosition.x && p.position.y === activePiecePosition.y)
        //const attackedPiece = pieces.find((p) => p.x === x && p.y === y)
        console.log(currentPiece + "current piece")
        if(currentPiece){
            const validMove = referee.isValidMove(activePiecePosition.x, activePiecePosition.y, x, y, currentPiece.type, currentPiece.team, pieces)

            const isEnPassant = referee.isEnPassant(activePiecePosition.x, activePiecePosition.y, x, y, pieces, currentPiece.team, currentPiece.type)

            const direction = currentPiece.team === Team.WHITE ? 1 : -1;

            if(isEnPassant){
                const Updatedpieces = pieces.reduce((results, piece) => {
                    if(piece.position.x === activePiecePosition.x && piece.position.y === activePiecePosition.y){
                        piece.enPassant = false;
                        piece.position.x = x;
                        piece.position.y = y;
                        results.push(piece)
                    }else if(!(piece.position.x === x && piece.position.y === y - direction)){
                        if(piece.type === PieceType.PAWN){
                            piece.enPassant = false;
                        }
                        results.push(piece)
                    }
                    return results
                }, [] as Piece[]);
                setPieces(Updatedpieces)
            }else if(validMove){
                //updates peices position
                const Updatedpieces = pieces.reduce((results, piece) => {
                    if(piece.position.x === activePiecePosition.x && piece.position.y === activePiecePosition.y){
                        if(Math.abs(activePiecePosition.y - y) === 2 && currentPiece.type === PieceType.PAWN){
                            piece.enPassant = true;
                        }else{
                            piece.enPassant = false;
                        }
                        piece.position.x = x;
                        piece.position.y = y;
                        results.push(piece)
                    }else if(!(piece.position.x === x && piece.position.y === y)){
                        if(piece.type === PieceType.PAWN){
                            piece.enPassant = false;
                        }
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
            if(p.position.x === i && p.position.y === j){
                image = p.image;
            }
        })

        board.push(<Tile key={`${j},${i}`} image ={image} number = {number}/>)


            
        }
    }

    return <div onMouseMove={e => movePiece(e)} onMouseDown={e => grabPiece(e)} onMouseUp={e => dropPiece(e)} id="chessboard" ref={chessboardRef}>{board}</div>
};

export default Chessboard;


