import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { roleAPI } from '../MockApi/RoleApi';

import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

import { v4 as uuidv4 } from 'uuid';

const Roles = () => {
  const [roles, setRoles] = useState('');
  const [perList, setPerList] = useState([]);
  const [show, setShow] = useState(false);
  const [nameRole, setNameRole] = useState('');
  const [select, setSelect] = useState('');
  const [currentRoleID, setcurrentRoleID] = useState('');

  useEffect(() => {
    const fetchRoleAPI = async () => {
      try {
        const res = await roleAPI.get('/roles');
        setRoles(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoleAPI();
  }, []);

  // useEffect(() => {
  //   if (roles) {
  //     setPerList(roles.find((role) => role.id === currentRoleID).perListID);
  //   }
  // }, [currentRoleID]);

  const handleClose = () => {
    setShow(false);
    setSelect('');
  };
  const handleAdd = () => {
    setShow(true);
    setSelect('add');
  };

  const handleAddRole = async () => {
    if (nameRole === '') {
      setShow(false);
      return;
    }
    try {
      const newRole = {
        id: uuidv4(),
        roleName: nameRole,
      };
      await roleAPI.post('/roles', newRole);
      const newData = [...roles, newRole];
      setRoles(newData);
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    if (currentRoleID) {
      setShow(true);
    }
  };

  const handleDeleteRole = async () => {
    try {
      await roleAPI.delete(`/roles/${currentRoleID}`);
      const newData = roles.filter((role) => role.id !== currentRoleID);
      setRoles(newData);
      setShow(false);
      setSelect('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="row align-items-center card-header d-flex justify-content-around">
        <div className="col-8 d-flex align-items-center">
          <legend className="text-center col-2 me-2 mb-0">Roles</legend>
          <select
            className="form-control col-6 selectpicker"
            defaultValue={'Choose roles'}
            data-style="btn-info"
            value={currentRoleID}
            onChange={(event) => {
              setcurrentRoleID(event.target.value);
            }}
          >
            <option>Choose roles</option>
            {roles &&
              roles.map((role) => {
                return (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="d-flex justify-content-center col-4">
          <button
            className=" btn btn-primary ms-5 "
            type="button"
            data-bs-toggle="modal"
            onClick={handleAdd}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
          </button>
          <button
            className=" btn btn-danger ms-2"
            type="button"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faDeleteLeft} />
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {select === 'add' ? 'Add Role' : 'Delete Role'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {select === 'add' ? (
            <InputGroup>
              <InputGroup.Text>Role</InputGroup.Text>
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
          {select === 'add' ? (
            <Button variant="primary" onClick={handleAddRole}>
              Add
            </Button>
          ) : (
            <Button variant="danger" onClick={handleDeleteRole}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Roles;
