import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { roleAPI } from '../MockApi/RoleApi';
import { v4 as uuidv4 } from 'uuid';

import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

const Roles = () => {
  const [roles, setRoles] = useState('');
  const [show, setShow] = useState(false);
  const [nameRole, setNameRole] = useState('');
  const [select, setSelect] = useState('');
  const [currentRole, setCurrentRole] = useState();

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
      const res = await roleAPI.post('/roles', {
        id: uuidv4(),
        roleName: nameRole,
      });
      const newData = [...roles, res];
      setRoles(newData);
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(currentRole);

  return (
    <>
      <div className="row align-items-center card-header d-flex justify-content-around">
        <div className="col-8 d-flex align-items-center">
          <legend className="text-center col-2 me-2 mb-0">Roles</legend>
          <select
            className="form-control col-6 selectpicker"
            defaultValue={'Choose roles'}
            data-style="btn-info"
            value={currentRole}
            onChange={(event) => setCurrentRole(event.target.value)}
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
          <button className=" btn btn-danger ms-2" type="button">
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
          <InputGroup>
            <InputGroup.Text>Role</InputGroup.Text>
            <FormControl
              aria-label="Role"
              onChange={(e) => setNameRole(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleAddRole}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Roles;
