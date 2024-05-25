import React, {useEffect} from 'react'
import './css/orders.css'

export function Orders(props) {
    let [orders, setOrders] = React.useState([])

    useEffect(() => {
        if (props.isAuthenticated) {
            const getOrders = async() => {
                let req = {method: 'GET', headers: {"Content-Type": "application/json"}};
                let response = await fetch(`${window.location.origin}/api/orders`, req)
                response = await response.json()
                console.log(response)
                setOrders(response.orders)
            }
            getOrders()
        }
        return () => {

        }
    }, [props.isAuthenticated])

    const tableHeaders = <tr className="headers"><th>Order ID</th><th>Time Ordered</th><th>Name on Order</th><th>Pickup Time</th><th>Details</th><th>Total Cost</th><th>&nbsp;</th></tr>

    return(
        <main>
            <br />
            {props.isAuthenticated && orders && (
                <table className="orders">
                    <thead>
                    {tableHeaders}
                    </thead>
                    <tbody>
                    {orders.map((order) => {
                        return(
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.name_on_order}</td>
                                <td>{order.time}</td>
                                <td>{order.pickup_time}</td>
                                <td>{order.items.reduce((curr, item) => {
                                    return curr + item.id + " " + item.amount
                                }, "")}</td>
                                <td>{order.total_cost}</td>
                                <td><button>Cancel Order</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )}
        </main>
    )
}