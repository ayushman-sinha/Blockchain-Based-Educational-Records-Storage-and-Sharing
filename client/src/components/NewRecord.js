import React, { useState, useEffect } from 'react';
import '../CSS/newRecord.css';
import GenericNavbar from './Navbar/GenericNavbar';

import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";

const NewRecord = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [recordData, setRecordData] = useState({
    record_id: '',
    address: '',
    timestamp: '',
    record_code: '',
    description: ''
  });

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        const accountsArray = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setWeb3(web3Instance);
        setAccounts(accountsArray);
        setContract(contractInstance);
        onGetDate();
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };

    initWeb3();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    onGetDate();
    console.log(recordData);
    contract.methods.addrecordReport(
      recordData.record_id,
      recordData.address,
      recordData.timestamp,
      recordData.record_code,
      recordData.description
    ).send({ from: accounts[0] });
  };

  const onGetDate = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    const hour = (date.getHours() + 100).toString().substring(1);
    const mins = (date.getMinutes() + 100).toString().substring(1);
    const sec = (date.getSeconds() + 100).toString().substring(1);

    setRecordData((prevData) => ({
      ...prevData,
      timestamp: `${year}-${month}-${day} ${hour}:${mins}:${sec}`
    }));
  };

  return (
    <div className="">
      <GenericNavbar />
      <div className="container">
        <div className="row">
          <div className="col s6">
            <div className="card reportCard">
              <div className="card-title cardTitle2">
                <h4 className="cardTitle">New Record</h4>
              </div>
              <div className="card-content">
                <form onSubmit={onSubmit}>
                  <div className="input-field">
                    <input
                      type="text"
                      id="recodId"
                      value={recordData.record_id}
                      onChange={(evt) => setRecordData({ ...recordData, record_id: evt.target.value })}
                      required
                    />
                    <label htmlFor="email">Student ID</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      id="address"
                      value={recordData.address}
                      onChange={(evt) => setRecordData({ ...recordData, address: evt.target.value })}
                      required
                    />
                    <label htmlFor="email">Institute Address</label>
                  </div>
                  <div className="input-field">
                    <input
                      value={recordData.timestamp}
                      type="text"
                      id="timestamp"
                      readOnly
                      onChange={(evt) => setRecordData({ ...recordData, timestamp: evt.target.value })}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      id="offCode"
                      value={recordData.record_code}
                      onChange={(evt) => setRecordData({ ...recordData, record_code: evt.target.value })}
                      required
                    />
                    <label htmlFor="offCode">Record Name</label>
                  </div>

                  <div className="form-submit center">
                    <button type="submit" className="dropbtn1" style={{ marginTop: "10px" }}>Upload to Blockchain</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col s6">
            <div className="card reportCard">
              <div className="card-title cardTitle">
                <h4 className="cardTitle">Enter Description</h4>
              </div>
              <div className="card-content">
                <div className="input-field ">
                  <textarea
                    id="report"
                    className="textAreaHeight"
                    value={recordData.description}
                    onChange={(evt) => setRecordData({ ...recordData, description: evt.target.value })}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRecord;
