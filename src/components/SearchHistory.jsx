import React from 'react';

import SearchHistoryRecord from './SearchHistoryRecord';
import { DISPLAY_LIMIT } from '../constants/constants';

import "./SearchHistory.css";

/**
 * SearchHistory component containing the "Search History" header, and contains the list
 * of SearchHistoryRecord components.
 * @param { Object } props Component props
 * @param { Function } props.searchUsingHistoryRecord Handler search button click event (within any SearchHistoryRecord).
 * Takes in one parameter, which is the index of the target search history record.
 * @param { Function } props.deleteHistoryRecord Handler for delete button click event (within any SearchHistoryRecord).
 * Takes in one parameter, which is the index of the target search history record.
 * @param { Array } props.history Search history array.
 * @param { boolean } props.isMobile For toggling mobile view.
 * @returns JSX for SearchHistoryRecord component.
 */
const SearchHistory = ({ searchUsingHistoryRecord, deleteHistoryRecord, history, isMobile }) => {
  return (
    <div className="weather-app-component-nested">
      {/* Search History header */}
      <div className="search-history-title">Search History</div>

      {/* Iterate through search history and display EACH OF THE FIRST <DISPLAY_LIMIT> RECORDS in a SearchHistoryRecord component. */}
      {history.map((record, index)=>(index < DISPLAY_LIMIT 
        ? (
          <SearchHistoryRecord 
            key={index}
            searchUsingHistoryRecord={searchUsingHistoryRecord}
            deleteHistoryRecord={deleteHistoryRecord}
            recordIndex={index}
            city={record?.city}
            countryCode={record?.countryCode} 
            searchTime={record?.searchTime}
            isMobile={isMobile}
          ></SearchHistoryRecord> 
        ) : <></>
      ))}
    </div>
  )
}

export default SearchHistory
