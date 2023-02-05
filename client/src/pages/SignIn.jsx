import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from "styled-components"
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import {auth, provider} from "../firebase";
import {signInWithPopup} from "firebase/auth"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 height: calc(100vh - 56px);
 color: ${({theme}) => theme.text};

`
const Wrapper = styled.div`
 display: flex;
 align-items: center;
 flex-direction: column;
 background-color: ${({theme}) => theme.bgLighter};
 border: 1px solid ${({theme}) => theme.soft};
 padding: 20px 50px; 
 gap: 10px;
`

const Title = styled.h1`
font-size: 24px;

`

const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;
`

const Input = styled.input`
 border: 1px solid ${({theme}) => theme.soft};
 border-radius: 3px;
 padding: 10px;
 background-color: transparent;
 width: 100%;
 color: ${({theme}) => theme.text};
`

const Button = styled.button`
 border-radius: 3px;
 border: none;
 padding: 10px 20px;
 font-weight: 500;
 cursor: pointer;
 background-color: ${({theme}) => theme.soft};
 color: ${({theme}) => theme.textSoft};

`


const More = styled.div`
 display: flex;
 font-size: 12px;
 margin-top: 10px;
 color: ${({theme}) => theme.textSoft};
`

const Links = styled.div`
 margin-left: 50px;
`

const ChildLink = styled.span`
margin-left: 30px;
`

const SignIn = () => {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post("/auth/signin", {name,password})
      dispatch(loginSuccess(res.data)) && navigate('/trends')
      
    } catch (err) {
      dispatch(loginFailure())
    }
  }

  
  const signInWithGoogle = async ()=>{
    dispatch(loginStart())
    signInWithPopup(auth, provider)
    .then((result) => {
      axios.post("/auth/google", {
        name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL,
      })
      .then((res) =>{
        dispatch(loginSuccess(res.data)) && navigate('/trends');
      })
    }).catch((error) => {
      dispatch(loginFailure())
    })
  }

  return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
            <SubTitle>to continue to SuperTV</SubTitle>
            <Input placeholder="username" onChange={e => setName(e.target.value)} />
            <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            <Button onClick={handleLogin}>Sign in</Button>
            <SubTitle>or</SubTitle>
            <Button onClick={signInWithGoogle}>Signin with Google</Button>
            <p>Don't have an account <Link to="/signup" style={{textDecoration:"none", color:"#3ea6ff", cursor:"pointer"}}> <span>Sign up</span></Link></p>
        </Wrapper>
        <More>
            English(USA)
            <Links>
                <ChildLink>Help</ChildLink>
                <ChildLink>Privacy</ChildLink>
                <ChildLink>Terms</ChildLink>
            </Links>
        </More>
    </Container>
  )
}

export default SignIn;