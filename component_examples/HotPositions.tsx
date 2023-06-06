import { useRouter } from 'next/router';
import { Button, Spin, Typography } from 'antd';

import { POSITIONS_INITIAL_FILTER_VALUES, LOCAL_STORAGE_FIELDS } from '@/common/constants';
import { useGetPositions, useLocalStorage } from '@/hooks';
import { PositionStatus } from '@/types';
import styles from './HotPositions.module.scss';

const DISPLAYED_POSITIONS_COUNT = 6;

export const HotPositions = () => {
  const router = useRouter();
  const { count, positions, isPositionsLoading } = useGetPositions('', { isHot: true, status: [PositionStatus.OPEN] });
  const { setToStorage } = useLocalStorage(LOCAL_STORAGE_FIELDS.openPositions);
  const displayedPositions = positions.slice(0, DISPLAYED_POSITIONS_COUNT);

  const onSeeAllClick = () => {
    setToStorage({ ...POSITIONS_INITIAL_FILTER_VALUES, isHot: true });
    router.push('/positions?isHot=true');
  };

  const onHotPositionClick = (projectId: string) => {
    setToStorage({ ...POSITIONS_INITIAL_FILTER_VALUES, projectId, isHot: true });
    router.push(`/positions?projectId=${projectId}&isHot=true`);
  };

  return (
    <div className={styles.hotPositionsContainer}>
      <Spin spinning={isPositionsLoading}>
        <div className={styles.hotPositionsHeader}>
          <Typography.Text strong className={styles.headerTitle}>
            Hot Positions ({count})
          </Typography.Text>
          <Button type="link" className={styles.button} onClick={onSeeAllClick}>
            See all
          </Button>
        </div>

        <ul className={styles.hotPositionList}>
          {displayedPositions.map(({ title, id, project }) => (
            <li className={styles.hotPositionItem} key={id}>
              {title}
              {` in `}
              <Button type="link" className={styles.button} onClick={() => onHotPositionClick(project.id)}>
                {project.name}
              </Button>
            </li>
          ))}
        </ul>
      </Spin>
    </div>
  );
};
