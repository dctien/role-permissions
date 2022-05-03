import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { permissionAPI } from '../MockApi/PermissionApi';
import { roleAPI } from '../MockApi/RoleApi';
import { Flip } from 'react-toastify';

import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Permissions = ({ perList, setPerList, setPerIDList }) => {
  const [permissions, setPermissions] = useState('');
  const [show, setShow] = useState(false);
  const [namePer, setNamePer] = useState('');
  const [select, setSelect] = useState('');
  const [curPer, setCurPer] = useState('');

  const handleClose = () => {
    setShow(false);
    setSelect('');
  };

  const putRole = async () => {
    try {
      await roleAPI.put(`/roles/${perList.id}`, {
        perListID: perList.perListID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPermissonAPI = async () => {
    try {
      const res = await permissionAPI.get('/permissions');
      setPermissions(res.data);
      setPerIDList(res.data.map((item) => item.id));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPermissonAPI();
  }, []);

  const handleAddPer = async () => {
    if (namePer === '') {
      setShow(false);
      return;
    }

    const perArr = permissions.map((per) => per.permissionName);
    if (perArr.includes(namePer)) {
      setShow(false);
      toast.warn('🦄 Name already exists!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    try {
      const res = await permissionAPI.post('/permissions', {
        permissionName: namePer,
      });
      toast.success('☠️ Add Success!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setPermissions([...permissions, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePer = async () => {
    try {
      await permissionAPI.delete(`/permissions/${curPer.id}`);
      const newData = permissions.filter((per) => per.id !== curPer.id);
      setPermissions(newData);

      toast.error('💢 Delete Success!', {
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

  const handleEditPer = async () => {
    try {
      await permissionAPI.put(`/permissions/${curPer.id}`, {
        permissionName: namePer,
      });

      fetchPermissonAPI();

      toast('🥓 Edit Success!', {
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

  const checkInput = (value) => {
    return perList?.perListID.find((per) => per === value) ? true : false;
  };

  let headerModal, bodyModal, footerModal;
  if (select === 'add') {
    headerModal = <Modal.Title>Adit Permission</Modal.Title>;
    bodyModal = (
      <InputGroup>
        <InputGroup.Text>Permission</InputGroup.Text>
        <FormControl
          aria-label="Role"
          onChange={(e) => setNamePer(e.target.value)}
          placeholder="Please enter name new permission..."
        />
      </InputGroup>
    );
    footerModal = (
      <Button
        variant="danger"
        onClick={() => {
          handleAddPer();
          setShow(false);
        }}
      >
        Add
      </Button>
    );
  } else if (select === 'edit') {
    headerModal = <Modal.Title>Edit Permission</Modal.Title>;
    bodyModal = (
      <InputGroup>
        <InputGroup.Text>Permission</InputGroup.Text>
        <FormControl
          aria-label="Role"
          onChange={(e) => setNamePer(e.target.value)}
          defaultValue={curPer.permissionName}
        />
      </InputGroup>
    );
    footerModal = (
      <Button
        variant="danger"
        onClick={() => {
          handleEditPer();
          setShow(false);
        }}
      >
        Edit
      </Button>
    );
  } else {
    headerModal = <Modal.Title>Delete Permission</Modal.Title>;
    bodyModal = 'Bạn có chắc muốn xóa permission!!!';
    footerModal = (
      <Button
        variant="danger"
        onClick={() => {
          handleDeletePer();
          setShow(false);
        }}
      >
        Delete
      </Button>
    );
  }

  return (
    <>
      <legend className="mt-2">Permissions</legend>
      <div className="list-group mb-3 mt-2">
        <div className="list-group-item d-flex justify-content-between ">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {
              setShow(true);
              setSelect('add');
            }}
          >
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
                    id="check-btn"
                    type="checkbox"
                    checked={checkInput(permission.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPerList({
                          ...perList,
                          perListID: [...perList.perListID, permission.id],
                        });
                      } else {
                        setPerList({
                          ...perList,
                          perListID: perList.perListID.filter(
                            (per) => per !== permission.id
                          ),
                        });
                      }
                    }}
                  />
                  {permission.permissionName}
                </label>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm me-3"
                    onClick={() => {
                      setShow(true);
                      setSelect('edit');
                      setCurPer(permission);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm me-3"
                    onClick={() => {
                      setShow(true);
                      setSelect('delete');
                      setCurPer(permission);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}

        <div className="d-flex justify-content-end me-4 mt-3 btn-sm">
          <button
            type="button"
            className="btn btn-primary"
            // onClick={setPerList({ ...perList, perListID: changeListPer })}
            onClick={() => {
              putRole();

              toast.success('💩 Save Success!', {
                position: 'top-right',
                autoClose: 5000,
                transition: Flip,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            Save
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>{headerModal}</Modal.Header>
        <Modal.Body>{bodyModal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {footerModal}
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Permissions;
