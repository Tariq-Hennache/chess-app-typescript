import exp from "constants";

export const horizontalAxis = ["a", "b", "c", "d", "e", "f","g", "h"];
export const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8] ;

export const squareSize = 100;



export interface Postition {

    x : number;
    y : number;

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

export interface Piece {
    image : string;
    position : Postition;
    type : PieceType; 
    team: Team;
    enPassant?: boolean;
}

export const initialBoardState: Piece[] = [

    {image : `assets/images/Chess_rdt60.png`, position :{ x:0, y:7}, type: PieceType.ROOK, team: Team.BLACK},
    {image : `assets/images/Chess_rlt60.png`, position :{ x:7, y:0}, type: PieceType.ROOK, team: Team.WHITE},
    {image : `assets/images/Chess_rdt60.png`, position :{ x:7, y:7}, type: PieceType.ROOK, team: Team.BLACK},
    {image : `assets/images/Chess_rlt60.png`, position :{ x:0, y:0}, type: PieceType.ROOK, team: Team.WHITE},

    {image : `assets/images/Chess_ndt60.png`, position :{x:1, y:7}, type: PieceType.KNIGHT, team: Team.BLACK},
    {image : `assets/images/Chess_nlt60.png`, position :{x:6, y:0}, type: PieceType.KNIGHT, team: Team.WHITE},
    {image : `assets/images/Chess_ndt60.png`, position :{x:6, y:7}, type: PieceType.KNIGHT, team: Team.BLACK},
    {image : `assets/images/Chess_nlt60.png`, position :{x:1, y:0}, type: PieceType.KNIGHT, team: Team.WHITE},

    {image : `assets/images/Chess_bdt60.png`, position :{x:2, y:7}, type: PieceType.BISHOP, team: Team.BLACK},
    {image : `assets/images/Chess_blt60.png`, position :{x:5, y:0}, type: PieceType.BISHOP, team: Team.WHITE},
    {image : `assets/images/Chess_bdt60.png`, position :{x:5, y:7}, type: PieceType.BISHOP, team: Team.BLACK},
    {image : `assets/images/Chess_blt60.png`, position :{x:2, y:0}, type: PieceType.BISHOP, team: Team.WHITE}, //

    {image : `assets/images/Chess_qdt60.png`, position :{x:3, y:7}, type: PieceType.QUEEN, team: Team.BLACK},
    {image : `assets/images/Chess_qlt60.png`, position :{x:3, y:0}, type: PieceType.QUEEN, team: Team.WHITE},

    {image : `assets/images/Chess_kdt60.png`, position :{x:4, y:7}, type: PieceType.KING, team: Team.BLACK},
    {image : `assets/images/Chess_klt60.png`, position :{x:4, y:0}, type: PieceType.KING, team: Team.WHITE},

    {image : `assets/images/Chess_pdt60.png`, position :{x:0, y:6}, type: PieceType.PAWN, team: Team.BLACK},
    {image : `assets/images/Chess_pdt60.png`, position :{x:1, y:6}, type: PieceType.PAWN, team: Team.BLACK},
    {image : `assets/images/Chess_pdt60.png`, position :{x:2, y:6}, type: PieceType.PAWN, team: Team.BLACK},
    {image : `assets/images/Chess_pdt60.png`, position :{x:3, y:6}, type: PieceType.PAWN, team: Team.BLACK},
    {image : `assets/images/Chess_pdt60.png`, position :{x:4, y:6}, type: PieceType.PAWN, team: Team.BLACK},
    {image : `assets/images/Chess_pdt60.png`, position :{x:5, y:6}, type: PieceType.PAWN, team: Team.BLACK},
    {image : `assets/images/Chess_pdt60.png`, position :{x:6, y:6}, type: PieceType.PAWN, team: Team.BLACK},
    {image : `assets/images/Chess_pdt60.png`, position :{x:7, y:6}, type: PieceType.PAWN, team: Team.BLACK},
    
    {image : `assets/images/Chess_plt60.png`, position :{x:0, y:1}, type: PieceType.PAWN, team: Team.WHITE},
    {image : `assets/images/Chess_plt60.png`, position :{x:1, y:1}, type: PieceType.PAWN, team: Team.WHITE},
    {image : `assets/images/Chess_plt60.png`, position :{x:2, y:1}, type: PieceType.PAWN, team: Team.WHITE},
    {image : `assets/images/Chess_plt60.png`, position :{x:3, y:1}, type: PieceType.PAWN, team: Team.WHITE},
    {image : `assets/images/Chess_plt60.png`, position :{x:4, y:1}, type: PieceType.PAWN, team: Team.WHITE},
    {image : `assets/images/Chess_plt60.png`, position :{x:5, y:1}, type: PieceType.PAWN, team: Team.WHITE},
    {image : `assets/images/Chess_plt60.png`, position :{x:6, y:1}, type: PieceType.PAWN, team: Team.WHITE},
    {image : `assets/images/Chess_plt60.png`, position :{x:7, y:1}, type: PieceType.PAWN, team: Team.WHITE},






    
];