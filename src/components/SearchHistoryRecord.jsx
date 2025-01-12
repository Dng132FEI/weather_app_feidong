import React from 'react'

/**
 * SearchHistoryRecord component, for displaying a single search history record within the SearchHistory component.
 * @param { Object } props Component props
 * @param { Function } props.searchUsingHistoryRecord Handler search button click event (within any SearchHistoryRecord).
 * Takes in one parameter, which is the index of the target search history record.
 * @param { Function } props.deleteHistoryRecord Handler for delete button click event.
 * Takes in one parameter, which is the index of the target search history record.
 * @param { Number } props.recordIndex Array index of this SearchHistoryRecord in the history array.
 * @param { String } props.city <current record>.city
 * @param { String } props.countryCode <current record>.countryCode
 * @param { String } props.searchTime <current record>.searchTime
 * @returns JSX for SearchHistoryRecord component.
 */
const SearchHistoryRecord = ({ 
  searchUsingHistoryRecord, 
  deleteHistoryRecord,
  recordIndex, 
  city, 
  countryCode, 
  searchTime 
}) => {
  return (
    <div className="pt-3 pb-3 border-bottom d-flex justify-content-between align-items-center">

      {/*Left side: e.g. "1. Hong Kong, HK.*/}
      <div>{ recordIndex + 1 }. {city}, {countryCode}</div>

      {/*Right side: e.g. 2025-01-09 03:15 PM <Search button> <Delete button>*/}
      <div className="d-flex align-items-center gap-3">

        {/*Search time in YYYY-MM-DD hh:mm a (12-hour) format*/}
        <div>{ searchTime }</div>

        {/*Icons section*/}
        <div className="d-flex align-items-center gap-2">

          {/*Search icon*/}
          <div onClick={() => searchUsingHistoryRecord(recordIndex)} className="btn btn-icon-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </div>

          {/*Delete icon*/}
          <div onClick={() => deleteHistoryRecord(recordIndex)} className="btn btn-icon-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash cursor-pointer" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </div>

        </div>

      </div>
  
    </div>
  )
}

export default SearchHistoryRecord
