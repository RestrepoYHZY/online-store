import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";

import * as Yup from "yup";
import { postProviders, putProviders, getProviderById } from "../../actions/providers.action";
import { useEntities } from "../../context/EntitiesContext";


const validationSchema = Yup.object().shape({
  provider: Yup.string().required("Sorry, this is required").trim(),
  nit: Yup.string().required("Sorry, this is required").trim(),
  indicative: Yup.string().required("Sorry, this is required").trim(),
  address: Yup.string().required("Sorry, this is required").trim(),
  phoneNumber: Yup.string().required("Sorry, this is required").trim(),
});

const FormProvider = ({ id: idProvider }) => {
  const [provider, setProvider] = useState({
    id: 0,
    provider: "",
    nit: "",
    indicative: 0,
    address: "",
    phoneNumber: 0,
  });

  const { getProvidersData, setSuccess, setError, loading, setLoading }= useEntities();

  const sendProviders = async (data) => {
    setLoading(true);
    try {
      const result = await postProviders(data);
      console.log(result);
      setSuccess(true);
      setLoading(false);
      getProvidersData();
    } catch (error) {
      setSuccess(true);
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  const updateProviders = async (id, data) => {
    setLoading(true);
    try {
      const result = await putProviders(id, data);
      console.log(result);
      setSuccess(true);
      setLoading(false);

      getProvidersData();
    } catch (error) {
      setSuccess(true);
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  const getProvider = async (id) => {
    try {
      const { data } = await getProviderById(id);
      const { id: idElement, phoneNumber, ...dataSend } = data;

      const destructuredPhone = ()=>{
        if(phoneNumber.includes("+")){
          return phoneNumber.split(" ");
        };

        return phoneNumber;
      };

      const dataToSend ={
        ...dataSend,
        indicative:phoneNumber.includes("+") ? +destructuredPhone()[0].replace("+",""):0,
        phoneNumber:phoneNumber.includes("+")? +destructuredPhone()[1]:destructuredPhone()
      }
      setProvider(dataToSend);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (idProvider) {
      getProvider(idProvider);
      return;
    }
  }, []);
  return (
    <>
    {loading ? (
        <center>
          <CircularProgress color="primary" />
        </center>
      ) : (
      <Formik
        initialValues={{
          id: idProvider,
          provider: provider.provider,
          nit: provider.nit,
          indicative: provider.indicative,
          address: provider.address,
          phoneNumber: provider.phoneNumber,
        }}
        validationSchema={validationSchema}
        enableReinitialize

        onSubmit={(values) => {
          const {id, indicative, phoneNumber, ...dataSend} = values;

          if(idProvider){
            const dataToSend = {
              ...dataSend,
              phoneNumber:`+${ indicative } ${ phoneNumber }`
            };
  
            updateProviders(id, dataToSend);
            return 
          };

          const dataToSendP = {
            provider: values.provider,
            nit: values.nit,
            address: values.address,
            phoneNumber: `+${values.indicative} ${values.phoneNumber}`,
          };
          sendProviders(dataToSendP);
          console.log(dataToSendP);
        }}
      >
        {(errors, touched ) => (
          <Form>
            <Stack spacing={2}>

              <Stack>
              <Field 
                type="text" 
                name="provider" 
                label="Provider" 
                as={ TextField } 
                size="small"
                error ={Boolean(errors.provider) && Boolean(touched.provider)}
                helperText={Boolean(touched.provider) && Boolean(errors.provider)}
                />
              </Stack>

              <Stack>
                
              <InputLabel htmlFor="nit">Nit</InputLabel>
                <Field type="number" name="nit" />
                <ErrorMessage name="nit" />
                
              </Stack>
              <Stack>
                <TextField
                type="string" 
                name="address" 
                label="Address" 
                size="small"
                />
              </Stack>
              <Stack>
                <InputLabel htmlFor="indicative">Indicative</InputLabel>
                <Field type="number" name="indicative" />
                <ErrorMessage name="indicative" />
              </Stack>
              <Stack>
                <InputLabel htmlFor="phoneNumber">Phone Number </InputLabel>
                <Field type="number" name="phoneNumber" />
                <ErrorMessage name="phoneNumber" />
              </Stack>
              <div align="right">
                <Button type="submit" variant="contained" color="primary">
                  Send
                </Button>
              </div>
            </Stack>
          </Form>
        )}
      </Formik>
      )}
    </>
  );
};



export default FormProvider;
