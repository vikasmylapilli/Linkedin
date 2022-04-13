import React  from 'react';
import styledComponents from 'styled-components';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { postArticleAPI } from '../actions';

function PostModal(props) {

        
    const [editorText, setEditorText] = useState('');
    const [shareImage, setShareImage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssetArea] = useState('');

    const handleChange= (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined){
            alert(`not an image, the file is a ${typeof image}`);
            return;
        }
        setShareImage(image)
    }

    const switchAssetArea = (area) =>{
        setShareImage('');
        setVideoLink('');
        setAssetArea(area);
    }

    const postArticle =(e) =>{
        console.log("vikas1")
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }

        const payload ={
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        };
        props.postArticle(payload);
        reset(e)
    };

    const reset =(e)=>{
        setEditorText('');
        setShareImage('');
        setVideoLink('');
        setAssetArea('');
        props.handleClick(e)
    }
  return (
      <>
      { props.showModel === "open" &&
    <Container>
        <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button
                    onClick={(event)=>reset(event)}
                    ><img src="/images/close_icon.svg" alt="" /></button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        
                        {props.user.photoURL? <img src={props.user.photoURL} alt="" /> 
                        :
                        <img src="/images/user.svg" alt="" /> }
                        {props.user.displayName ? <span>{props.user.displayName}</span> : <span>Name</span> }
                        
                    </UserInfo>
                    <Editor>
                        <textarea
                        value={editorText}
                        onChange = {(e)=> setEditorText(e.target.value)}
                        placeholder = "What do you want to talk about?"
                        autoFocus = {true}
                        ></textarea>
                        { assetArea === "image"?
                        <UploadImage>
                            <input 
                            type="file" 
                            accept='image/git, image/jpeg, image/png' 
                            name='image'
                            id="file"
                            style={{display:"none"}}
                            onChange={handleChange}
                            />
                            <p><label htmlFor="file">Select an image for share</label></p>
                            {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" /> }
                            </UploadImage>
                            :
                            assetArea === 'media' &&
                            <>
                            <input 
                            type="text"
                            placeholder='please input a video Link'
                            value={videoLink}
                            onChange={(e)=>setVideoLink(e.target.value)}
                            />
                            {videoLink && <ReactPlayer 
                            width={"100%"}
                            url  = {videoLink}
                            />}
                            </>
                        }
                        
                    </Editor>
                </SharedContent>
                
                <SharedCreation>
                    <AttachAssets>
                        <AssetButton onClick={()=>switchAssetArea("image")}>
                            <img src="/images/image.svg" alt="" />
                        </AssetButton>
                        <AssetButton onClick={()=>switchAssetArea("media")}>
                            <img src="/images/video.svg" alt="" />
                        </AssetButton>
                    </AttachAssets>
                    <SharedComment>
                        <AssetButton>
                            <img src="/images/share_comment.svg" alt="" />
                            Anyone
                        </AssetButton>
                    </SharedComment>
                    <PostButton disabled = {!editorText? true: false} 
                    onClick={(event)=>postArticle(event)}>
                        Post
                    </PostButton>
                </SharedCreation>
        </Content>
    </Container>
}
</>
  )
}

const Container = styledComponents.div`
position: fixed;
top:0;
left:0;
right:0;
bottom:0;
z-index:9999;
color: black;
background-color: rgba(0,0,0,0.8);
animation: fadeIn 0.3s;
`;

const Content= styledComponents.div`
width: 100%;
max-width: 522px;
background-color: white;
max-height: 90%;
overflow: initial;
border-radius: 5px;
position: relative;
display: flex;
flex-direction: column;
top:32px;
margin: 0 auto;
`;

const Header =styledComponents.div`
display:block;
padding:16px 20px;
border-bottom : 1px solid rgba(0, 0, 0, 0.15);
font-size: 16px;
line-height: 2.5;
color : rgba(0,0,0,0.6);
font-weight: 400;
display: flex;
justify-content: space-between;
align-item: center;
button{
    background: transparent;
    border: none; 
    svg, img{
        pointer-events: none;
    }
    
}
`;

const SharedContent = styledComponents.div`
display:flex;
flex-direction: column;
flex-grow: 1;
overflow-y: auto;
verticle-align: baseline;
background: tranparent;
padding:8px 12px;
`;

const UserInfo = styledComponents.div`
display:flex;
align-items:center;
padding: 12px 24px;
svg, img {
    width:48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
}
span{
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
}
`;

const SharedCreation = styledComponents.div`
display: flex;
justify-content: space-between;
padding : 12px 24px 12px 16px;
`;

const AssetButton= styledComponents.button`
display: flex;
align-items: center;
height: 40px;
min-width: auto;
color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets= styledComponents.div`
align-items: center;
display: flex;
padding-right: 8px;
${AssetButton}{
    width: 40px;
}
`;

const SharedComment = styledComponents.div`
padding-left: 8px;
margin-right: auto;
border-left: 1px solid rgba(0, 0, 0, 0.15);
${AssetButton} {
    svg{
        margin-right:10px;
    }
}
`;

const PostButton = styledComponents.button`
display: flex;
justify-content: space-around;
align-items: center;
border-radius:20px;
padding-left: 16px;
padding-right: 16px;
background:${(props)=>(props.disabled ? "rgba(0, 0, 0, 0.8)" : "#0a66c2")};
color:${(props)=>(props.disabled ? "rgba(1, 1, 1, 0.2)" : "white")};
&: hover{
    background: ${(props)=>(props.disabled ? "rgba(0, 0, 0, 0.08)" : "#004182")}
}

`;
    const Editor = styledComponents.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
    }
    input {
        width : 100%;
        height: 35px;
        font-size : 16px;
        margin-bottom: 20px
    }
    `;

    const UploadImage = styledComponents.div`
    text-align:center;
    img{
        width:100%
    }
    `;

const mapStateToprops =(state)=>{
    return {
        user: state.userState.user,
    }
}

const mapDispatchToProps =(dispatch)=>({
    postArticle : (payload) => dispatch(postArticleAPI(payload)),
 
})

export default connect(mapStateToprops, mapDispatchToProps )(PostModal);
