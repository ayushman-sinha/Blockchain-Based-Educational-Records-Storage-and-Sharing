import React, { useState, useEffect } from 'react';
import '../CSS/RecordPhoto.css';

const RecordPhoto = () => {
    const [galleryData, setGalleryData] = useState([
        {
            id: 1,
            link: "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492108507/articles/2016/10/31/detective-exposed-corruption-then-was-fired-for-eating-candy-at-a-crime-scene/16106-weill-crime-scene-candy-tease_kfquri",
            alt: "Crime Scene 1",
            desc: "Evidence - 1 : Crime Scene"
        },
        {
            id: 2,
            link: "https://ra.ac.ae/wp-content/uploads/2016/06/crime-scene.jpg",
            alt: "Weapon",
            desc: "Exhibit - 1 : Potential Murder Weapon"
        },
        {
            id: 3,
            link: "https://www.crime-scene-investigator.net/images/index-evidence-collection.jpg",
            alt: "Evidence",
            desc: "Exhibit - 2 : Victim's Shoe"
        },
        {
            id: 4,
            link: "https://img-aws.ehowcdn.com/340x221p/photos.demandstudios.com/getty/article/88/64/87676734.jpg",
            alt: "Biological Evidence",
            desc: "Biological Evidence of Suspect"
        }
    ]);

    return (
        <div className="row">
            {galleryData.map(item => (
                <div className="gallery" key={item.id}>
                    <a target="_blank" href={item.link}>
                        <img src={item.link} alt={item.alt} width="600" height="400" />
                    </a>
                    <div className="desc">{item.desc}</div>
                </div>
            ))}
        </div>
    );
};

export default RecordPhoto;
