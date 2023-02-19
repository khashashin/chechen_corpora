// eslint-disable-next-line import/prefer-default-export
export const BookUtils = {
	getUnsavedBook: (): any => {
		const book = localStorage.getItem('unsavedBook');
		if (book) {
			return JSON.parse(book);
		}
		return null;
	},
	removeUnsavedBook: () => {
		localStorage.removeItem('unsavedBook');
	},
	saveUnsavedBook: (book: any) => {
		localStorage.setItem('unsavedBook', JSON.stringify(book));
	},
};
