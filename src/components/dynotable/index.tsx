import Table from 'react-bootstrap/Table';
import { DynoTablePropsType } from 'src/types/proptypes';
import styles from "./DynoTable.module.css";

export function DynoTable(props: DynoTablePropsType) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {
            props.headers.map((item) => (
                <th>{ item }</th>
            ))
          }  
        </tr>
      </thead>
      <tbody>
        {
            props.rows.map(data => (
                <tr className={`${styles.dynotr}`}>
                    {
                        data.map(subitem => (
                            <td>{subitem}</td>
                        ))
                    }
                </tr>
            ))
        }
      </tbody>
    </Table>
  );
}

