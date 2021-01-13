import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { PageWrapper } from "../SharedStyles";
import CategorySection from "../Home/CategorySection";
import Chip from "../../components/Post/Chip";
import Divider from "../../components/Divider";
import Comment from "../../components/Post/Comment";
import QuillText from "../../components/Post/QuillText";
import { truncateNum } from "../../utils";

import { BsEye } from "react-icons/bs";
import { RiChat2Line } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Avatar from "@material-ui/core/Avatar";
import ProfileImg1 from "../../res/images/avatar1.jpg";

const post = {
  title:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue sapien vulputate turpis proin. Vulputate velit aliquet facilisi sit in.",
  body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada fringilla egestas elit, tempor, est id. Risus, tellus blandit at cursus nibh diam consectetur. Malesuada aliquet diam pulvinar interdum leo lacus fringilla libero, adipiscing. Pretium, blandit sagittis nulla ipsum et vel nec, blandit quam. Malesuada eros, donec nibh purus pellentesque cras fringilla. Lacinia consequat mattis donec ipsum. Lorem amet, et risus, eu. Nibh id velit et interdum eu rhoncus cursus felis neque. Mi faucibus hendrerit sit viverra sit augue aliquet vitae metus. Feugiat ut pharetra praesent viverra dui. Rhoncus, congue tempor at ornare. Imperdiet euismod urna adipiscing penatibus duis lacus ac volutpat. Nisi porttitor porttitor ipsum adipiscing.
    
    Mauris urna, diam at pellentesque purus vel, commodo, consectetur a. Risus orci auctor condimentum eget pretium scelerisque sem natoque tellus. Aenean nec nullam amet magna suspendisse. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada fringilla egestas elit, tempor, est id. Risus, tellus blandit at cursus nibh diam consectetur. Malesuada aliquet diam pulvinar interdum leo lacus fringilla libero, adipiscing. Pretium, blandit sagittis nulla ipsum et vel nec, blandit quam.

    Malesuada eros, donec nibh purus pellentesque cras fringilla. Lacinia consequat mattis donec ipsum. Lorem amet, et risus, eu. Nibh id velit et interdum eu rhoncus cursus felis neque. Mi faucibus hendrerit sit viverra sit augue aliquet vitae metus. Feugiat ut pharetra praesent viverra dui. Rhoncus, congue tempor at ornare. Imperdiet euismod urna adipiscing penatibus duis lacus ac volutpat. Nisi porttitor porttitor ipsum adipiscing. 
    
    Mauris urna, diam at pellentesque purus vel, commodo, consectetur a. Risus orci auctor condimentum eget pretium scelerisque sem natoque tellus. Aenean nec nullam amet magna suspendisse. `,
  date: "January 23 2019",
  views: 438,
  userId: "A6DF",
  rating: 2,
  comments: [
    {
      id: "a1412343",
      userId: "AH7D8",
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada fringilla egestas elit, tempor, est id. Risus, tellus blandit at cursus nibh diam consectetur. Malesuada aliquet diam pulvinar interdum leo lacus fringilla libero, adipiscing. Pretium, blandit sagittis nulla ipsum et vel nec, blandit quam.

      Malesuada aliquet diam pulvinar interdum leo lacus fringilla libero, adipiscing. Pretium, blandit sagittis nulla ipsum et vel nec, blandit quam.`,
      date: "February 02 2019",
      rating: 12,
    },
    {
      id: "aosdj4234",
      userId: "NC89W",
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada fringilla egestas elit, tempor, est id. Risus, tellus blandit at cursus nibh diam consectetur. Malesuada aliquet diam pulvinar interdum leo lacus fringilla libero, adipiscing. Pretium, blandit sagittis nulla ipsum et vel nec, blandit quam. Malesuada aliquet diam pulvinar interdum leo lacus fringilla libero, adipiscing.`,
      date: "February 34 2019",
      rating: 13,
    },
  ],
};

// const filteredComment = post.comments.filter((c) => c.userId === "AH7D8")[0];
const sortedComments = post.comments.sort((a, b) =>
  a.rating > b.rating ? -1 : 1
);
const PostDetails = (props) => {
  const { id } = useParams();
  console.log("Post Section, use id to fetch comments -> ", id);
  const { initialRating = 0 } = props;

  const [rating, setRating] = useState(initialRating);
  const [hasVoted, setHasVoted] = useState(false);

  const hasUpvoted = hasVoted && rating === initialRating + 1;
  const hasDownvoted = hasVoted && rating === initialRating - 1;

  const handleUpvote = () => {
    if (!hasVoted || rating === initialRating - 1) {
      setRating(initialRating + 1);
      setHasVoted(true);
    } else {
      setRating(initialRating);
      setHasVoted(false);
    }
  };

  const handleDownvote = () => {
    if (!hasVoted || rating === initialRating + 1) {
      setRating(initialRating - 1);
      setHasVoted(true);
    } else {
      setRating(initialRating);
      setHasVoted(false);
    }
  };

  const renderRating = () => {
    return (
      <RatingWrapper>
        <div onClick={() => handleUpvote()}>
          <Upvote hasupvoted={hasUpvoted.toString()} />
        </div>
        <Rating
          hasUpvoted={hasUpvoted}
          hasDownvoted={hasDownvoted}
          rating={truncateNum(rating)}
        >
          {truncateNum(rating)}
        </Rating>
        <div onClick={() => handleDownvote()}>
          <Downvote hasdownvoted={hasDownvoted.toString()} />
        </div>
      </RatingWrapper>
    );
  };

  const Comments = () => {
    return sortedComments.map(({ id, comment, date, rating }) => {
      return (
        <Comment
          key={id}
          comment={comment}
          date={date}
          initialRating={rating}
        />
      );
    });
  };

  return (
    <PageWrapper>
      <PostDetailsWrapper>
        <CategorySection />
        <PostWrapper>
          <Votes className="postVotes">{renderRating()}</Votes>
          <Post>
            <PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostHeaderDetails>
                <div>Posted {post.date}</div>
                <PostHeaderViews>
                  <BsEye size={"1.4rem"} />
                  <PostHeaderViewsText>{post.views}</PostHeaderViewsText>
                </PostHeaderViews>
                <Chip />
              </PostHeaderDetails>
            </PostHeader>
            <QuillText text={post.body} />
            <PostFooter>
              <PostFooterLeft>
                <div>
                  <RiChat2Line />
                  <p style={{ fontFamily: "NunitoBold" }}>Add a comment</p>
                </div>
                <div>
                  <BsBookmark />
                  <p>Bookmark</p>
                </div>
                <div>
                  <AiOutlineShareAlt size={"1.1rem"} />
                  <p>Share</p>
                </div>
              </PostFooterLeft>
              <PostFooterRight>
                <p>Posted by:</p>
                <PostFooterUser>
                  <PostFooterUserName>ReduxLX</PostFooterUserName>
                  <Avatar
                    alt="pic"
                    src={ProfileImg1}
                    style={{ width: "35px", height: "35px" }}
                  />
                </PostFooterUser>
              </PostFooterRight>
            </PostFooter>
            <Divider width={"100%"} height={"2px"} margin={"1.6rem 0 0 0"} />
            <CommentsSection>
              <NumberOfComments>
                {sortedComments.length} comments
              </NumberOfComments>
              <Comments />
            </CommentsSection>
          </Post>
        </PostWrapper>
      </PostDetailsWrapper>
    </PageWrapper>
  );
};

const PostDetailsWrapper = styled.div`
  display: flex;
`;

const PostWrapper = styled.div`
  display: flex;
  flex: 1;
  @media (min-width: 768px) {
    flex: 8;
  }
  flex-direction: row;
  margin: 0.6rem 8rem 0 0;
  @media (max-width: 768px) {
    margin: 0.6rem 0 0 0;
  }
`;

const Votes = styled.div`
  flex: 4;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 0.4rem;
  min-width: 40px;
  & > * {
    margin-bottom: 0.5rem;
  }
`;

const Rating = styled.p`
  font-family: "NunitoBold";
  font-size: ${({ rating }) => (rating.length > 2 ? "12px" : "16px")};
  align-items: center;
  color: ${({ hasUpvoted, hasDownvoted, theme }) =>
    hasUpvoted
      ? theme.colors.main
      : hasDownvoted
      ? theme.colors.error
      : theme.colors.disabled};
`;

const Upvote = styled(FaArrowUp)`
  width: 20px;
  height: 20px;
  transition: 0.2s;
  cursor: pointer;
  color: ${({ hasupvoted, theme }) =>
    hasupvoted === "true" ? theme.colors.main : theme.colors.disabled};
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const Downvote = styled(FaArrowDown)`
  width: 20px;
  height: 20px;
  transition: 0.2s;
  cursor: pointer;
  color: ${({ hasdownvoted, theme }) =>
    hasdownvoted === "true" ? theme.colors.error : theme.colors.disabled};
  &:hover {
    color: ${({ theme: { colors } }) => colors.error};
  }
`;

const Post = styled.div`
  flex: 46;
`;

const PostHeader = styled.div`
  margin-bottom: 2.4rem;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  font-family: "NunitoBold";
  color: ${({ theme: { colors } }) => colors.secondary};
  text-align: left;
`;

const PostHeaderDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.8rem;
  & > * {
    margin-right: 1.5rem;
  }

  @media (max-width: 350px) {
    display: none;
  }
`;

const PostHeaderViews = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PostHeaderViewsText = styled.div`
  margin-left: 0.4rem;
  font-size: 20;
`;

const PostBody = styled.p`
  /* padding-top: 35px; */ //check later
  text-align: left;
  font-size: 18;
  white-space: pre-line;
`;

const PostFooter = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3.6rem;
  align-items: center;
  justify-content: space-between;
`;

const PostFooterLeft = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    > * {
      margin-right: 0.5rem;
    }
    p {
      @media (max-width: 850px) {
        display: none;
      }
    }
    display: flex;
    align-items: center;
    color: ${({ theme: { colors } }) => colors.main};
    margin-right: 1.5rem;
    @media (max-width: 850px) {
      margin-right: 0.8rem;
    }
    cursor: pointer;
  }
`;

const PostFooterRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    @media (max-width: 1010px) {
      display: none;
    }
  }
`;

const PostFooterUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    color: ${({ theme: { colors } }) => colors.main};
    cursor: pointer;
  }
`;

const PostFooterUserName = styled.p`
  margin: 0 1.5rem 0 0.2rem;
`;

const CommentsSection = styled.div`
  margin-top: 1.6rem;
  & > * {
    text-align: left;
  }
`;

const NumberOfComments = styled.h1`
  margin-bottom: 2rem;
  font-size: 18px;
  color: ${({ theme: { colors } }) => colors.secondary};
`;

export default PostDetails;
