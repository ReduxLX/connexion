import React from "react";
import ContentLoader from "react-content-loader";

const TopUserSkeleton = (props) => {
  const renderSkeleton = (index) => (
    <ContentLoader
      key={index}
      speed={2}
      width="100%"
      height={34}
      viewBox="0 0 150 34"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="50" y="5" rx="0" ry="0" width="100" height="8" />
      <circle cx="17" cy="17" r="17" />
      <rect x="50" y="20" rx="0" ry="0" width="100" height="8" />
    </ContentLoader>
  );
  return [...Array(props.num)].map((i, index) => renderSkeleton(index));
};

export default TopUserSkeleton;
