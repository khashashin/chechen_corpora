import { Dispatch, SetStateAction } from 'react';
import DefaultAppHeader from './header/default';
import NoAuthAppHeader from './header/noauth';

type Props = {
	opened: boolean;
	setOpened: Dispatch<SetStateAction<boolean>>;
	authenticated?: boolean;
};

function AppHeader({ authenticated = true, ...props }: Props) {
	const { opened, setOpened } = props;
	if (authenticated) return <DefaultAppHeader opened={opened} setOpened={setOpened} />;

	return <NoAuthAppHeader />;
}

export default AppHeader;
