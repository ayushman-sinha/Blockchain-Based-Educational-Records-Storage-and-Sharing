import React from 'react';
import knife from '../../Images/knife.jpg';
import '../../CSS/Education.css';

const Educational = (props) => {
    const report = [
        {
            exhibitId: 101,
            name: "Knife",
            description: "A 3 and a quarter-inch wooden hilt dagger.",
            imageURL: require('../../Images/knife.jpg').default,
        }
    ];

    const reportId = props.match.params.reportId;
    console.log(report[0].imageURL);

    return (
        <div className="container signInCard center">
            <div className="card setCardWidth">
                <div className="card-image ">
                    <img src={knife} alt="Notes" className="cardImageHeight" />
                </div>
                <div className="signInContainer card-content">
                    <h4 className="grey-text card-title">Educational Report</h4>
                </div>
            </div>
        </div>
    );
};

export default Educational;
