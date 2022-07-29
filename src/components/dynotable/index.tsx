import Table from 'react-bootstrap/Table';
import { DynoTablePropsType } from 'src/types/proptypes';
import styles from "./DynoTable.module.css";

export function DynoTable(props: DynoTablePropsType) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {
            props.headers.map((item, index) => (
                <th key={index}>{ item }</th>
            ))
          }  
        </tr>
      </thead>
      <tbody>
        {
            props.rows.map((data, rowIndex) => (
                <tr key={rowIndex} className={`${styles.dynotr}`}>
                    {
                        data.map((subitem, colIndex) => (
                            <td key={colIndex}>{subitem}</td>
                        ))
                    }
                </tr>
            ))
        }
      </tbody>
    </Table>
  );
}

