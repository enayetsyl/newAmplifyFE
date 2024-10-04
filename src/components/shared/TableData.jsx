import React from 'react'

const TableData = ({children}) => {
  const truncateFileName = (fileName) => {
    if (fileName.length > 15) {
      return fileName.substring(0, 15) + '...';
    }
    return fileName;
  };
  return (
    <td className="px-3 py-1 text-left text-[12px] whitespace-nowrap font-medium text-custom-dark-blue-1">{truncateFileName(children)}</td>
  )
}

export default TableData