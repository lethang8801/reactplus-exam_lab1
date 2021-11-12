import "./ListUser.css";
import React, { useState } from "react";
import { IUserItem } from "./../interface"

interface ListUserProps {
    list: IUserItem[];
    deleteUser: (id: string) => void;
    editUser: (itemUser: IUserItem) => void;
  }


export const ListUser: React.FC<ListUserProps> = ({ list, deleteUser, editUser }) => {
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={index} className="ant-list-items">
            <div className="ant-list-item">
              <div className="ant-list-item-meta">
                <div className="ant-list-item-meta-avatar">
                  <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                    <img src={item.avatar} alt={item.content} />
                  </span>
                </div>
                <div className="ant-list-item-meta-content">
                  <h4 className="ant-list-item-meta-title">
                    <a>{item.name}</a>
                  </h4>
                  <div className="ant-list-item-meta-description">
                    {item.content}
                  </div>
                </div>
                <ul className="ant-list-item-action">
                  <li>
                    <a onClick={() => editUser(item)}>Edit</a>
                  </li>
                  <li>
                    <button onClick={() => deleteUser(item.id)}>Remove</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};