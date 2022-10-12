import { Box, Modal, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { styleModal } from "../../styles/theme";
import FormNew from "../Customers/FormNew";

const ModalNew = () => {
  const [modal, setModal] = useState(false);

  const openCloseModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <Box align="right">
        <Button
          onClick={() => openCloseModal()}
          variant="contained"
          color="primary"
        >
          New Customer
        </Button>
        </Box>
        <Modal open={modal} onClose={openCloseModal}>
          <Box sx={styleModal}>
            <Box align="center">
              <Typography variant="subtitle1">New Customer</Typography>
            </Box>
          <FormNew />
        </Box>
      </Modal>
    </>
  );
};

export default ModalNew;