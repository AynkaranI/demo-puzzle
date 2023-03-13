import { HeadFC, Link } from "gatsby";
import React from "react";

const StartPage = () => {
  return (
    <>
      <div>Game Over</div>
      <div>
        <Link to="/">
          <button className="btn">Home</button>
        </Link>
        <Link to="/puzzle">
          <button className="btn">Restart</button>
        </Link>
      </div>
    </>
  );
};

export default StartPage;

export const Head: HeadFC = () => <title>Game Over!</title>;
