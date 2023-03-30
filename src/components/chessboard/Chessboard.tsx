import { type } from "os";
import React from "react";
import Tile from "../tile/Tile";
import './Chessboard.css';

const horizontalAxis = ["a", "b", "c", "d", "e", "f","g", "h"];
const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8] ;

interface Piece {
    image : string;
    x : number;
    y : number; 
}

const pieces : Piece[] = []

for(let i = 0; i<2; i++){
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
}




function Chessboard(){
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

        board.push(<Tile image ={image} number = {number}/>)

            
        }
    }

    return <div id="chessboard">{board}</div>
};

export default Chessboard;