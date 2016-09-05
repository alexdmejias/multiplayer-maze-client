export const UPDATE_MESSAGE = 'update-message';
export const ADD_MESSAGE = 'add-message';
export const ADD_RESPONSE = 'add-response';
 
export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, message };
}
 
export function addMessage() {
  return { type: ADD_MESSAGE };
}
 
export function addResponse(message) {
  return { type: ADD_RESPONSE, message };
}