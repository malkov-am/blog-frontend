import clsx from "clsx";
import React from "react";
import "./InfoPopup.styles.scss";

const InfoPopup = ({ message, isActive, type = "error" }) => {
  return (
    <p
      className={clsx("info-popup", isActive && "info-popup_active", {
        "info-popup_type_success": type === "success",
        "info-popup_type_error": type === "error",
      })}
    >
      {message}
    </p>
  );
};

export default InfoPopup;
