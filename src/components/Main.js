import React from 'react'
import styledComponents from 'styled-components'
import PostModal from "./PostModal"
import { useState } from 'react'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getArticlesAPI } from '../actions';
import articleReducer from '../reducers/articleReducer';
import ReactPlayer from 'react-player';

function Main(props) {

    const [showModel, setShowModel ] = useState('close');

    useEffect(()=>{
        props.getArticles();
    },[])

    const handleClick= (e)=>{
        e.preventDefault();

        if(e.target !== e.currentTarget){
            return;
        }

        switch(showModel){
            case "open":
                setShowModel("close");
                break;
            
            case "close":
                setShowModel("open");
                break;
            
            default:
                setShowModel("close");
                break;
        }
    }
   return (
       <>
       
        { 
        props.articles.length === 0?
        <p>There are no articles</p>
        :
    <Container>
        <SharedBox>
            <div>
            { props.user && props.user.photoURL ?
            (<img src={props.user.photoURL} alt="" />)
            :
            (<img src="/images/user.svg" alt="" />)
            }
                <img src="/images/user.svg" alt="" />
                <button
                onClick={handleClick}
                disabled= {props.loading? true : false}
                >Start a post</button>
            </div>
            <div>
                <button>
                    <img src="/images/photo-icon.svg" alt="" />
                    <span>Photo</span>
                </button>
                <button>
                    <img src="/images/video-icon.svg" alt="" />
                    <span>Video</span>
                </button>
                <button>
                    <img src="/images/event.svg" alt="" />
                    <span>Event</span>
                </button>
                <button>
                    <img src="/images/article.svg" alt="" />
                    <span>Write article</span>
                </button>
            </div>
        </SharedBox>
        <Content>
            {
                props.loading && <img src="/images/spinnin_logo.svg" alt="" style={{width:"60px"}}/>
            }
            {
                props.articles.map((article, key)=>(
                    <Article key={key}>
                <SharedActor>
                    <a>
                        <img src={article.actor.image} alt="" />
                        <div>
                            <span>{article.actor.title}</span>
                            <span>{article.actor.description}</span>
                            <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                        </div>
                    </a>
                    <button>
                        <img src="/images/ellipsis.svg" alt="" />
                    </button>
                </SharedActor>
                <Description>
                    {article.description}
                </Description>
                <SharedImg>
                    <a>
                        {
                        !article.sharedImg && article.video ? (<ReactPlayer width={'100%'} url={article.video}/>)
                        :(
                        article.sharedImg && <img src ={article.sharedImg}/>
                        )
                        }
                    </a>
                </SharedImg>
                <SocialCounts>
                    <li>
                        <button>
                            <img src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" />
                            <img src="https://static-exp1.licdn.com/sc/h/3wqhxqtk2l554o70ur3kessf1" />
                            
                            <span>75</span>
                        </button>
                    </li>
                    <li>
                        <a>{article.comments} </a>
                    </li>
                </SocialCounts>
                <SocialActions>
                    <button>
                        <img src="/images/like.svg" alt="" />
                        <span>Like</span>
                    </button>
                    <button>
                        <img src="/images/comment.svg" alt="" />
                        <span>Comment</span>
                    </button>
                    <button>
                        <img src="/images/send.svg" alt="" />
                        <span>Share</span>
                    </button>
                    <button>
                        <img src="/images/share.svg" alt="" />
                        <span>Send</span>
                    </button>
                </SocialActions>
                
            </Article>
            ))
            }
        </Content>
        <PostModal 
        showModel = {showModel}
        handleClick = {handleClick}
        />
    </Container>
}</>
  )
}
const Container = styledComponents.div`
grid-area: main;
`;


const CommonCard = styledComponents.div`
text-align: center;
overflow: hidden;
margin-bottom:8px;
background-color: #fff;
border-radius: 5px;
position: relative;
border: none;
box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`;


const SharedBox = styledComponents(CommonCard)`
display: flex;
flex-direction: column;
color: #958b7b;
margin: 0 0 8px;
background: white;



div{
    button{
        outline:none;
        color: rgba(0,0,0,0.6);
        font-size: 14px;
        line-height: 1.5;
        min-height: 48px;
        background: transparent;
        border: none;    
        display: flex;
        align-items: center
    }
    &: first-child{
        display: flex;
        align-items: center;
        padding: 8px 16px 0px 16px;
        img{
            width: 48px;
            border-radius: 50%;
            margin-right: 8px;
        }
        button{
            margin: 4px 0;
            flex-grow: 1;
            padding-left: 16px;
            border: 1px solid rgba(0, 0, 0, 0.15 );
            border-radius: 35px;
            background-color: white;
            text.align: left;

        }
    }
    &: nth-child(2){
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-bottom: 4px;
        button{
            img{
            margin: 0 4px -2px;
            width: 40px;
            height:40px;
            @media(max-width:768px){
                width: 20px;
            height:20px;
            }
        }
        span{
            color: #70b5f9;
            }
        }
    }
}
`;

const Article = styledComponents(CommonCard)`
padding:0;
margin: 0 0 8px;
overflow: visible; 
`;

const SharedActor = styledComponents.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display : flex;
    a{
        margin-right:12px;
        flex-grow:1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img{
            width: 48px;
            height:48px;
        }
        & > div {
            display: flex;
            flex-direction: column;
            flex-frow: 1;
            flex- basis: 0;
            margin-left: 8px;
            overflow: hidden;
        }
        span {
            text-align : left;
            &:first-child{
                font-size: 14px;
                font-weight:700;
                color: rgba(0, 0, 0, 1);

            }
        &:nth-child(n+1){
            font-size: 12px;
            color: rgba(0, 0, 0, 0.6)
            }
        }
    }
    button {
        position: absolute;
        right: 12px;
        top:-2px;
        background: transparent;
        border: none;
        outline: none;
        
    }
`;

const Description =  styledComponents.div`
padding: 0 16px;
overflow: hidden;
color: rgba(0, 0, 0, 0.9);
font-size: 14px;
text-align: left;
`;

const SharedImg =  styledComponents.div`
margin-top: 8px;
width: 100%;
display: block;
position: relative;
background-color: #f9fafb;
img {
    object-fit : contain;
    width:100%;
    height:100%;

}
`;

const SocialCounts = styledComponents.div`
line-height:1.3;
display: flex;
list-style-type: none;
align-item: flex-start;
overflow: auto;
margin: 0 16px;
padding: 8px 0;
border-bottom: 1px solid #dedce0;
li{
    margin-right:5px;
    font-size: 12px;
    button {
        display: flex;
    }
}

`;
const SocialActions = styledComponents.div`
align-items: center;
display: flex;
justify-content: space-between;
margin: 0;
min-height: 40px;
padding:4px 15px;
    @media(min-width:768px){
        padding:4px 100px;
    }

button{
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 8px;
    color:#0a66c2;
    @media(min-width:768px){
        span{
            margin-left: 8px;
        }
    }

}
`;

const Content = styledComponents.div`
text-align:center;
& > img {
    width:30px;
}
`;

const mapStateToprops=(state)=>{
    return{
        loading: state.articleState.loading,
        user : state.userState.user,
        articles : state.articleState.articles
    };
};

const mapDispatchToProps =(dispatch)=>({
        getArticles: ()=>dispatch(getArticlesAPI())
})


export default connect(mapStateToprops, mapDispatchToProps)(Main)