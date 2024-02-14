import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';

const DeleteRoleModal = ({ roleId, visible, onCancel, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/roles/deleteRole/${roleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.status === 200) {
        console.log("Role deleted successfully");
        onDelete();
      } else {
        console.error("Unexpected server response:", response);
      }
    } catch (error) {
      console.error("Error deleting role:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Delete Role"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button danger key="delete" loading={loading} onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this role?</p>
    </Modal>
  );
};

export default DeleteRoleModal;
