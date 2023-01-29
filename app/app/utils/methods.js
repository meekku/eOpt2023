export const isValidObjField = (obj) => {
    return Object.values(obj).every(value => value.trim())
  }
  
  export const updateError = (error, stateUpdateError) => {
    stateUpdateError(error);
    setTimeout(() => {
      stateUpdateError('')
    }, 2500)
  }