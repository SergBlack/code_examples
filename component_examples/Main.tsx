import { BenefitsBlock } from './components/BenefitsBlock/BenefitsBlock';
import { PositionsBlock } from './components/PositionsBlock/PositionsBlock';
import { ProjectsBlock } from './components/ProjectsBlock/ProjectsBlock';

import styles from './Main.module.scss';

export const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.positionsBlock}>
          <PositionsBlock />
        </div>

        <div className={styles.benefitsBlock}>
          <BenefitsBlock />
        </div>

        <div className={styles.projectsBlock}>
          <ProjectsBlock />
        </div>
      </div>
    </div>
  );
};
