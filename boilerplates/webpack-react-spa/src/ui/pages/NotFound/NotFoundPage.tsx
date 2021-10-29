import React from "react";

import styles from "./NotFoundPage.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorCard}>
        <div className={styles.errorTitle}>¯\_(ツ)_/¯</div>
        <div className={styles.errorCode}>Fehler 404</div>
        <div className={styles.errorContent}>Die Seite gibt es nicht!</div>
      </div>
    </div>
  );
};

export default NotFoundPage;
