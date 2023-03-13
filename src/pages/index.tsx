import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Link to="/puzzle">
        <button>Start</button>
      </Link>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Start Game</title>;
