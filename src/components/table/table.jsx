// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import { useNavigate } from "react-router";
import "./table.css";

export default function Table ({ heading, dataBase }) {
  const navigate = useNavigate()
  return (
      <table className="table">
        <thead>
          <tr className="heading">
            {
              heading?
              heading.map((data,i)=>
              <th key={i}>{data}</th>
              )
              :null
            }
          </tr>
        </thead>
        <tbody className="tbody ">
            {
              dataBase?
              dataBase.map((data,i)=>
              <tr className="row" key={i}>
                <td>{data.ProductId}</td>
                <td>{data.Name}</td>
                <td>{data.Amount}</td>
                <td className="fit">
                  <span className="actions">
                        <button onClick={()=>{navigate(`/admin/editProduct/${data.ProductId}`)}}>EDIT <i className="fa-solid fa-pen"></i></button>
                  </span>
                </td>
              </tr> )
              :null 
            }
        </tbody>
      </table>
    
  );
};