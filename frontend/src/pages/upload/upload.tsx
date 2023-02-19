import { Group, useMantineTheme, Text } from '@mantine/core';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';
import { useMutation } from '@tanstack/react-query';
import { BiPhotoAlbum } from 'react-icons/bi';
import { FaFileUpload } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { uploadPdf } from './api';

export default function DropAndUpload() {
	const theme = useMantineTheme();

	const { mutate, isLoading } = useMutation(uploadPdf, {
		onSuccess: (data) => console.log('success', data),
		onError: (e) => console.log('error', e),
	});

	return (
		<Dropzone
			onDrop={(file) => mutate(file[0])}
			onReject={(files) => console.log('rejected files', files)}
			maxSize={3 * 1024 ** 2}
			maxFiles={1}
			loading={isLoading}
			accept={PDF_MIME_TYPE}>
			<Group position='center' spacing='xl' style={{ minHeight: 220, pointerEvents: 'none' }}>
				<Dropzone.Accept>
					<FaFileUpload
						size={50}
						stroke='1.5'
						color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
					/>
				</Dropzone.Accept>
				<Dropzone.Reject>
					<IoClose
						size={50}
						stroke='1.5'
						color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
					/>
				</Dropzone.Reject>
				<Dropzone.Idle>
					<BiPhotoAlbum size={50} stroke='1.5' />
				</Dropzone.Idle>

				<div>
					<Text size='xl' inline>
						Drag images here or click to select files
					</Text>
					<Text size='sm' color='dimmed' inline mt={7}>
						Attach as many files as you like, each file should not exceed 5mb
					</Text>
				</div>
			</Group>
		</Dropzone>
	);
}
