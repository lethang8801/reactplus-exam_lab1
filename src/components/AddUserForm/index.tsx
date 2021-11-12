import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IUserItem } from "./../interface";

interface AddUserFormProps {
    currentUser: IUserItem | null;
    onAddUser: (itemUser: IUserItem) => void;
    onEditUser: (itemUser: IUserItem) => void;
    onClose: () => void;
  }

export const AddUserForm: React.FC<AddUserFormProps> = ({ 
    currentUser,
    onAddUser,
    onEditUser,
    onClose,
  }) => {
    const [inputAvatar, setInputAvatar] = useState(currentUser?.avatar || "");
    const [inputName, setInputName] = useState(currentUser?.name || "");
    const [inputContent, setInputContent] = useState(
      currentUser?.content || ""
    );
  
    const handleSubmit = () => {
      if (currentUser && onEditUser) {
        onEditUser({
          id: currentUser.id,
          name: inputName,
          content: inputContent,
          avatar: inputAvatar,
        });
      } else if (onAddUser) {
        onAddUser({
          id: uuidv4(),
          name: inputName,
          content: inputContent,
          avatar: inputAvatar,
        });
      }
    };
  
    return (
      <div>
        <div className="field-input-group">
             <input placeholder="Avatar" type="text" className="ant-input" value={inputAvatar}
            onChange={(e) => setInputAvatar(e.target.value)} />
         </div>
        <div className="field-input-group">
             <input placeholder="Name" type="text" className="ant-input" value={inputName}
            onChange={(e) => setInputName(e.target.value)} />
         </div>
        <div className="field-input-group">
             <input placeholder="Content" type="text" className="ant-input" value={inputContent}
            onChange={(e) => setInputContent(e.target.value)} />
         </div>


         <div className="modal-new-user-footer">
             <button className="ant-btn ant-btn-primary" onClick={handleSubmit}>
                 Save
             </button>
             <button className="ant-btn" style={{marginLeft: 10}} onClick={() => onClose()}>
                 Cancel
             </button>
         </div>
      </div>
    );
  };
