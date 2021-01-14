import React from "react";
import ContentLoader from "react-content-loader";

const CommentSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 400 140"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="51" y="6" rx="10" ry="10" width="100" height="13" />
    <rect x="11" y="60" rx="10" ry="10" width="380" height="58" />
    <circle cx="22" cy="22" r="22" />
    <rect x="52" y="28" rx="10" ry="10" width="152" height="13" />
  </ContentLoader>
);

export default CommentSkeleton;
