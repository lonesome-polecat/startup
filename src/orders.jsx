import React, {useEffect} from 'react'
import './css/orders.css'

export function Orders(props) {
    let [orders, setOrders] = React.useState([])
    let [reload, setReload] = React.useState(false)

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
    }, [props.isAuthenticated, reload])

    async function cancelOrder(orderId) {
        let req = {method: 'DELETE', headers: {"Content-Type": "application/json"}};
        let response = await fetch(`${window.location.origin}/api/order/${orderId}`, req)
        response = await response.json()
        if (response.status === 200) {
            alert('Successfully deleted order!')
            setReload(!reload)
        } else {
            alert('Error: unable to delete order')
        }
    }

    const tableHeaders = <tr className="headers"><th>Order ID</th><th>Time Ordered</th><th>Name on Order</th><th>Pickup Time</th><th>Details</th><th>Total Cost</th><th>&nbsp;</th></tr>

    return(
        <main>
            <br />
            {props.isAuthenticated ? orders.length === 0 ? (<p>Looks like you haven't made any orders yet</p>) : (
                <table className="orders">
                    <thead>
                    {tableHeaders}
                    </thead>
                    <tbody>
                    {orders.map((order) => {
                        return(
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.time}</td>
                                <td>{order.name_on_order}</td>
                                <td>{order.pickup_time}</td>
                                <td>{order.items.reduce((curr, item) => {
                                    return curr + item.id + " " + item.amount
                                }, "")}</td>
                                <td>{order.total_cost}</td>
                                <td><button onClick={(event) => {cancelOrder(order.id)}}>Cancel Order</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            ) : (
                <p>You must login to see your orders</p>
            )}
        </main>
    )
}