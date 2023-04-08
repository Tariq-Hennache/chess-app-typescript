import { type } from "os";

import React, { useEffect, useRef, useState } from "react";
import Tile from "../tile/Tile";
import './Chessboard.css';

const horizontalAxis = ["a", "b", "c", "d", "e", "f","g", "h"];
const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8] ;

interface Piece {
    image : string;
    x : number;
    y : number; 
}


function Chessboard(){
    const [pieces, setPieces] = useState<Piece[]>([])
    const chessboardRef = useRef<HTMLDivElement>(null)

    let activePiece: HTMLElement | null = null;

    useEffect(() => {for(let i = 0; i<2; i++){
        const type = i === 0 ? "d" : "l";
        const y = i === 0 ? 7 : 0;
    
        pieces.push({image : `assets/images/Chess_r${type}t60.png`, x:0, y})
        pieces.push({image : `assets/images/Chess_r${type}t60.png`, x:7, y})
        pieces.push({image : `assets/images/Chess_n${type}t60.png`, x:1, y})
        pieces.push({image : `assets/images/Chess_n${type}t60.png`, x:6, y})
        pieces.push({image : `assets/images/Chess_b${type}t60.png`, x:2, y})
        pieces.push({image : `assets/images/Chess_b${type}t60.png`, x:5, y})
        pieces.push({image : `assets/images/Chess_q${type}t60.png`, x:3, y})
        pieces.push({image : `assets/images/Chess_k${type}t60.png`, x:4, y})
    }
    for( let i =0; i< 8; i++){
        pieces.push({image : 'assets/images/Chess_pdt60.png', x:i, y:6})
    }
    for( let i =0; i< 8; i++){
        pieces.push({image : 'assets/images/Chess_plt60.png', x:i, y:1})
    }}, [])

function grabPiece(e: React.MouseEvent){
    const element = e.target as HTMLElement

    if(element.classList.contains("chess-piece")){

        const x = e.clientX -50;
        const y = e.clientY -50;
        element.style.position = "absolute";
        element.style.left = `${x}px`
        element.style.top = `${y}px`

        activePiece = element
    }
}

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

function dropPiece(e : React.MouseEvent){
    if(activePiece){
        activePiece = null
    }
}

    let board = []
    for(let j=verticalAxis.length -1; j>=0 ; j--){
    for(let i=0; i< horizontalAxis.length; i++){
        const number = j + i + 2;
        let image = undefined;

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
