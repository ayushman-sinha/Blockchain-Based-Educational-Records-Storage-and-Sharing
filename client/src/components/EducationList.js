import React, { useEffect, useState } from 'react';
import ViewRecord from './ViewRecord';
import { Link } from 'react-router-dom';
import SimpleStorageContract from '../contracts/SimpleStorage.json';
import getWeb3 from '../utils/getWeb3';
import '../CSS/StudentList.css';

const EducationList = () => {
  const [details, setDetails] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Get network provider and web3 instance.
        const web3Instance = await getWeb3();

        // Use web3 to get the user's accounts.
        const accountsArray = await web3Instance.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setWeb3(web3Instance);
        setAccounts(accountsArray);
        setContract(contractInstance);

        // Fetch and set initial data
        getVal(contractInstance, accountsArray[0]);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };

    initWeb3();
  }, []);

  const getVal = async (contractInstance, account) => {
    try {
      const response2 = await contractInstance.methods.getAllrecordDetails(account).call();
      setDetails(response2);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const records = details.length ? (
    details.map((arr) => {
      console.log(arr);
      if (arr.record_id !== 0) {
        const toLink = `/educationUpdate/${arr.record_id}`;
        return (
          <div className="card" key={arr.record_id}>
            <div className="row listItem">
              <div className="col s3 black-text">
                <h6>{arr.record_id}</h6>
              </div>
              <div className="col s3 black-text">
                <h6>{arr.record_code}</h6>
              </div>

              <div className="col s3 black-text">
                <h6>{arr.description}</h6>
              </div>
              <div className="col s3 black-text">
                <h6>{arr.timestamp}</h6>
              </div>
            </div>
            <Link to={toLink}>
              <button type="button" className="dropbtn1">
                Add
              </button>
            </Link>
          </div>
        );
      }
      return null;
    })
  ) : (
    <div className="error">
      <h3>No Records!</h3>
    </div>
  );

  return <div className="notes">{records}</div>;
};

export default EducationList;
