import React from 'react';
import ViewCaseNav from './Navbar/ViewDocNav.js';
import RecordPhoto from './RecordPhoto';

const ViewRecord = (props) => {
    const recordId = props.routeParams.recordId;
    console.log(props);

    return (
        <div>
            <ViewCaseNav recordId={recordId} />
            <div className="">
                <RecordPhoto />
            </div>
        </div>
    );
};

export default ViewRecord;
