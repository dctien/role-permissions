import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { permissionAPI } from '../MockApi/PermissionApi';

import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

const Permissions = () => {
  const [permissions, setPermissions] = useState('');
  const [show, setShow] = useState(false);
  const [nameRole, setNameRole] = useState('');
  const [select, setSelect] = useState('');

  const handleClose = () => {
    setShow(false);
    setSelect('');
  };
  const handleEdit = () => {
    setShow(true);
    setSelect('edit');
  };

  useEffect(() => {
    const fetchPermissonAPI = async () => {
      try {
        const res = await permissionAPI.get('/permissions');
        setPermissions(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPermissonAPI();
  }, []);

  return (
    <>
      <legend className="mt-2">Permissions</legend>
      <div className="list-group mb-3 mt-2">
        <div className="list-group-item d-flex justify-content-between ">
          <button type="button" className="btn btn-outline-success">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {permissions &&
          permissions.map((permission) => {
            return (
              <div
                className="list-group-item d-flex justify-content-between"
                key={permission.id}
              >
                <label className="d-flex align-items-center">
                  <input
                    className="form-check-input me-3"
                    type="checkbox"
                    // checked={permission.id===}
                  />
                  {permission.permissionName}
                </label>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm me-3"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm me-3"
                    onClick={() => setShow(true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}

        <div className="d-flex justify-content-end me-4 mt-3 btn-sm">
          <button type="button" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {select === 'edit' ? 'Edit Permission' : 'Delete Permission'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {select === 'edit' ? (
            <InputGroup>
              <InputGroup.Text>Permission</InputGroup.Text>
              <FormControl
                aria-label="Role"
                onChange={(e) => setNameRole(e.target.value)}
              />
            </InputGroup>
          ) : (
            'Bạn có chắc muốn xóa permission!!!'
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Permissions;
