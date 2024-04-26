import "./BranchList"
import { useState } from 'react';

export default function BranchList() {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClick = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

  return (
    <table>
      <tbody>
        {['IMG_10234.png', 'My Report.docx', 'Fun Video.mp4', 'Billie Eilish.mp3'].map((name, index) => (
          <tr key={index} className={index === selectedRow ? 'selected' : ''}
            onClick={() => handleClick(index)}
          >
            <td className="icon"><i className="ri-image-fill" /></td>
            <td className="name">{name}</td>
            <td className="extension">File</td>
            <td className="size">Size</td>
            <td className="more"><i className="ri-more-fill" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}