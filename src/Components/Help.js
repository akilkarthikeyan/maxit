import './Help.css';
const Help = () => {
    return(
        <div className = 'help' >
            <p>
                $ Maxit is played on an n x n grid of squares.<br/>
                $ Each square contains a value ranging from -9 to 15.<br/>
                $ One of the squares is initially designated with a marker (**) indicating the current position.<br/>
                $ Player X may take any square on the same row as the marker.<br/>
                $ When Player X is done, Player Y makes a similar move, except choosing between the squares in the column.<br/>
                $ In Single Player mode, the Computer is Player Y.<br/>
                $ Play alternates until all squares are taken or until a player is left without a valid move.<br/>
                $ The player with the most points at the end is the winner.<br/>
            </p>
        </div>
    );
}

export default Help;