import React from "react";
import ContentLoader from "react-content-loader";

const PostDetailSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 400 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="5" rx="3" ry="3" width="400" height="15" />
    <rect x="0" y="25" rx="9" ry="9" width="152" height="16" />
    <rect x="161" y="25" rx="10" ry="10" width="58" height="15" />
    <rect x="235" y="25" rx="10" ry="10" width="110" height="15" />
    <rect x="0" y="60" rx="3" ry="3" width="400" height="131" />
  </ContentLoader>
);

export default PostDetailSkeleton;
