import React from "react";
import { useTranslation } from "react-i18next";

import { useAppName } from "../../../store/Global/selectors/useActiveGuild";

import styles from "./LandingPage.css";

const LandingPage: React.FC = () => {
  const appName = useAppName();

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1>{appName}</h1>
      <h3>{t("landing.subtitle")}</h3>
    </div>
  );
};

export default LandingPage;
