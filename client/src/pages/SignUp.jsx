import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { loginFailure, loginStart, signupSuccess } from '../redux/userSlice'
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


const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [img, setImg] = useState("https://yt3.ggpht.com/ytc/AL5GRJXm7zP1bH0-1o1-fPmOQZYF0ajBkHOeY4kWsX9XgQ=s68-c-k-c0x00ffffff-no-rj")
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      dispatch(loginStart())
      try {
        const res = await axios.post("/auth/signup", {name,email,password, img})
        dispatch(signupSuccess(res.data)) && navigate('/signin')

      } catch (err) {
        dispatch(loginFailure())
      }
    }
    return (
        <Container>
            <Wrapper>
                <Title>Sign Up</Title>
            <SubTitle>to continue to SuperTV</SubTitle>
                <Input placeholder="username" onChange={e => setName(e.target.value)} required />
                <Input placeholder="email" onChange={e => setEmail(e.target.value)} required />
                <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} required />
                <Input type="url" placeholder="Paste the Image Url" onChange={e => setImg(e.target.value)}  />
                <Button onClick={handleSignUp}>Sign up</Button>
                <p>Already have an account  <Link to="/signin" style={{textDecoration:"none", color:"#3ea6ff", cursor:"pointer"}}> <span>Sign In</span></Link></p>
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
    export default SignUp;