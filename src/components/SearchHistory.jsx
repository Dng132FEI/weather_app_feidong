import React from 'react'

import SearchHistoryRecord from './SearchHistoryRecord'

/**
 * SearchHistory component containing the "Search History" header, and contains the list
 * of SearchHistoryRecord components.
 * @param { Object } props Component props
 * @param { Function } props.searchUsingHistoryRecord Handler search button click event (within any SearchHistoryRecord).
 * Takes in one parameter, which is the index of the target search history record.
 * @param { Function } props.deleteHistoryRecord Handler for delete button click event (within any SearchHistoryRecord).
 * Takes in one parameter, which is the index of the target search history record.
 * @param { Array } props.history Search history array.
 * @returns JSX for SearchHistoryRecord component.
 */
const SearchHistory = ({ searchUsingHistoryRecord, deleteHistoryRecord, history }) => {
  return (
    <>
      {/* Search History header */}
      <div className="fw-bold pt-3 pb-1 border-bottom">Search History</div>

      {/* Iterate through search history and display each record in a SearchHistoryRecord component. */}
      {history.map((record, index)=>(
        <SearchHistoryRecord 
          searchUsingHistoryRecord={searchUsingHistoryRecord}
          deleteHistoryRecord={deleteHistoryRecord}
          recordIndex={index}
          city={record?.city}
          countryCode={record?.countryCode} 
          searchTime={record?.searchTime}
        ></SearchHistoryRecord> 
      ))}
    </>
  )
}

export default SearchHistory
