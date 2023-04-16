import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

//The following two imports are used to create the toasts
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//The following three imports are used in the export menu
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

//This is used in the csv export
import { CSVLink } from "react-csv";

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

function Index() {
    //The following three state variables are used in creating new item objects  
    let [itemName, setItemName] = useState('');
    let [expireDate, setExpireDate] = useState('');
    let [inputTotal, setInputTotal] = useState(1);

    //The following two state variables are used to decrement and increment the input total
    let decrementInputTotal = () => setInputTotal(inputTotal - 1);
    let incrementInputTotal = () => setInputTotal(inputTotal + 1);

    //This array stores the headers used in creating a csv file (depicting the item collection) for export
    const headers = [
      {label: 'Name', key: 'name'},
      {label: 'Expiration', key: 'expiration'},
      {label: 'Total', key: 'total'}
    ];

    //This state variable stores all the documents found in the items collections
    let [itemList, setItemList] = useState([]);

    //This refreshes the "Items in Collection" table on start-up
    useEffect(() => {
      itemArrayRefresh();
    }, []);

    //This state variable is used in creating the export menu
    const [anchorEl, setAnchorEl] = React.useState(null);

    /********************************* TOASTS ***********************************/

    //This function uses react-toastify to create a success toast at the top right of the web page
    function successNotify() {
      toast.success('Submitted!');
    }

    /*
    *This function uses react-toastify to create a failure toast at the top right of the web page.  For
    *the time being, this toast is only used to warn the user that their item total is below the
    *value 1.  My original plan was to have multiple failure toasts (i.e when the user inputs a duplicate
    *item, inputs invalid characters, etc.).
    */
    function failureNotify() {
      toast.success('Totals below 1 are prohibited!');
    }

    /****************************************************************************/




    /************************ General Purpose Functions *************************/

    //This function is used to disply the input total value
    function Display(props) {
      return (
        <label style={{ marginLeft: '.5rem'}} >{props.message}</label>
      )
    }

    /*
    *This function is used to refresh the "Items in Collection" section.  I call this after every add,
    *delete, and in-line edit to item totals.  Regarding planned features, this would have also been used
    *in doing other in-line edit functions and loading other tables.
    */
    function itemArrayRefresh() {
      fetch('http://localhost:3000/api/items')
      .then(response => response.json())
      .then(item => {
        setItemList(item);
        itemArrayRefresh();
      });
    }

    /****************************************************************************/




    /*************************** Add, Delete, Update ****************************/

    //This function is used to add new items accord to the item schema
    function addItem() {
      fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: itemName, expiration: expireDate, total: inputTotal }),
      });
    }

    //This function is used to delete items.  These items are identified by their _id value.
    function deleteItem(props) {
      fetch(('http://localhost:3000/api/items/' + props), {
        method: 'DELETE'
      });
      itemArrayRefresh();
    }

    /*
    *This function is used to update the inline total value.  The function take the object and
    *and a boolean value.  The boolean is used to determine whether the user clicked the 
    *-1 or +1 button.  Depending on the button click, 1 is subtracted or added. 
    */
    function updateInLineTotal(props, neg) {
      let inLineTotal = props.total;
      if (neg) {
        inLineTotal -= 1;
      }
      else {
        inLineTotal += 1;
      }
      fetch(('http://localhost:3000/api/items/' + props._id), {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ total: inLineTotal}),
      });
      itemArrayRefresh();
    }

    /****************************************************************************/




    /********************************* EXPORTS ***********************************/
    
    /*
    *This function is used in creating the export menu.  Specifically, it allows the user to close the
    *menu window by clicking outside the menu.
    */
    const handleClose = () => {
      setAnchorEl(null);
    };
      
    //This function is used in creating the export menu.  Specifically, it allows the user to click items.
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    //This function is used to export a json file to the user's downloads
    function exportJSON() {
      const jsonVer = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(itemList)
      )}`;
      const jsonLink = document.createElement("a");
      jsonLink.href = jsonVer;
      jsonLink.download = "data.json";
  
      jsonLink.click();
    }

    /****************************************************************************/




    return (
      <div>
        <Head>
          <title>Major Domo</title>
          <meta
            name="description"
            content="This is an inventory app that can be used for managing a pantry."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 style={{ fontSize: '90px', fontWeight: '700' }}>Major Domo</h1>
        <line-style>
          <main
            style={{
              border: 'solid',
              textAlign: 'center',
              margin: 'auto',
              fontSize: '44px',
              fontWeight: '400',
            }}
          >
          {
              <>
                <h3>Input an Item</h3>
                <ToastContainer
                  position='top-right'
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme='light'
                />
                <input
                  type="text"
                  style={{ fontSize: '30px' }}
                  placeholder="*Item Title*"
                  value={itemName}
                  onChange={(e) => setItemName(itemName = e.target.value)}
                />
                <input
                  type="text"
                  style={{ fontSize: '30px' }}
                  placeholder="*Expiration Date*"
                  value={expireDate}
                  onChange={(e) => setExpireDate(e.target.value)}
                />
                <div>
                  Total Number: 
                  <button style={{ marginLeft: '.5rem'}} onClick={decrementInputTotal}>
                    -1
                  </button>

                  <Display message={inputTotal}/> 
                  
                  <button style={{ marginLeft: '.5rem'}} onClick={incrementInputTotal}>
                    +1
                  </button>
                </div>
                <button
                  type="button"
                  style={{ fontSize: '30px' }}
                  onClick={() => {
                    if (inputTotal > 0) {
                      addItem();
                      successNotify();
                      setItemName('');
                      setExpireDate('');
                      setInputTotal(1);
                    }
                    else {
                      failureNotify();
                    }
                  }}
                >
                  Submit
                </button>
              </>
            }
            {
              <>
                <h3
                style={{
                  border: 'solid'
                }}>
                  Items in Collection:
                </h3>
                <Button
                  variant="contained"
                  disableElevation
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Export
                </Button>
                <Menu
                  keepMounted
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  open={Boolean(anchorEl)}
                >
                  <MenuItem>
                    <CSVLink data={itemList} headers={headers} filename={'itemlist.csv'} target='_blank' style={{ color: 'black' }}>Export to CSV</CSVLink>
                  </MenuItem>
                  <MenuItem onClick = {() => exportJSON()} style={{ color: 'black' }}>Export to JSON</MenuItem>  
                </Menu>
                <div>
                  <table>
                    <tr>
                      <th>Name</th>
                      <th>Expiration</th>
                      <th>Total</th>
                    </tr>
                    {itemList.map((val, key) => {

                      return (
                        <tr key={key}>
                          <td>{val.name}</td>
                          <td>{val.expiration}</td>
                          <td>{val.total}</td>
                          <td>
                            <button type="button" onClick={(event) => {updateInLineTotal(val, true);}}>
                              -1
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={(event) => {updateInLineTotal(val, false)}}>
                              +1
                            </button>
                          </td>
                          <td>
                            <button type="button" onClick={(event) => deleteItem(val._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </table>
                </div>
              </>
            }
          </main>
        </line-style>
      </div>
    );
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default Index;
