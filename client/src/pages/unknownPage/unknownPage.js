import React from "react";
import "./styles/unknownPage.css";
import useCustomNavigate from "../../hooks/redirect";


const UnknownPage = () => {
  const redirectTo = useCustomNavigate();

  return (
    <>
      <div class="page-error">
          <p class="error-text">Oops, unknown page</p>
          <button class="home-error">
              <i onClick={() => redirectTo("/projects")} class="material-symbols-outlined large-icon">home</i>
          </button>
      </div>
    </>
  )
};


export default UnknownPage;