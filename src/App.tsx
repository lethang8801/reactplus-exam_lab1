import React, {useState , useEffect} from 'react';
import { Modal } from 'antd';
import {ListUser} from './components/ListUser'
import {AddUserForm} from './components/AddUserForm'
import  userAPI  from './api/userAPI'
import 'antd/dist/antd.css'
import './App.css';
import { IUserItem } from "./components/interface";


function App() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [listUser, setListUser] = useState<IUserItem[]>([])
    const [currentUser, setCurrentUser] = useState<IUserItem | null>(null)
  
    const handleOpenModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    useEffect(() => {
        userAPI.getAll()
          .then((res) => setListUser(res.data))
          .catch((err) => console.log(err))
          .then(() => {});
      }, []);

    const handleAddItem = async (itemUser: IUserItem) => {
        handleCancel();
        try {
          await userAPI.addUser(itemUser);
          setListUser([...listUser, itemUser]);
        } catch (error) {
          console.log(error);
        }
      };
      const handleDeleteUser = async (id: string) => {
        try {
          await userAPI.deleteUser(id);
          const list = listUser.filter(
            (user: IUserItem) => user.id !== id
          );
          setListUser(list);
        } catch (error) {
          console.log(error);
        }
      };
      const handleEditUser = (itemUser: IUserItem) => {
        setCurrentUser(itemUser);
        setIsModalVisible(true);
      } 
      const handleUpdateUser = async (itemUser: IUserItem) => {
          const list = listUser.map((item) => {
              if(item.id === itemUser.id) {
                  return {
                      ...itemUser
                  }
              }
              return item;
          })
          handleCancel();
          try {
            await userAPI.updateUser(itemUser.id, itemUser);
                setListUser(list);
          } catch (error) {
            console.log(error);
          }
    
      } 

    return (
        <div className="App">
            <h2>List user</h2>
            <div className="header-add-user">
                <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
                    Add New User
                </button>
            </div>
            <ListUser list={listUser} deleteUser={handleDeleteUser} editUser={handleEditUser}/>
            <Modal title="Basic Modal" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <AddUserForm  currentUser={currentUser} onAddUser={handleAddItem} onEditUser={handleUpdateUser} onClose={handleCancel}/>
            </Modal>
        </div>
    );
}

export default App;