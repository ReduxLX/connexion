import React from "react";
import ContentLoader from "react-content-loader";

const PostSkeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      viewBox="0 0 400 130"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="1" y="5" rx="3" ry="3" width="400" height="15" />
      <rect x="0" y="25" rx="10" ry="10" width="60" height="15" />
      <rect x="66" y="25" rx="10" ry="10" width="90" height="15" />
      <rect x="0" y="60" rx="3" ry="3" width="400" height="50" />
    </ContentLoader>
  );
};
export default PostSkeleton;
