import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.scss";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Link to="/puzzle">
        <button className="btn">Start</button>
      </Link>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Start Game</title>;
