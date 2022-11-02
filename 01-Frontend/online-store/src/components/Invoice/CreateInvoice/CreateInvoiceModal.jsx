import { Box, Button, CircularProgress, Modal, Paper, Stack, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useEntities } from "../../../context/EntitiesContext";
import QuestionMsg from "../../AlertModal/QuestionMsg";
import { v4 as uuidV4 } from "uuid";
import { postInvoices } from "../../../actions/invoice.action";
import { useInvoice } from "../../../context/InvoiceContext";
import Result from "../../AlertModal/Result";

const CreateInvoiceModal = ({ total }) => {
  const [open, setOpen] = useState(false);
  const { loading, setLoading, success, setSuccess, error, setError } = useEntities();

  
  const handleOpen = () => {
    setOpen((e) => !e);
    setSuccess(false)
    setError(false)
  };
  const { 
    shoppingCart, setShoppingCart, 
    purchaser, setPurchaser, 
    purchaseDate, setPurchaseDate } = useInvoice();
  
  const saveInvoice = async () =>{
    setLoading(true);
    const dataToSend = {
      code: uuidV4(),
      customer: purchaser,
      date: purchaseDate,
      total: total,
      products:[...shoppingCart]
    };

    try{
      const data = await postInvoices(dataToSend)
      setSuccess(true);
      setLoading(false);
     
    }catch(error){
      setError(true);
      setSuccess(true);
      setLoading(false);
      console.log(error);
    };
  };

  const handleClose=()=>{
    handleOpen();
    setShoppingCart([]);
    setPurchaseDate("");
    setPurchaser("");

  }
  return (
    <>
      <Typography textAlign="end">
        <Button variant="contained" onClick={handleOpen}>
          Save Invoice
        </Button>
      </Typography>

      <Modal open={open} onClose={handleOpen}>
      <Paper style={style}>
        
        {loading?
        <center>
          <CircularProgress color="primary" />
        </center>
        

        
        :
         <div>
           {success?
           <Result hasError={ error } action="Save">
                <Box align="end"  >
                   <Button
                     variant="contained"
                     color="primary"
                     onClick={handleClose}  
                   >OK
                   </Button>
                 </Box >
           </Result>
           :
            <QuestionMsg 
             msg="Are you going to save this invoice? "
             >

               <Stack direction="row" aligItems="center" justifyContent="center" spacing={ 2 }>
                <Button variant="contained" onClick={ saveInvoice }>Confirm</Button>
                <Button variant="contained" onClick={handleOpen}>Cancel</Button>
               </Stack>
             </QuestionMsg>
           }
         </div>
        }
        </Paper>
      </Modal>
    </>
  );
};

const style = {
  position: "absolute",
  width: "36%",
  top: "24%",
  left: "32%",
  padding: "1.5rem",
};

export default CreateInvoiceModal;