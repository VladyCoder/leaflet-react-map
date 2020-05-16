import React, { Component } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable } from '@coreui/react';
import {
  CIcon
} from '@coreui/icons-react';

import usersData from './UsersData'

class User extends Component {

  render() {

    const user = usersData.find( user => user.id.toString() === this.props.match.params.id)

    const userDetails = user ? Object.entries(user) : [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <CRow>
          <CCol lg={6}>
            <CCard custom>
              <CCardHeader>
                User id: {this.props.match.params.id}
              </CCardHeader>
              <CCardBody>
                  <CTable custom responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value], index) => {
                          return (
                            <tr key={index.toString()}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    )
  }
}

export default User;
