import React from 'react'
import {useMountedFetch, fetchTimes} from "./fetch.jsx";
import { Times } from './times.jsx'

export default function OrderDialog(props) {
    // console.log(props.menuItems ?? "Sucketh")
    let [amounts, setAmounts] = React.useState([])
    let [totalCost, setTotalCost] = React.useState(0)

    function hideDialog() {
        props.setDialogDisplay(!props.showDialog)
    }

    function updateTotalCost(newVal, i) {
        amounts[i] = parseInt(newVal)
        let newTotal = amounts.reduce((x, z) => x + z)
        setAmounts(amounts)
        setTotalCost(newTotal)
    }

    return (
        <div>
            {props.showDialog ? (
                <dialog id="order-dialog" style={{display: 'flex'}}>
                    <span className={"close-button topright"} onClick={hideDialog}>&times;</span>
                    <p id={"order-dialog-header"}>Complete your order</p>
                    {props.menuItems.map((az, i) => {
                        amounts.length < props.menuItems.length ? amounts.push(0) : ""
                        return(
                            <div className={"order-dialog-option-container"}>
                                <h3 className={"menu-option-title"} style={az.style}>{az.name}</h3>
                                <input id={`${az.id}-order-amount`} className={"amount-input"} type={"number"}
                                       defaultValue={0} min={0}
                                       max={12} step={1} onChange={event => updateTotalCost(event.target.value, i)}/>
                            </div>
                        )
                    })}
                    <div id='time-selection-container'>
                        <p id='time-selection-banner'>
                            Pickup Date and Time
                        </p>
                        <Times/>
                    </div>
                    <p className="total-cost">Total cost for deliciousness: ${totalCost*6}</p>
                    <button onClick=''>Confirm</button>
                </dialog>
            ) : (<div></div>)}
        </div>
    )
}
