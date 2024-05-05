import { Badge, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import styles from './AnchorBadge.module.css';

type AnchorBadgeProps = {
  word: string;
};

export default function AnchorBadge({ word }: AnchorBadgeProps) {
  return (
    <Badge variant="outline">
      <Text
        component={Link}
        inherit
        to={`/search?q=${word}`}
        className={styles.link}
      >
        {word}
      </Text>
    </Badge>
  );
}
