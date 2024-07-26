import {
  ActionIcon,
  Alert,
  Button,
  Drawer,
  Paper,
  ScrollArea,
  Stack,
  Textarea,
  TextInput,
  Text,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import 'dayjs/locale/ru';
import { DatePickerInput } from '@mantine/dates';
import { IconAlertCircle } from '@tabler/icons-react';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { Document, Source } from './Document';

type MetaDrawerProps = {
  opened: boolean;
  onClose: (values: Document) => void;
  meta: Document;
  getMetaComponent: () => JSX.Element | null;
};

function MetaDrawer(props: MetaDrawerProps) {
  const { colorScheme } = useMantineColorScheme();
  const { meta, opened, onClose, getMetaComponent } = props;
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      title: meta.title,
      summary: meta.summary,
      publication_date: meta.publication_date,
      sources: meta.sources,
    },
  });

  const handleDeleteSource = (index: number) => {
    if (form.values.sources === undefined) return;
    const { sources } = form.values;
    sources.splice(index, 1);
    form.setFieldValue('sources', sources);
  };

  const handleAddSource = () => {
    if (form.values.sources === undefined) return;
    const { sources } = form.values;
    sources.push({ name: '' });
    form.setFieldValue('sources', sources);
  };

  return (
    <Drawer
      opened={opened}
      position="right"
      title="Дополнительная информация"
      padding="xl"
      size="xl"
      onClose={() => onClose(form.values as Document)}
    >
      <Paper
        style={{
          position: 'relative',
          backgroundColor:
            colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        }}
      >
        <form noValidate>
          <TextInput
            mt="md"
            required
            placeholder="Введите название"
            label="Название"
            {...form.getInputProps('title')} // eslint-disable-line react/jsx-props-no-spreading
          />
          <Textarea
            mt="md"
            autosize
            placeholder="Введите краткое описание"
            minRows={4}
            label="Описание"
            {...form.getInputProps('summary')} // eslint-disable-line react/jsx-props-no-spreading
          />
          {/* Meta attributes. Each interface which extends Document implements the getMeta which returns JSX.Element */}
          {getMetaComponent()}
          <DatePickerInput
            mt="md"
            value={
              form.values.publication_date
                ? new Date(form.values.publication_date)
                : new Date()
            }
            onChange={(date) => {
              if (date) {
                form.setFieldValue('publication_date', date.toISOString());
              }
            }}
            locale="ru"
            placeholder="Выберите дату"
            label="Дата публикации"
            defaultValue={new Date()}
          />
          <Stack mt="md">
            <Text component="label" fw={500} fz="sm">
              Источники (ссылки на сайты, где можно найти данный ресурс,
              например, на сайте библиотеки)
            </Text>
            {form.values.sources && form.values.sources.length > 0 && (
              <ScrollArea
                mt="md"
                style={{
                  height: 'auto',
                  ...(form.values.sources &&
                    form.values.sources.length > 3 && {
                      height: 200,
                    }),
                }}
                type="auto"
                offsetScrollbars
              >
                {form.values.sources &&
                  form.values.sources.map((source: Source, index: number) => (
                    <TextInput
                      key={source.name}
                      placeholder="Введите ссылку на источник"
                      label={`Источник ${index + 1}`}
                      size="xs"
                      {...form.getInputProps(`sources.${index}`)} // eslint-disable-line react/jsx-props-no-spreading
                      rightSection={
                        <ActionIcon
                          variant="transparent"
                          size="sm"
                          onClick={() => {
                            handleDeleteSource(index);
                          }}
                        >
                          <RiDeleteBin4Line size={18} />
                        </ActionIcon>
                      }
                    />
                  ))}
              </ScrollArea>
            )}
            {form.values.sources && form.values.sources.length === 0 && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Вы не добавили ни одного источника! (необязательно)"
                color="yellow"
                variant="outline"
              >
                Добавьте хотя бы один источник, чтобы другие пользователи могли
                проверить информацию.
              </Alert>
            )}
            <Button
              mt="md"
              onClick={() => {
                handleAddSource();
              }}
            >
              Добавить ресурс
            </Button>
          </Stack>
        </form>
      </Paper>
    </Drawer>
  );
}

export default MetaDrawer;
