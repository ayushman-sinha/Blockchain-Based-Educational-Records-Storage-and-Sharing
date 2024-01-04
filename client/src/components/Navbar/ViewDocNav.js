import React from 'react';
import { Link } from 'react-router-dom';

const ViewDocNav = (props) => {
    const { recordId } = props;
    const url = `/recordData/Education/${recordId}`;

    return (
        <nav className="nav-wrapper grey darken-4 navbar">
            <div className="container">
                <b><Link to="/" className="brand-logo">Records</Link></b>
                <ul className="right">
                    <li><Link to="">Record Details</Link></li>
                    <li><Link to={url}>Education Reports</Link></li>
                    <li><Link to="">Other Reports</Link></li>
                    <li><Link to="">Record Photographs</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default ViewDocNav;
