import axios from "axios";
import { useEffect, useState } from "react";
import editIcon from "../assets/images/edit.png";
import deleteIcon from "../assets/images/trash.png";
import addIcon from "../assets/images/check.png";

export default function ManageItems() {
  const [database, setDatabase] = useState([]);
  const [item_Number, setitem_Number] = useState([]);
  const [item_Name, setItem_Name] = useState([]);
  const [hSN_SAC, setHSN_SAC] = useState([]);
  const [price, setPrice] = useState([]);
  const [gST, setGST] = useState([]);
  const [deleteId, setDeleteId] = useState([]);
  const [searching, setSearching] = useState([]);

  console.log(item_Number);
  const getItemNumber = async () => {
    axios
      .get(`${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/item/get-items`)
      .then((response) => {
        console.log(response.data.items);
        setitem_Number(response.data.items.length + 1);
        setDatabase(response.data.items.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItems = async () => {
    axios
      .post(`${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/item/add-item`, {
        Item_Number: item_Number,
        Item_Name: item_Name,
        HSN_SAC: hSN_SAC,
        Price: price,
        GST: gST,
      })
      .then(function (response) {
        console.log(response);
        setitem_Number(item_Number + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteItem = async () => {
    console.log(deleteId)
    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_SERVER_URL
        }/api/v1/item/delete-item/${deleteId}`
      )
      .then(function (response) {
        console.log(response);
        setitem_Number(item_Number + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const found = Object.values(database).includes(searching);
  // console.log(found)
  // console.log(searching)

  useEffect(() => {
    getItemNumber();
  }, [item_Number]);

  return (
    <>
      <div className="overflow-x-auto w-9/12 m-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl bg-billingBgColor text-white">
              <th className="w-2">
                {/* <label>
                  <input type="checkbox" className="checkbox bg-white" />
                </label> */}
                Select
              </th>
              <th className="w-28">Item Number</th>
              <th className="text-center">Item Name</th>
              <th className="text-center">HSN/SAC</th>
              <th className="text-center">Price</th>
              <th className="text-center">Gst</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <img className="w-6 m-auto" src={addIcon} alt="" />
              </td>
              <td className="text-center text-xl">{item_Number}</td>
              <td className="h-20">
                <input
                  className="input w-full max-w-xs text-center text-xl"
                  type="text"
                  onChange={(e) => {
                    setItem_Name(e.target.value), setSearching(e.target.value);
                  }}
                  placeholder="Enter Item Name"
                  required
                />
              </td>
              <td className="h-20">
                <input
                  className="input w-full max-w-xs text-center text-xl"
                  type="number"
                  onChange={(e) => setHSN_SAC(e.target.value)}
                  placeholder="Enter HSN / SAC"
                  required
                />
              </td>
              <td className="h-20">
                <input
                  className="input w-full max-w-xs text-center text-xl"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Price"
                  required
                />
              </td>
              <td className="h-20">
                <input
                  className="input w-full max-w-xs text-center text-xl"
                  type="number"
                  onChange={(e) => setGST(e.target.value)}
                  placeholder="Enter GST"
                  required
                />
              </td>
              <td className="text-center text-xl">
                <span>₹ {Number(price) + Number(gST) || 0}</span>
              </td>
              <td className="h-20 text-center">
                <button className="btn text-lg" onClick={addItems}>
                  Submit
                </button>
              </td>
            </tr>
            {database?.map(
              ({ Item_Number, Item_Name, HSN_SAC, Price, GST, _id }, index) => (
                <tr key={index} className="hover text-xl text-center">
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td className="w-28 text-center">{Item_Number}</td>
                  <td className="text-center">{Item_Name}</td>
                  <td className="text-center">{HSN_SAC}</td>
                  <td className="text-center">{Price}</td>
                  <td className="text-center">{GST}</td>
                  <td className="text-center">
                    ₹ {Number(Price) + Number(GST)}
                  </td>
                  <td className="flex flex-row">
                    <button className="btn">
                      <img
                        className="w-6 text-center m-auto"
                        src={editIcon}
                        alt=""
                      />
                    </button>
                    <button
                      className="btn ml-2"
                      onClick={() => {
                        document.getElementById("my_modal_5").showModal(),
                          setDeleteId(_id);
                      }}
                    >
                      <img
                        className="w-6 text-center m-auto"
                        src={deleteIcon}
                        alt=""
                      />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
          {/* foot */}
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Item Number</th>
              <th>Item Name</th>
              <th>HSN/SAC</th>
              <th>Price</th>
              <th>Gst</th>
              <th>Amount</th>
            </tr>
          </tfoot> */}
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            This action cannot be reversed
          </h3>
          <p className="py-4 text-center">Are you sure to delete this item?</p>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <div className="flex flex-row m-auto justify-center gap-4">
              <button className="btn" onClick={deleteItem}>
                Yes
              </button>
              <button className="btn">No</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
