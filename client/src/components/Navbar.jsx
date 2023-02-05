import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom"
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'
import Upload from './Upload';







const Container = styled.div`
position:sticky;
top: 0;
background-color: ${({theme}) => theme.bgLighter};
height: 56px;

`
const Wrapper = styled.div` 
display: flex; 
align-items: center;
justify-content: flex-end;
height: 100%;
padding: 0px 20px;
position: relative;

`

const Search = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`

const Input = styled.input`
border: none;
outline: none;
background-color: transparent;
color: ${({theme}) => theme.text};
width: 80%;

`

const Button = styled.button`
 padding: 5px 15px;
 background-color: transparent;
 border: 1px solid #3ea6ff;
 color: #3ea6ff;
 border-radius: 3px;
 font-weight: 500;
 cursor: pointer;
 display: flex;
 align-items: center;
 gap:5px;

`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
`

const Avatar = styled.img`
 width: 32px;
 height: 32px;
 border-radius: 50%;
 background-color: #999;

`

const Navbar = ({darkMode}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("");
  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleSignOut = async (e) => {
    e.preventDefault();
    dispatch(logout()) && navigate('/trends')
    
    
  }
  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" onChange={(e) => setQ(e.target.value)} />

          <SearchOutlinedIcon  sx={darkMode? { color: 'white' }: { color: 'gray' }} onClick={()=>navigate(`/search?q=${q}`)} />
        </Search>
        {currentUser ? (
          <User>
            <VideoCallOutlinedIcon  onClick={() => setOpen(true)} style={{cursor:"pointer"}} />
            <Avatar src={currentUser.img} />
            {currentUser.name}
            
            <Link to="trends" style={{textDecoration:"none", color:"inherit"}} > 
            <Button onClick={handleSignOut}>
            SIGN OUT
            </Button>
            </Link>
           
          </User>
        ) :  <Link to="signin" style={{textDecoration: "none"}} >
        <Button>
          <AccountCircleOutlined />
          SIGN IN
        </Button>
        </Link>}
      </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar