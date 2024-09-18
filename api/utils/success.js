export const CreateSuccess = (status, successMessage, data)=>{
 const successObj = {
    status: status,
    message: successMessage,
    data:data
 }
 return successObj;
}