import './Tile.css';

interface Props{
    number : number
}
function Tile({number}:Props){
    if(number %2 === 0){
        return <div className='tile black-tile'></div>
    }else{
        return <div className='tile white-tile'></div>
    }
    
}

export default Tile;