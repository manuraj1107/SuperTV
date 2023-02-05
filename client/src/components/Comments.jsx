
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components"
import Comment from './Comment';
import { comment } from '../redux/userSlice'
import { Avatar } from '@mui/material';




const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
 cursor: pointer;

`


const Input = styled.input`
 border: none;
 border-bottom: 1px solid ${({theme}) => theme.soft};
 background-color: transparent;
 outline: none;
 padding: 5px; 
 color: ${({theme}) => theme.text};
 width: 100%;

`;

const Comments = ({videoId}) => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState('');
  const [userID, setUserId] = useState('')
  const [videoID, setVideoId] = useState('')
  const fetchCom = async(e) => {
    try {
      const res = await axios.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (error) {
      
    }
  }

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      setUserId(currentUser._id)
      setVideoId(videoId)
      const res = await axios.post("/comments/", {desc, videoID, userID})
      dispatch(comment(currentUser));
      fetchCom();
      
    } catch (err) {

    }

  }

  useEffect(() => {
    const fetchComments = async () => {
      
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
        <NewComment>
           <Avatar src={comments.img} />
            <Input placeholder='Add a comment...' onChange={e => setDesc(e.target.value)} />
            <Button onClick={handleComment}>Comment</Button>
        </NewComment>

        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} />
        ))}
        
        
    </Container>
  )
}

export default Comments


