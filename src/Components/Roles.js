import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { roleAPI } from '../MockApi/RoleApi';

import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
// import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Slide } from 'react-toastify';

const Roles = ({ setPerList, perList, perIDList }) => {
  const [roles, setRoles] = useState('');
  const [show, setShow] = useState(false);
  const [nameRole, setNameRole] = useState('');
  const [select, setSelect] = useState('');
  const [currentRoleID, setcurrentRoleID] = useState('');

  const fetchRoleAPI = async () => {
    try {
      const res = await roleAPI.get('/roles');
      setRoles(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoleAPI();
  }, []);

  // useEffect(() => {
  //   fetchRoleAPI();
  // }, [perList]);

  useEffect(() => {
    if (roles) {
      setPerList(roles.find((role) => role.id === currentRoleID));
    }
    fetchRoleAPI();
  }, [currentRoleID]);

  const handleClose = () => {
    setShow(false);
    setSelect('');
  };

  const handleAddRole = async () => {
    if (nameRole === '') {
      setShow(false);
      return;
    }

    const roleArr = roles.map((role) => role.roleName);
    if (roleArr.includes(nameRole)) {
      setShow(false);
      toast.warn('🦄 Permission already exists!', {
        position: 'top-right',
        autoClose: 5000,
        transition: Slide,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    try {
      const res = await roleAPI.post('/roles', {
        roleName: nameRole,
        // perListID: perIDList,
      });
      toast.success('🦄 Add Success!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setcurrentRoleID(res.data.id);

      setRoles([...roles, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(currentRoleID);

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
      toast.error('☕ Delete Success!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
            onClick={() => {
              setShow(true);
              setSelect('add');
            }}
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
                placeholder="Please enter name new role..."
                onChange={(e) => setNameRole(e.target.value)}
              />
            </InputGroup>
          ) : (
            'Bạn có chắc muốn xóa Role này!!!'
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {select === 'add' ? (
            <Button
              variant="primary"
              onClick={() => {
                handleAddRole();
                setShow(false);
                setSelect('');
              }}
            >
              Add
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteRole();
                setShow(false);
                setSelect('');
              }}
            >
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Roles;
