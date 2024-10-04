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
  const [itemData, setItemData] = useState({
    itemNumber: 1,
    itemName: '',
    hSN_SAC: '',
    price: 0,
    gST: 0,
  });

  const getItemNumber = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_SERVER_URL}${import.meta.env.VITE_GET_ITEMS}`);
      setDatabase(response.data.items.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const addItems = async () => {
    const { itemName, hSN_SAC, price, gST } = itemData;
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}${import.meta.env.VITE_ADD_ITEM}`, {
        Item_Number: itemData.itemNumber,
        Item_Name: itemName,
        HSN_SAC: hSN_SAC,
        Price: price,
        GST: gST,
      });
      console.log(response);
      setItemData((prev) => ({
        ...prev,
        itemNumber: prev.itemNumber + 1, // increment item number
        itemName: '',
        hSN_SAC: '',
        price: 0,
        gST: 0,
      }));
      getItemNumber(); // refresh the item list
    } catch (error) {
      console.log(error);
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  // const found = Object.values(database).includes(searching);
  // console.log(found)
  // console.log(searching)

  useEffect(() => {
    getItemNumber();
  }, []);

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
              <td>{itemData.itemNumber}</td>
              <td>
                <input
                  name="itemName"
                  type="text"
                  value={itemData.itemName}
                  onChange={handleInputChange}
              <td> <img className="w-6 m-auto" src={addIcon} alt="" /></td>
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
              <td>
                <input

                  name="hSN_SAC"
                  className="input w-full max-w-xs text-center text-xl"
                  type="number"
                  value={itemData.hSN_SAC}
                  onChange={handleInputChange}
                  placeholder="Enter HSN / SAC"
                  required
                />
              </td>
              <td>
                <input
                  name="price"
                  className="input w-full max-w-xs text-center text-xl"
                  type="number"
                  value={itemData.price}
                  onChange={handleInputChange}
                  placeholder="Enter Price"
                  required
                />
              </td>
              <td>
                <input
                  name="gST"
                  type="number"
                  value={itemData.gST}
                  onChange={handleInputChange}
                  placeholder="Enter GST Number"
                />
              </td>
              <td>
                <span>{Number(itemData.price) + Number(itemData.gST) || 0}</span>
              </td>
              <td>
                <button onClick={addItems}>Submit</button>
              </td>
            </tr>
            {database?.map(({ Item_Number, Item_Name, HSN_SAC, Price, GST }, index) => (
              <tr key={index}>
                <td>{Item_Number}</td>
                <td>{Item_Name}</td>
                <td>{HSN_SAC}</td>
                <td>{Price}</td>
                <td>{GST}</td>
                <td>{Number(Price) + Number(GST)}</td>
              </tr>
            ))}

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
