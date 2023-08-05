// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import { useNavigate } from "react-router";
import "./table.css";

export default function Table ({ heading, dataBase }) {
  const navigate = useNavigate()

    const test = "-1"

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
        <tbody className="tbody">
            {
              dataBase?
              dataBase.map((data,i)=>
              <tr className="row" key={i}>
                <td>{data.OrderId}</td>
                <td>
                    {
                        data.Status === "-1"?
                        <div className="order-cancelled"><span>ORDER CANCELLED</span></div>
                        :null 
                    }
                    {
                        data.Status === "0"?
                        <div className="order-placed"><span>ORDER PLACED</span></div>
                        :null 
                    }
                    {
                        data.Status === "1"?
                        <div className="order-in-transit"><span>ORDER IN TRANSIT</span></div>
                        :null 
                    }
                    {
                        data.Status === "2"?
                        <div className="order-delivered"><span>ORDER DELIVERED</span></div>
                        :null 
                    }
                </td>
                <td>{data.Amount}</td>
                <td>{data.ModeOfPayment}</td>
                <td className="fit">
                  <span className="actions">
                        <button onClick={()=>{navigate(`/admin/viewOrder/${data.OrderId}`)}}>EDIT <i className="fa-solid fa-pen"></i></button>
                  </span>
                </td>
              </tr> )
              :
              null
            }
        </tbody>
      </table>
    
  );
};