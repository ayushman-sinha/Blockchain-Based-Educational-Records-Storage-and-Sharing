import React, { useState, useEffect } from 'react';
import ViewRecord from './ViewRecord';
import { Link } from 'react-router';
import EducationContract from "../contracts/EducationContract.json";
import getWeb3 from "../utils/getWeb3";

import '../CSS/StudentList.css';

const RecordList = () => {
  const [details, setDetails] = useState([]);
  const [getDetailsOf, setGetDetailsOf] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const web3Instance = await getWeb3();
        const userAccounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = EducationContract.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          EducationContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setWeb3(web3Instance);
        setAccounts(userAccounts);
        setContract(contractInstance);

        // Fetch data from the contract
        const response2 = await contractInstance.methods.getAllrecordDetails(userAccounts[0]).call();
        setDetails(response2);

      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const records = details.length ? (
    details.map((arr) => {
      if (arr.record_id !== 0) {
        const toLink = `http://127.0.0.1:5001/ipfs/bafybeianwe4vy7sprht5sm3hshvxjeqhwcmvbzq73u55sdhqngmohkjgs4/#/explore/${arr.ipfsHash}`;
        const download = `http://localhost:8080/ipfs/${arr.ipfsHash}`;

        return (
          <div className="card" key={arr.record_id}>
            <div className="row listItem">
              <div className="col s3 black-text">
                <h6>{arr.record_id}</h6>
              </div>
              <div className="col s3 black-text">
                <h6>{arr.record_name}</h6>
              </div>
              <div className="col s3 black-text">
                <h6>{arr.description}</h6>
              </div>
              <div className="col s3 black-text">
                <h6>{arr.timestamp}</h6>
              </div>
            </div>
            <a href={toLink}>
              <button type="button" className="dropbtn1">IPFS</button>
            </a>
            <a href={download}>
              <button type="button" className="dropbtn1">Download</button>
            </a>
          </div>
        );
      }
    })
  ) : (
    <div className="error">
      <h3>No records!</h3>
    </div>
  );

  return (
    <div className="notes">
      {records}
    </div>
  );
};

export default RecordList;
