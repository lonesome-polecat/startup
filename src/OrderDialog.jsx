import React from 'react'
import {useMountedFetch, fetchTimes} from "./fetch.jsx";
import { Times } from './times.jsx'

export default function OrderDialog(props) {
    // console.log(props.menuItems ?? "Sucketh")
    const [selectedDate, setSelectedDate] = React.useState('')
    const [selectedTime, setSelectedTime] = React.useState('')
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

    async function makeOrder() {
        let reqBody = {}
        let orderItems = []
        let totalOrderCost = 0
        props.menuItems.forEach((item, i) => {
            if (amounts[i] === 0) {
                return
            }
            let orderItem = {}
            orderItem.id = item.id
            orderItem.price = item.price
            orderItem.amount = amounts[i]
            totalOrderCost += orderItem.price * orderItem.amount
            orderItems.push(orderItem)
        })
        reqBody.items = orderItems
        let username = window.localStorage.getItem("username")
        reqBody.id = username + "_" + window.localStorage.getItem(`${username}_order_count`)
        reqBody.name_on_order = username
        reqBody.time = new Date(Date.now()).toDateString()
        reqBody.pickup_time = selectedTime + " " + selectedDate
        reqBody.total_cost = totalOrderCost
        let headers = {method: 'POST', headers: {"Content-Type": "application/json"}, body:JSON.stringify(reqBody)}
        let response = await fetch('/api/order', headers)
        response = await response.json()
        if (response.status === 200) {
            alert('You successfully made an order!')
            hideDialog()
        } else {
            alert('Error: unable to create order')
        }
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
                        <Times selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>
                    </div>
                    <p className="total-cost">Total cost for deliciousness: ${totalCost*6}</p>
                    <button onClick={makeOrder}>Confirm</button>
                </dialog>
            ) : (<div></div>)}
        </div>
    )
}
