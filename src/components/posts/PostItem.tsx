import React from 'react'
import "./styles.scss"
type PostProps = {
    title: string,
    content: string,
    image: string
}

export const PostItem:React.FC<PostProps> = ({content,title,image}) => {

    return (
        <div className="padding-md">

        <div className="post-card">
            <div >
                <img className="img" src={image} alt="imagen-ciego"/>
            </div>
            <div className="spacer"></div>
            <div className="text-content">
                <h3>{title}</h3>
    <p>{content}</p>
            </div>
            
        </div>
        </div>
    )
}
