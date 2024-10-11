import data from "../../../raw.json";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function Billing_Section() {
  const [searchedItem, setSearchedItem] = useState()
  const [searchedData, setSearchedData] = useState([])
  const [selectedName, setSelectedName] = useState([])
  
  console.log(searchedItem)
  const searchItem = async () => {
    axios
    .get(`${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/item/find-items/${searchedItem}`)
      .then(function (response) {
        console.log(response.data.items);
        setSearchedData(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
    <Toaster position="right-corner" reverseOrder={false} />
     <div className="billing-page">
      {/* Billing Information */}
      <div className="billing-info">
        <div className="customer-details">
          <p>
            <strong>Name:</strong> 
            <input type="text" placeholder="Enter Name"/>
          </p>
          <p>
            <strong>Mobile:</strong>
            <input type="number" placeholder="Enter Mobile Number" />
          </p>
        </div>
      </div>

      {/* Billing Table Section */}
        {/* <div className="billing-image">
          <img
            src={calLottieImg}
            alt="Billing Illustration"
          />
        </div> */}
        <div className="m-auto flex flex-col justify-center content-center items-center">
        <input
            className="input  w-full max-w-xs text-center text-xl"
            type="text"
            placeholder="Enter Item Name"
            onChange={(e) => {setSearchedItem(e.target.value);searchItem()}}
            required
          />

          <tbody>
          {searchedData?.map(
                ({Item_Name }, index) => (
                  <tr key={index}>
                    <td className="text-center h-10 text-xl rounded-xl bg-inherit p-2" onClick={()=>setSelectedName(Item_Name)}>
                      {Item_Name}
                    </td>
                  </tr>
                )
              )}
          </tbody>

        </div>

      <div className="billing-content h-96 overflow-auto"> 
        <table className="billing-table">
          <thead className="top-0 sticky">
            <tr>
              <th>Sr.no</th>
              <th>Item Name</th>
              <th>HSN/SAC</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Gst</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {data?.map(
                ({ Item_Number, Item_Name, HSN_SAC, Price, GST }, index) => (
                  <tr key={index}>
                    <td className="text-center h-10 w-32 text-xl rounded-xl bg-inherit p-2">
                      {Item_Number}
                    </td>
                    <td className="text-center h-10 text-xl rounded-xl bg-inherit p-2">
                      {Item_Name}
                    </td>
                    <td className="text-center h-10 text-xl rounded-xl bg-inherit p-2">
                      {HSN_SAC}
                    </td>
                    <td className="text-center h-10 text-xl rounded-xl bg-inherit p-2">
                      1
                    </td>
                    <td className="text-center h-10 text-xl rounded-xl bg-inherit p-2">
                      {Price}
                    </td>
                    <td>{GST}</td>
                    <td>{Price + GST}</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="billing-footer">
        <button className="print-button border-2 rounded-lg font-bold">Generate Bill</button>
        <div className="flex flex-row gap-10">
          <p>
            <span className="text-4xl font-bold">Total Items:</span> 
            <span className="text-4xl font-bold text-yellow-400">$$$</span> 
          </p>
          <p>
            <span className="text-4xl font-bold">Total:</span> 
            <span className="text-4xl font-bold text-yellow-400">0000.00 ₹</span>
          </p>
        </div>
      </div>
    </div>
    </>
   
  )
}
