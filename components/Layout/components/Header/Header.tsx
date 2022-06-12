import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faHome } from "@fortawesome/free-solid-svg-icons";

import styles from "styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <FontAwesomeIcon
          icon={faCarrot}
          size="lg"
          style={{ marginRight: "0.25em" }}
        />
        FOOD<span>AWAA</span>
      </div>
      <div className={styles.menu}>
        <Link href="/">
          <div className={styles.menuItem}>
            <FontAwesomeIcon
              icon={faHome}
              size="sm"
              className={styles.menuItemIcon}
            />
            <span className={styles.menuItemLabel}>Catalogue Produits</span>
          </div>
        </Link>
        <Link href="products/create">
      <button className={styles.createButton}>
          <div>+</div>
          <div>Ajouter un produit</div>
      </button>
      </Link>
      </div>
    </div>
  );
};

export default Header;
