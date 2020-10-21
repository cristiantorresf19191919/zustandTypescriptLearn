import React, { useState } from 'react'

interface Form {
    title:string;
    content:string;
    image:File;
    closePopup: () => void;
}

const PopupComponent:React.FC<Partial<Form>> = ({closePopup}) => {

    

    const [form, setForm] = useState({
        title: "",
        content: "",
        image: File
    })
    return (
        <div className="popup">
            <p className="closeIcon" onClick={closePopup}>&times;</p>
            <h1>Add a Post</h1>
            <input type="text" placeholder="title"/>
            <br/>
            <input type="content" placeholder="content"/>
            <br/>
            <input type="file" placeholder="imagen"/>
            
        </div>
    )
}

export default PopupComponent
