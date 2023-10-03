import { Link } from "react-router-dom";
import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function Docs() {
    const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


    return (
    <div>
      <Document
        file="grade12.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
    )
}

export default Docs;