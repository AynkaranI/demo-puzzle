import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.scss";

import Puzzle from "../components/Puzzle";

const IndexPage = () => {
  return <Puzzle />;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Start Game</title>;
