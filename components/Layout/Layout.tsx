import { cloneElement, ReactNode, FC, Children } from "react";

import styles from "styles/Layout.module.css";
import { getTagswithColors } from "utils";

import Header from "./components/Header/Header";

interface LayoutType {
  children: ReactNode;
}

const Layout: FC<LayoutType> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.childrenContainer}>
        {Children.map(children, (child: any) => cloneElement(child, {}))}
      </div>
    </div>
  );
};

export default Layout;
