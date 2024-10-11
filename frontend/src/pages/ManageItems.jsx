import axios from "axios";
import { useEffect, useState } from "react";
import editIcon from "../assets/images/edit.png";
import deleteIcon from "../assets/images/trash.png";
import addIcon from "../assets/images/check.png";
import toast, { Toaster } from "react-hot-toast";

export default function ManageItems() {
  const [database, setDatabase] = useState([]);
  const [item_Number, setitem_Number] = useState();
  const [item_Name, setItem_Name] = useState();
  const [hSN_SAC, setHSN_SAC] = useState();
  const [price, setPrice] = useState();
  const [gST, setGST] = useState();
  const [deleteId, setDeleteId] = useState([]);
  const [editItemNumber, setEditItemNumber] = useState([]);

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
        toast.error(err.response.data.message);
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
        toast.success("Data Added");
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  const updateItems = async () => {
    axios
      .put(
        `${
          import.meta.env.VITE_REACT_SERVER_URL
        }/api/v1/item/edit-item/${deleteId}`,
        {
          // Item_Number: item_Number - 1,
          Item_Name: item_Name,
          HSN_SAC: hSN_SAC,
          Price: price,
          GST: gST,
        }
      )
      .then(function (response) {
        console.log(response);
        setitem_Number(item_Number + 1);
        toast.success("Data Added");
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  const deleteItem = async () => {
    console.log(deleteId);
    axios
      .delete(
        `${
          import.meta.env.VITE_REACT_SERVER_URL
        }/api/v1/item/delete-item/${deleteId}`
      )
      .then(function (response) {
        console.log(response);
        setitem_Number(item_Number + 1);
        toast.success("Item Deleted");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  // const found = Object.values(database).includes(searching);
  // console.log(found)
  // console.log(searching)
  // console.log(database[editItemNumber]?.Item_Name)

  useEffect(() => {
    getItemNumber();
  }, [item_Number]);

  return (
    <>
      <Toaster position="right-corner" reverseOrder={false} />
      <div className="overflow-x-auto w-9/12 m-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl bg-billingBgColor text-white">
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
              <td className="text-center text-xl">{item_Number}</td>
              <td className="h-20">
                <input
                  className="input w-full max-w-xs text-center text-xl"
                  type="text"
                  onChange={(e) => {
                    setItem_Name(e.target.value);
                  }}
                  onFocus={(e) => {
                    (e.target.value = ""), setItem_Name(e.target.value);
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
                  onFocus={(e) => {
                    (e.target.value = ""), setHSN_SAC(e.target.value);
                  }}
                  placeholder="Enter HSN / SAC"
                  required
                />
              </td>
              <td className="h-20">
                <input
                  className="input w-full max-w-xs text-center text-xl"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  onFocus={(e) => {
                    (e.target.value = ""), setPrice(e.target.value);
                  }}
                  placeholder="Enter Price"
                  required
                />
              </td>
              <td className="h-20">
                <input
                  className="input w-full max-w-xs text-center text-xl"
                  type="number"
                  onChange={(e) => setGST(e.target.value)}
                  onFocus={(e) => {
                    (e.target.value = ""), setGST(e.target.value);
                  }}
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
                  <td className="w-28 text-center">{Item_Number}</td>
                  <td className="text-center">{Item_Name}</td>
                  <td className="text-center">{HSN_SAC}</td>
                  <td className="text-center">{Price}</td>
                  <td className="text-center">{GST}</td>
                  <td className="text-center">
                    ₹ {Number(Price) + Number(GST)}
                  </td>
                  <td className="flex flex-row">
                    <button
                      className="btn"
                      onClick={() => {
                        document.getElementById("my_modal_6").showModal(),
                          setEditItemNumber(Item_Number);
                        setDeleteId(_id);
                      }}
                    >
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

      {/* Delete Section */}
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

      {/* Edit Section */}
      <dialog id="my_modal_6" className="modal modal-bottom 4xl:modal-middle ">
        <div className="modal-box flex flex-row">
          {/* <h3 className="font-bold text-lg text-center">Edit Item</h3> */}
          <input
            className="input  w-full max-w-xs text-center text-xl border-2 border-black"
            type="text"
            placeholder="Enter Item Number"
            defaultValue={editItemNumber}
            onChange={() => setEditItemNumber(editItemNumber)}
            required
          />
          <input
            className="input  w-full max-w-xs text-center text-xl"
            type="text"
            placeholder="Enter Name"
            defaultValue={database[database.length - editItemNumber]?.Item_Name}
            onChange={(e) => {
              setItem_Name(e.target.value);
            }}
            required
          />
          <input
            className="input  w-full max-w-xs text-center text-xl"
            type="text"
            placeholder="Enter HSN_SAC"
            defaultValue={database[database.length - editItemNumber]?.HSN_SAC}
            onChange={(e) => setHSN_SAC(e.target.value)}
            required
          />
          <input
            className="input  w-full max-w-xs text-center text-xl"
            type="text"
            placeholder="Enter Price"
            defaultValue={database[database.length - editItemNumber]?.Price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            className="input  w-full max-w-xs text-center text-xl"
            type="text"
            placeholder="Enter GST"
            onChange={(e) => setGST(e.target.value)}
            defaultValue={database[database.length - editItemNumber]?.GST}
            required
          />

          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <div className="flex flex-row m-auto justify-center gap-4">
              <button
                className="btn ml-4"
                onClick={() => {
                  updateItems();
                  window.location.reload();
                }}
              >
                Update
              </button>
              <button className="btn">No</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
