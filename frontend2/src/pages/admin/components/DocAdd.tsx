import { useEffect, useState } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Popover,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import {
  IconFilePlus,
  IconLayoutSidebarLeftCollapse,
  IconDeviceFloppy,
  IconFileX,
  IconBookUpload,
} from '@tabler/icons-react';
import uuidv4 from 'src/utils/uuidv4';
import { Document, Page } from './Document';
import MetaDrawer from './MetaDrawer';

const PAGE_SIZE = 1;

type DocAddProps = {
  metaState: Document;
  handleOnSave: (values: Document) => void;
  getMetaComponent: () => JSX.Element | null;
};

function DocAdd({ metaState, handleOnSave, getMetaComponent }: DocAddProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pages, setPages] = useState<Page[]>([
    { text: '', number: 1, id: uuidv4() },
  ]);
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(pages.slice(0, PAGE_SIZE));
  const [popoverOpened, setPopoverOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(pages.slice(from, to));
  }, [page, pages]);

  const handleMetaChange = () => {
    setDrawerOpen(false);
  };

  const handlePageTextChange = (value: string, index: number) => {
    const newPages = [...pages];
    newPages[index].text = value;
    setPages(newPages);
  };

  const onAddPageClick = () => {
    setPages([...pages, { text: '', number: pages.length + 1, id: uuidv4() }]);
    setPage(pages.length + 1);
  };

  const onRemovePageClick = () => {
    if (pages.length === 1) {
      return;
    }
    const newPages = [...pages];
    newPages.pop();
    setPages(newPages);
    setPage(pages.length - 1);
  };

  const handleSave = (newMeta: Document) => {
    if (!newMeta.title) {
      setPopoverOpened(true);
      return;
    }

    handleOnSave(newMeta);
  };

  return (
    <>
      <MetaDrawer
        onClose={handleMetaChange}
        opened={drawerOpen}
        meta={metaState}
        getMetaComponent={getMetaComponent}
      />
      <Group justify="space-between">
        <Stack gap="xs">
          <Title>Добавить</Title>
          <Text>Вставляйте текст постранично</Text>
        </Stack>
        <Group gap="xl">
          <ActionIcon title="Загрузить файл" disabled>
            <IconBookUpload />
          </ActionIcon>
          <Popover
            width={250}
            position="bottom"
            withArrow
            shadow="md"
            transitionProps={{ duration: 200 }}
            opened={popoverOpened}
          >
            <Popover.Target>
              <ActionIcon variant="light" title="Дополнительная информация">
                <IconLayoutSidebarLeftCollapse
                  onClick={() => {
                    setPopoverOpened(false);
                    setDrawerOpen(true);
                  }}
                />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm" c="red">
                Добавьте дополнительную информацию о книге прежде чем сохранить
              </Text>
            </Popover.Dropdown>
          </Popover>
          <Button.Group>
            <ActionIcon
              title="Удалить последнюю страницу"
              onClick={onRemovePageClick}
              color="red"
            >
              <IconFileX />
            </ActionIcon>
            <ActionIcon
              title="Добавить страницу"
              onClick={onAddPageClick}
              color="green"
            >
              <IconFilePlus />
            </ActionIcon>
          </Button.Group>
          {!isMobile && (
            <Button
              leftSection={<IconDeviceFloppy />}
              onClick={() => handleSave()}
            >
              Сохранить
            </Button>
          )}
          {isMobile && (
            <ActionIcon title="Сохранить" onClick={() => handleSave()}>
              <IconDeviceFloppy />
            </ActionIcon>
          )}
        </Group>
      </Group>
      <Space h="md" />
      <Box>
        <DataTable
          records={records}
          columns={[
            {
              accessor: 'id',
              title: '',
              render: (record) => (
                <Textarea
                  value={record.text}
                  onChange={(e) =>
                    handlePageTextChange(e.target.value, record.number - 1)
                  }
                  autosize
                  minRows={12}
                >
                  {record.text}
                </Textarea>
              ),
              titleStyle: {
                display: 'none',
              },
            },
          ]}
          withTableBorder
          borderRadius="sm"
          withColumnBorders
          totalRecords={pages.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
          horizontalSpacing="xs"
          verticalSpacing="xs"
        />
      </Box>
    </>
  );
}

export default DocAdd;
