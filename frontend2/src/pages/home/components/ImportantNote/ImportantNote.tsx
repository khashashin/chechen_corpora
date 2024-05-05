import { Container, Title, Text, Grid, Paper, Image } from '@mantine/core';
import image from 'assets/owl-hint.png';

import { memo } from 'react';
import classes from './ImportantNote.module.css';

function ImportantNote() {
  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Важно</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Приложение находится в стадии разработки и может содержать ошибки.
          Пожалуйста, сообщайте об ошибках в{' '}
          <a href="mailto:info@dosham.info">техническую поддержку</a>.
        </Text>
      </Container>

      <Container p={15}>
        <Grid gutter={50} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={image} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper>
              <Text size="sm" className={classes.description}>
                Создание чистого, высококачественного языкового корпуса может
                быть сложной задачей, особенно при работе с текстами,
                содержащими несколько языков. Для обучения точным и
                целенаправленным языковым моделям очень важно сохранять в
                корпусе фокус на одном языке. Тем не менее, полностью исключить
                иноязычные экземпляры из корпуса не всегда представляется
                возможным. Чтобы минимизировать присутствие предложений на
                иностранных языках, обычно используются различные подходы к
                предварительной обработке и машинному обучению. Однако
                необходимо признать, что даже в самых обширных и тщательно
                обработанных корпусах может остаться минимальное количество
                иноязычных примеров.
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
}

export default memo(ImportantNote);
