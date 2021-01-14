import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actApp from "../../store/App/ac-App";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { PageWrapper } from "../SharedStyles";
import CategorySection from "../Home/CategorySection";
import Chip from "../../components/Post/Chip";
import Divider from "../../components/Divider";
import Comment from "../../components/Post/Comment";
import QuillText from "../../components/Post/QuillText";
import RatingControls from "./RatingControls";
import { convertSecondsToDate, showSnackbar } from "../../utils";
import { useAuth } from "../../AuthContext";
import PostDetailsModal from "./PostDetailsModal";
import PostDetailSkeleton from "./PostDetailSkeleton";
import CommentSkeleton from "./CommentSkeleton";

import { BsEye } from "react-icons/bs";
import { RiChat2Line } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import Avatar from "@material-ui/core/Avatar";

const PostDetails = (props) => {
  const { id: postId } = useParams();
  const {
    upvotePost,
    downvotePost,
    fetchSinglePost,
    fetchPostComments,
    viewPost,
    currentUser,
  } = useAuth();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const isFetchingSinglePost = useSelector(
    (state) => state.Home.isFetchingSinglePost
  );
  const isFetchingComments = useSelector(
    (state) => state.Home.isFetchingComments
  );
  const {
    title,
    body,
    categories = [],
    displayName,
    photoURL,
    timestamp,
    upvotedUsers,
    downvotedUsers,
    views,
  } = post;

  const dispatch = useDispatch();

  useEffect(() => {
    const loadPost = async () => {
      const fetchedPost = await fetchSinglePost(postId);
      setPost(fetchedPost);
      console.log("Post fetched -> ", fetchedPost);
    };
    const loadComments = async () => {
      const fetchedComments = await fetchPostComments(postId);
      setComments(fetchedComments);
      console.log("Comments fetched -> ", fetchedComments);
    };
    viewPost(postId);
    loadPost();
    loadComments();
  }, []);

  const Comments = () => {
    return comments.map(
      ({
        id,
        body,
        displayName,
        photoURL,
        upvotedUsers,
        downvotedUsers,
        timestamp,
      }) => {
        return (
          <Comment
            key={id}
            postId={postId}
            commentId={id}
            comment={body}
            displayName={displayName}
            photoURL={photoURL}
            upvotedUsers={upvotedUsers}
            downvotedUsers={downvotedUsers}
            date={convertSecondsToDate(timestamp.seconds)}
          />
        );
      }
    );
  };

  const renderRatingControls = () => {
    return (
      <RatingControls
        upvotedUsers={upvotedUsers}
        downvotedUsers={downvotedUsers}
        onUpvote={() => upvotePost(postId)}
        onDownvote={() => downvotePost(postId)}
      />
    );
  };

  const handleAddComment = () => {
    if (currentUser) {
      dispatch(actApp.handleState("isModalOpen", true));
    } else {
      showSnackbar("error", "You must sign in to add comments");
    }
  };

  const renderCommentSkeleton = (num) => {
    return (
      <SkeletonWrapper>
        {[...Array(num)].map((i, index) => (
          <CommentSkeleton key={index} />
        ))}
      </SkeletonWrapper>
    );
  };

  return (
    <PageWrapper>
      <PostDetailsWrapper>
        <CategorySection />
        <PostWrapper>
          {!isFetchingSinglePost && (
            <Votes className="postVotes">{renderRatingControls()}</Votes>
          )}
          <Post>
            {isFetchingSinglePost ? (
              <SkeletonWrapper>
                <PostDetailSkeleton />
              </SkeletonWrapper>
            ) : (
              <PostContent>
                <PostHeader>
                  <PostTitle>{title}</PostTitle>
                  <PostHeaderDetails>
                    <div>
                      Posted{" "}
                      {convertSecondsToDate(
                        timestamp ? timestamp.seconds : null
                      )}
                    </div>
                    <PostHeaderViews>
                      <BsEye size={"1.4rem"} />
                      <PostHeaderViewsText>{views}</PostHeaderViewsText>
                    </PostHeaderViews>
                    <ChipGroup>
                      {categories.map((category, index) => (
                        <Chip key={index} category={category} />
                      ))}
                    </ChipGroup>
                  </PostHeaderDetails>
                </PostHeader>
                <QuillText text={body} />
                <PostFooter>
                  <PostFooterLeft>
                    <div onClick={handleAddComment}>
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
                      <PostFooterUserName>{displayName}</PostFooterUserName>
                      <Avatar
                        alt="pic"
                        src={photoURL}
                        style={{ width: "35px", height: "35px" }}
                      />
                    </PostFooterUser>
                  </PostFooterRight>
                </PostFooter>
              </PostContent>
            )}
            <Divider width={"100%"} height={"2px"} margin={"1.6rem 0 0 0"} />
            {isFetchingComments ? (
              renderCommentSkeleton(3)
            ) : (
              <CommentsSection>
                <NumberOfComments>{comments.length} comments</NumberOfComments>
                <Comments />
              </CommentsSection>
            )}
          </Post>
        </PostWrapper>
      </PostDetailsWrapper>
      <PostDetailsModal postId={postId} />
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

const PostContent = styled.div``;

const SkeletonWrapper = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  margin-top: 1rem;
`;

const Votes = styled.div`
  flex: 4;
`;

const Post = styled.div`
  flex: 46;
`;

const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin-left: 5px;
    margin-top: 5px;
  }
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
