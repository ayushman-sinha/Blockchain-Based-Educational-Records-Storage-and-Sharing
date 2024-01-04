import React, { useState, useEffect } from 'react';
import RecordDetailsNav from './Navbar/ViewEducation.js';
import RecordPhoto from './RecordPhoto';

import EducationContract from "../contracts/EducationContract.json";
import getWeb3 from "../utils/getWeb3";

import ipfs from '../ipfs';

const RecordDetails = ({ routeParams }) => {
  const [ipfsHash, setIpfsHash] = useState('');
  const [buffer, setBuffer] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [record_id, setRecordId] = useState('');
  const [address, setAddress] = useState('');
  const [record_name, setRecordName] = useState('');
  const [desc, setDesc] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = EducationContract.networks[networkId];
        const instance = new web3.eth.Contract(
          EducationContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
        runExample();
        onGetDate();
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };

    init();
  }, []);

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      console.log('buffer', buffer);
    };
  };

  const onSubmit = (event) => {
    event.preventDefault();
    ipfs.files.add(buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log({ record_id, address, record_name, desc, timestamp, ipfsHash: result[0].hash });
      contract.methods.addReport(record_id, address, record_name, desc, timestamp, result[0].hash)
        .send({ from: accounts[0] });
    });
  };

  const getVal = async () => {
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    setIpfsHash(response);

    console.log("ipfsHash: " + ipfsHash);
  };

  const getImg = () => {
    var url = `https://ipfs.io/ipfs/${ipfsHash}`;
    window.location = url;
  };

  const onGetDate = () => {
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    var hour = (date.getHours() + 100).toString().substring(1);
    var mins = (date.getMinutes() + 100).toString().substring(1);
    var sec = (date.getSeconds() + 100).toString().substring(1);

    setTimestamp(`${year}-${month}-${day} ${hour}:${mins}:${sec}`);
  };

  var recordId = routeParams.recordId;
  
  return (
    <div>
      <RecordDetailsNav recordId={recordId} />
      <h4 className="title-styled" style={{ marginTop: "40px", marginLeft: "235px", marginBottom: "25px" }}>Upload Education Reports</h4>
      <div className="container">
        <form onSubmit={onSubmit} id="donateForm" className="donate-form">
          {/* ...rest of your component */}
        </form>
      </div>
    </div>
  );
};

export default RecordDetails;
