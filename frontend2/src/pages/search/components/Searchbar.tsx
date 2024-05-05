import {
  ActionIcon,
  Box,
  Loader,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { memo, useEffect } from 'react';
import { useDebouncedValue, useFocusTrap } from '@mantine/hooks';
import { useSearchParams } from 'react-router-dom';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

type SearchbarProps = {
  onSearchResult: (result: any) => void;
  isLoading: boolean;
};

function Searchbar(props: SearchbarProps) {
  const { onSearchResult, isLoading } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [debouncedResult] = useDebouncedValue(searchQuery, 500);
  const focusTrapRef = useFocusTrap();

  const theme = useMantineTheme();

  useEffect(() => {
    onSearchResult(debouncedResult);
  }, [debouncedResult, onSearchResult]);

  useEffect(() => {
    if (searchQuery) {
      onSearchResult(searchQuery);
    }
  }, [searchQuery, onSearchResult]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: event.currentTarget.value }, { replace: true });
  };

  return (
    <Stack gap={3} mt="xl">
      <Text fz="sm">
        Введите слово или словосочетание для поиска (вместо буквы Ӏ вы можете
        использовать цифру 1)
      </Text>
      <TextInput
        ref={focusTrapRef}
        value={searchQuery}
        leftSection={<IconSearch size={24} />}
        size="lg"
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
          >
            <IconArrowRight size={24} />
          </ActionIcon>
        }
        placeholder="Поиск по корпусу"
        rightSectionWidth={42}
        onChange={handleInputChange}
      />
      {isLoading && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '50px',
            backgroundColor: theme.colors.gray[2],
            borderRadius: '3px',
          }}
        >
          <Loader size="sm" variant="bars" />
        </Box>
      )}
    </Stack>
  );
}

export default memo(Searchbar);
