import { Box, Title, Text, Anchor } from '@mantine/core';

function PageNotFound() {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Text fz='xl'>404</Text>
			<Title order={1}>Страница не найдена</Title>
			<Text fz='md'>Возможно, вы ошиблись при вводе адреса или страница была удалена.</Text>
			<Anchor href='/' color='blue' underline>
				Вернуться на главную
			</Anchor>
		</Box>
	);
}

export default PageNotFound;
