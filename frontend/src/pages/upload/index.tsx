import { Group, Stack, Title, Text, Stepper, Button } from '@mantine/core';
import { useState } from 'react';
import DropAndUpload from './upload';

function UploadPage() {
	const [active, setActive] = useState(1);
	const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
	return (
		<>
			<Group>
				<Stack spacing='xs'>
					<Title>Начать загрузку файла</Title>
					<Text>Выбрать тип файла и предварительные свойства</Text>
				</Stack>
			</Group>
			<Stepper active={active} onStepClick={setActive} breakpoint='sm'>
				<Stepper.Step label='First step' description='Create an account'>
					Step 1 content: Create an account
				</Stepper.Step>
				<Stepper.Step label='Second step' description='Verify email'>
					Step 2 content: Verify email
				</Stepper.Step>
				<Stepper.Step label='Начать' description='Выбрать файл'>
					<DropAndUpload />
				</Stepper.Step>
				<Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
			</Stepper>

			<Group position='center' mt='xl'>
				<Button variant='default' onClick={prevStep}>
					Back
				</Button>
				<Button onClick={nextStep}>Next step</Button>
			</Group>
		</>
	);
}

export default UploadPage;
