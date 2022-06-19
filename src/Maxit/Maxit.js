import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Maxit.css'
import Help from '../Components/Help'

function Maxit() {
	let  { choice } = useParams();
	let navigate = useNavigate();

	let sameRows = [
		[0, 1, 2, 3],
		[0, 1, 2, 3],
		[0, 1, 2, 3],
		[0, 1, 2, 3],
		[4, 5, 6, 7],
		[4, 5, 6, 7],
		[4, 5, 6, 7],
		[4, 5, 6, 7],
		[8, 9, 10, 11],
		[8, 9, 10, 11],
		[8, 9, 10, 11],
		[8, 9, 10, 11],
		[12, 13, 14, 15],
		[12, 13, 14, 15],
		[12, 13, 14, 15],
		[12, 13, 14, 15]
	];

	let sameColumns = [
		[0, 4, 8, 12],
		[1, 5, 9, 13],
		[2, 6, 10, 14],
		[3, 7, 11, 15],
		[0, 4, 8, 12],
		[1, 5, 9, 13],
		[2, 6, 10, 14],
		[3, 7, 11, 15],
		[0, 4, 8, 12],
		[1, 5, 9, 13],
		[2, 6, 10, 14],
		[3, 7, 11, 15],
		[0, 4, 8, 12],
		[1, 5, 9, 13],
		[2, 6, 10, 14],
		[3, 7, 11, 15]
	]

	const [turn, setTurn] = useState('X');
	const [cells, setCells] = useState([]);
	const [current, setCurrent] = useState(-1);
	const [playerXScore, setPlayerXScore] = useState(0);
	const [playerYScore, setPlayerYScore] = useState(0);
	// eslint-disable-next-line
	const [dp, setDp] = useState([]);
	const [nMove, setNMove] = useState([]);
	const [result, setResult] = useState("");
	const [selected, setSelected] = useState(-1);
	const [help, setHelp] = useState(false);


	useEffect(() => {
		let array = Array(16).fill(0);
		let freq = Array(25).fill(0);

		//initialization

		for(let i = 0; i < 16; i++) {
			let temp;
			do {
				temp = -9 + Math.floor( Math.random() * 25 );
			} while( freq[9 + temp] >= 4 );
			array[i] = temp;
			freq[9 + temp]++;
		}

		let start = Math.floor(Math.random() * 16);

		// let array = [7, 8, 0, -9, 
		// 	10, 15, -6, -1, 
		// 	3, 5, -4, 11,
		// 	-3, -7, 12, 7];

		// let start = 14;
		
		let tempDp = new Array(Math.pow(2, 16));
		let tempNMove = new Array(Math.pow(2, 16));
		for(let i = 0; i < tempDp.length; i++) {
			tempDp[i] = new Array(16);
			tempNMove[i] = new Array(16);
			for(let j = 0; j < tempDp[i].length; j++) {
				tempDp[i][j] = new Array(2);
				tempNMove[i][j] = new Array(2);
			}
		}

		function AI (gridState, pos, whoseTurn) {
			//base no moves left
			if(whoseTurn === 0) { // 0 -> X
				let noMoves = true
				for(let i = 0; i < sameRows[pos].length; i++) {
					 if((gridState & (1<<sameRows[pos][i])) !== 0) {
						noMoves = false
					 }
				}
				if(noMoves) {
					return 0;
				}
			}
			else { // 1 -> Y
				let noMoves = true
				for(let i = 0; i < sameColumns[pos].length; i++) {
					 if((gridState & (1<<sameColumns[pos][i])) !== 0) {
						noMoves = false
					 }
				}
				if(noMoves) {
					return 0;
				}
			}
	
			if(tempDp[gridState][pos][whoseTurn] !== undefined) {
				return tempDp[gridState][pos][whoseTurn];
			}
			//recursive case
			if(whoseTurn === 1) { // 1 -> Y
				let max = Number.NEGATIVE_INFINITY;
				let next = -1;
				for(let i = 0; i < sameColumns[pos].length; i++) {
					if(((gridState & (1<<sameColumns[pos][i])) !== 0)) {
						let temp;
						if((temp = (AI(gridState ^ (1<<sameColumns[pos][i]), sameColumns[pos][i], 0) + array[sameColumns[pos][i]])) > max) {
							max = temp;
							next = sameColumns[pos][i];
						}
					}
				}
				
				tempDp[gridState][pos][whoseTurn] = max;
				tempNMove[gridState][pos][whoseTurn] = next;
				
				return tempDp[gridState][pos][whoseTurn];
			}
			else { //0 -> X
				let min = Number.POSITIVE_INFINITY;
				let next = -1;
				for(let i = 0; i < sameRows[pos].length; i++) {
					if(((gridState & (1<<sameRows[pos][i])) !== 0)) {
						let temp;
						if((temp = (AI(gridState ^ (1<<sameRows[pos][i]), sameRows[pos][i], 1) - array[sameRows[pos][i]])) < min) {
							min = temp;
							next = sameRows[pos][i];
						}
					}
				}
	
				tempDp[gridState][pos][whoseTurn] = min;
				tempNMove[gridState][pos][whoseTurn] = next;
	
				return tempDp[gridState][pos][whoseTurn];
			}
	
		} 

		//filling dp table
		for(let i = 0; i < Math.pow(2, 16); i++) {
			for(let j = 0; j < 16; j++) {
				for(let k = 0; k < 2; k++) {
					if(((~i) & (1<<j)) !== 0) {
						AI(i, j, k);
					}
				}
			}
		}


		let tempArray = [...array];
		tempArray[start] = 100;
		setDp(tempDp);
		setNMove(tempNMove);
		setCurrent(start)
		setCells(tempArray);
		// eslint-disable-next-line
	},[]);

	
	const isSameRow = (i1, i2) => {
		if (sameRows[i2].includes(i1)) {
			return true;
		}
		else
			return false;
	}

	const isSameColumn = (i1, i2) => {
		if (Math.abs(i1 - i2) % 4 === 0) {
			return true;
		}
		else
			return false;
	}

	
	const noMovesLeftX = (arr, pos) => {
		let result = true;
		for(let i = 0; i < sameRows[pos].length; i++) {
			if(arr[sameRows[pos][i]] >= -9 && arr[sameRows[pos][i]] <= 15) {
				result = false;
				break;
			}
		}
		return result;
	}

	const noMovesLeftY = (arr, pos) => {
		let result = true;
		for(let i = 0; i < sameColumns[pos].length; i++) {
			if(arr[sameColumns[pos][i]] >= -9 && arr[sameColumns[pos][i]] <= 15) {
				result = false;
				break;
			}
		}
		return result;
	}

    const Cell = ({ num }) => {
		return <td className = "cell" onClick={() => handleClick(num)} style = {{backgroundColor : selected === num ? "#DAA520" : "", 
		color : selected === num ? "black" : ""}}>{
			cells[num] !== -100 && ((cells[num] === 100) ? <b>**</b> : cells[num])
		}</td>;
	};

	const Info = () => {
		return (
			<div>
				<p><b className = "info" >Turn :  </b> <span className = "digits" > {turn}</span> &emsp; <b className = "info" >
					Player X :  </b> <span className = "digits" > {playerXScore} </span> &emsp; <b className = "info" >Player Y :  
					</b> <span className = "digits" > {playerYScore}</span></p>
			</div>
		);
	}

	const sleep = ms => new Promise(
		resolve => setTimeout(resolve, ms)
	  );

	useEffect(() => {
		if((current !== -1) && ((turn === 'X' && noMovesLeftX(cells, current)) || (turn === 'Y' && noMovesLeftY(cells, current)))) {
			if(playerXScore > playerYScore) {
				setResult("Player X wins!");
			}
			else if(playerXScore < playerYScore) {
				setResult("Player Y wins!");
			}
			else {
				setResult("Draw");
			}
		}
		// eslint-disable-next-line
      },[turn]);

	useEffect(() => {
		if((turn === 'Y') && (Number(choice) === 1)) {
			let mask = 0;
				for(let i = 0; i < 16; i++) {
					if(cells[i] >= -9 && cells[i] <= 15) {
						mask = (mask | (1<<i));
					}
				}
				
				// console.log(mask);
				let move = nMove[mask][current][1];
				// console.log(dp[mask][current][1] + playerYScore - playerXScore, nMove[mask][current][1]);
				
				if(!noMovesLeftY(cells, current)) {
					(async () => {
						setSelected(move);
						await sleep(1000);
						setSelected(-1);
						let squares = [...cells];
						let score = cells[move];
						squares[move] = 100;
						squares[current] = -100;
						setPlayerYScore(temp => temp + score);
						setCurrent(move);
						setCells(squares);
						setTurn('X');
					  })();
				}
		}
		// eslint-disable-next-line
	},[turn, current]);

    const handleClick = num => {
		let squares = [...cells];

		if (turn === 'X') {
			let score = 0;
			if (num !== current && isSameRow(num, current) && squares[num] !== -100) {
				score = cells[num];
				squares[num] = 100;
				squares[current] = -100; 
				setPlayerXScore(temp => temp + score);
				setCurrent(num);
				setCells(squares);
				setTurn('Y');
			}
		}

		else {
			let score = 0;
			if ((num !== current) && isSameColumn(num, current) && (squares[num] !== -100) && Number(choice) === 2) {
				score = cells[num];
				squares[num] = 100;
				squares[current] = -100; 
				setPlayerYScore(temp => temp + score);
				setCurrent(num);
				setCells(squares);
				setTurn('X');
			}
		}

    }

    return (
		<div>
			<nav>
				<button className = "btn btn-warning" onClick = {() => {
					navigate('/maxit');
				}}>Back</button>
				
				<button className = "btn btn-warning" onClick = {() => {
					setHelp(prev => {
						return !prev;
					});
				}}>Help</button>
			</nav>
			{!help &&<div className='container'>
				<Info className = "container-info" />
				<table>
					<tbody>
						<tr>
							<Cell num={0} />
							<Cell num={1} />
							<Cell num={2} />
							<Cell num={3} />
						</tr>
						<tr>
							<Cell num={4} />
							<Cell num={5} />
							<Cell num={6} />
							<Cell num={7} />
						</tr>
						<tr>
							<Cell num={8} />
							<Cell num={9} />
							<Cell num={10} />
							<Cell num={11} />
						</tr>
						<tr>
							<Cell num={12} />
							<Cell num={13} />
							<Cell num={14} />
							<Cell num={15} />
						</tr>
					</tbody>
				</table>
				{result && <h2 className = "result">{result}</h2>}
			</div>}
			<div className = "maxit-help">
				{help && <Help />}
			</div>
		</div>
    );
}


export default Maxit;