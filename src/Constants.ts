export const horizontalAxis = ["a", "b", "c", "d", "e", "f","g", "h"];
export const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8] ;

export interface Piece {
    image : string;
    x : number;
    y : number;
    type : PieceType; 
    team: Team;
    enPassant?: boolean;
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