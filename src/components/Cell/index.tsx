import { FC } from 'react';
import styles from './styles.module.css';

type Props = {
  color?: string
}

const Cell: FC<Props> = ({ color = 'transparent' }) => (
  <div style={{ backgroundColor: color }} className={styles.cell}></div>
);

export default Cell;
