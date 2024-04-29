import React, { useRef } from 'react';
import { ReactToPrint } from 'react-to-print';

export default function Bill() {
    const componentRef = useRef();

    const titleBill = 'Bill' + 123;

    return (
        <div>
            <ReactToPrint
                trigger={() => <button>Print this bill</button>}
                content={() => componentRef.current}
                documentTitle={titleBill}
                pageStyle="@page { size: A4; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
            />
            <div ref={componentRef}>
                hi
            </div>
        </div>
    );
}