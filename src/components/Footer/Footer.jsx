import React from "react";
import styles from "../../css/footer.module.css"

const Footer = () => {
  return (
    <div className=" sticky h-10 bg-[#20232a] mt-10 z-50 bottom-0">
      <div className={`${styles.center} mt-10  text-white`}>
        <p>@Copyright 2023 All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
