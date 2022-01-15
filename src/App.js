import React from "react"
import "./style.css"
import {nanoid} from "nanoid"
import Die from "./Die"
import Confetti from "react-confetti"
export default function App(){
	const [dice, setdice] = React.useState(allNewDice())

	const [tenzies, setTenzies] = React.useState(false)
	const [score, setscore] = React.useState(0)




	React.useEffect(() => {
        let allHeld = true

        for(let i=0; i<dice.length; i++){
        	if(dice[i].isSelected===false){
        		allHeld = false
        	}
        }
        const firstValue = dice[0].value
        let allSameValue = true
        for(let i=0; i<dice.length; i++){
        	if(dice[i].value!==firstValue){
        		allSameValue = false
        	}
        }
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])



	function reset(){
		setTenzies(false)
		setdice(allNewDice())
		setscore(0)
	}

	function allNewDice(){
		let arr=[]
		for(let i=0; i<10; i++){
			arr.push(generatenewdice())
		}
		return arr
	}

	function generatenewdice(){

		return({
			id: nanoid(),
			value: Math.ceil(Math.random()*6),
			isSelected: false
		})
	} 

	function toggle(givenid){
		const arr = dice.map(item => {
			if(item.id === givenid){
				return({
					...item,
					isSelected : !item.isSelected
				})
			}
			else{
				return item
			}
		})
		setdice(arr)
	}

	const dices = dice.map(item => {
		return(<Die id={item.id} value={item.value} isSelected={item.isSelected} toggle={()=>toggle(item.id)}/>)
	})

	function rolldice(){
		setscore(oldscore=>oldscore+1)
		console.log(score)
		const arr = dice.map(item => {
			if(item.isSelected===true){
				return item
			}
			else{
				return(generatenewdice())
			}
		})
		setdice(arr)
	}

	return(
		<main>
		{tenzies && <Confetti />}
		<h1>Tenzies</h1>
		<p className="inst">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
		<div className="alldices">{dices}</div>
		{tenzies===true ? 
			<button className="roll-button" onClick={()=>reset()}>New Game</button> 
			: 
			<button className="roll-button" onClick={()=>rolldice()}>Roll</button>
		}
		{tenzies===true && <div className="winwords"><h2>YOU WON</h2><h2>Your Score : {score} </h2></div>}
		</main>
		)
}