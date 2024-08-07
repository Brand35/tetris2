import React from "react";
import './App.css'


function Grid({grid}){ //on recupere les propriete en mode destructuring 
    return (
        <div id='grid'>
        {
            grid.map(
                (line , y)=>{
                    return line.map(
                        (col, x )=>{
                            
                            return <span key={x+"-"+y}className={(x===0 )? "first": '' }>0</span>
                        }
                    )
                }
            )
        }
        </div>
    )
}
export default Grid;