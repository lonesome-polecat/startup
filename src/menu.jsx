import React from 'react'
import { useMountedFetch, importImg } from './fetch.jsx'
import Image from './Image.jsx'
import OrderDialog from './OrderDialog.jsx'

export function Menu(props) {
    let [showDialog, setDialogDisplay] = React.useState(false)
    let [loading, setLoading] = React.useState(true)
    let menuData = useMountedFetch('/api/menu', {headers: {'Content-Type': 'application/json'}}, setLoading)

    function buttonClickHandler(event) {
        setDialogDisplay(!showDialog)
    }

   return(
       <main className="menu">
           {loading ? (<p>Loading menu...</p>) : (
               <div>
                   <OrderDialog showDialog={showDialog} setDialogDisplay={setDialogDisplay} menuItems={menuData.menu_items}/>
                   <br />
                   <p style={{textAlign: "center"}}>Our weekly pics!</p>
                   <div id="menu-container">
                       {menuData.menu_items.map(az => {
                           return(
                               <div className={"menu-option"} key={az.name}>
                                   <h3 className={"menu-option-title"} style={az.style}>{az.name}</h3>
                                   <Image path={az.img} alt={az.name} width={300} height={300} />
                               </div>
                           )
                       })}
                   </div>
                   <div id="make-order-button-container">
                       <button id="make-order" onClick={buttonClickHandler}>Order Now</button>
                   </div>
               </div>
           )}
       </main>
   )
}