// models/user.ts

import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import Hashids from 'hashids/cjs';

const hashids = new Hashids('ASDFGHjkloiu', 8);

class User extends Model {
  public id!: number;
  getEncodedId() {
    return hashids.encode(this.id);
  }
  public name!: string;
  public twitter_username!: string;
  public email_id!: string;
  public public_address!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    encodedId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      field:'id',
      defaultValue: () => hashids.encode(Date.now()),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twitter_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    public_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export { User };
