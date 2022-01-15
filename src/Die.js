import React from "react"
export default function Die(props){
	const styles = {
		backgroundColor: props.isSelected === true ? "#59E391" : "white"
	}
	return(
		
		<div style={styles} className="single-dice" onClick={props.toggle}>
		<div className="die-num">{props.value}</div>

		</div>
		)
}