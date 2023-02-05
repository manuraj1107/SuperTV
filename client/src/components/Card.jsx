import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  width: 360px;
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: ${(props) => props.type === "sm" ? "5px" : "0px"};

`;

const Image = styled.img`
  width:${(props) => (props.type === "sm" ? "178px" : "100%")}; ;
  height: ${(props) => (props.type === "sm" ? "102px" : "202px")};
  background-color: #999;
  border-radius: ${(props) => (props.type === "sm" ? "10px" : "10px")};
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
  width: 100%;
`;

// const ChannelImage = styled.img`
//   width: 36px;
//   height: 36px;
//   border-radius: 50%;
//   background-color: #999;
//   margin-right:5px;
//   display: ${(props) => props.type === "sm" && "none"};
// `;

const Texts = styled.div`
flex: ${(props) => (props.type === "sm" && "1" )};
width: ${(props) => (props.type === "sm" && "70%" )};

`;

const Title = styled.h2`
 
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  width: "fit-content"
  
`;

const ChannelName = styled.h2`
  font-size: ${(props) => (props.type === "sm" ? "6px" : "12px")};
  color: ${({ theme }) => theme.textSoft};
  margin: 2px 0px;
`;

const Info = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [channel, setChannel] = useState({});
  
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userID}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userID]);

  return (
    <Link  to={currentUser? `/video/${video._id}`: `/signin`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          {type !== 'sm' && (<Avatar
          type={type}
            src={channel.img}
           />)}
          
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;