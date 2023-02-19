type SearchResultsProps = {
	searchData: any;
	isLoading: boolean;
};

function SearchResults(props: SearchResultsProps) {
	const { searchData, isLoading } = props;
	return (
		<div>
			<h1>Search Results</h1>
			{isLoading && <p>Loading...</p>}
			{searchData &&
				searchData.map((item: any) => (
					<div key={item.id}>
						<h2>{item.title}</h2>
						<p>{item.author}</p>
						<p>{item.year}</p>
						<p>{item.text}</p>
					</div>
				))}
		</div>
	);
}

export default SearchResults;
